import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { captureException } from '@/lib/sentry';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ errorInfo });

        // Send to Sentry for error tracking
        captureException(error, {
            componentStack: errorInfo.componentStack,
            errorBoundary: true,
        });
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    private handleGoHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-background">
                    <Card className="max-w-2xl w-full p-8">
                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                                <AlertTriangle className="h-10 w-10 text-destructive" />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
                                <p className="text-muted-foreground text-lg">
                                    We're sorry, but we encountered an unexpected error.
                                </p>
                            </div>

                            {import.meta.env.DEV && this.state.error && (
                                <div className="w-full">
                                    <details className="text-left">
                                        <summary className="cursor-pointer font-medium text-sm mb-2">
                                            Error Details (Dev Only)
                                        </summary>
                                        <div className="bg-secondary p-4 rounded-lg overflow-auto">
                                            <pre className="text-xs font-mono whitespace-pre-wrap">
                                                {this.state.error.toString()}
                                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                                            </pre>
                                        </div>
                                    </details>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button onClick={this.handleReset} variant="outline">
                                    <RefreshCcw className="h-4 w-4 mr-2" />
                                    Try Again
                                </Button>
                                <Button onClick={this.handleGoHome}>
                                    <Home className="h-4 w-4 mr-2" />
                                    Go Home
                                </Button>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                If this problem persists, please contact support at{' '}
                                <a href="mailto:hello@nineproo.com" className="underline">
                                    hello@nineproo.com
                                </a>
                            </p>
                        </div>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

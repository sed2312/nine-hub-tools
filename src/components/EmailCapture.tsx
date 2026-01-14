import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';

interface EmailCaptureProps {
    source?: string;
    variant?: 'inline' | 'modal' | 'footer';
    placeholder?: string;
    buttonText?: string;
    successMessage?: string;
}

export function EmailCapture({
    source = 'Website',
    variant = 'inline',
    placeholder = 'your@email.com',
    buttonText = 'Get Early Access',
    successMessage = '🎉 You\'re on the list! We\'ll notify you when we launch Pro features.'
}: EmailCaptureProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setLoading(true);

        // For client-side (browser) submissions, we use Loops.so's form endpoint
        // Get form ID from environment (you'll create this in Loops.so dashboard)
        const formId = import.meta.env.VITE_LOOPS_FORM_ID;

        if (!formId || formId === 'your_loops_form_id_here') {
            // Fallback: Demo mode
            console.log('Email captured (demo mode):', { email, source });
            toast({
                title: successMessage,
                description: 'Demo mode: Set VITE_LOOPS_FORM_ID in .env to enable real submissions.'
            });
            setEmail('');
            setSubmitted(true);
            setLoading(false);
            setTimeout(() => setSubmitted(false), 3000);
            return;
        }

        try {
            // Use Loops.so format (from their embed code)
            const formBody = `userGroup=&mailingLists=&email=${encodeURIComponent(email)}`;

            const response = await fetch(`https://app.loops.so/api/newsletter-form/${formId}`, {
                method: 'POST',
                body: formBody,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const data = await response.json();

            if (response.ok || data.success) {
                toast({
                    title: successMessage,
                });
                setEmail('');
                setSubmitted(true);

                // Track with analytics if available
                if (typeof window !== 'undefined' && (window as any).plausible) {
                    (window as any).plausible('Email Captured', { props: { source } });
                }

                // Reset after 5 seconds
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                // Get error details from response
                console.error('Loops Form Error:', {
                    status: response.status,
                    data: data
                });
                throw new Error(data.message || 'Failed to subscribe');
            }
        } catch (error) {
            console.error('Email capture error:', error);
            toast({
                title: 'Oops! Something went wrong',
                description: 'Please check the browser console for details or contact support.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    // Submitted state
    if (submitted && variant === 'inline') {
        return (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">Subscribed successfully!</span>
            </div>
        );
    }

    // Footer variant - compact
    if (variant === 'footer') {
        return (
            <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
                <Input
                    type="email"
                    placeholder={placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-9 text-sm"
                    disabled={loading || submitted}
                />
                <Button
                    type="submit"
                    size="sm"
                    disabled={loading || submitted}
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : submitted ? (
                        <CheckCircle2 className="h-4 w-4" />
                    ) : (
                        'Subscribe'
                    )}
                </Button>
            </form>
        );
    }

    // Modal variant - with icon
    if (variant === 'modal') {
        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Stay Updated</h3>
                        <p className="text-sm text-muted-foreground">Get notified about new features</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Input
                        type="email"
                        placeholder={placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading || submitted}
                    />
                    <Button type="submit" disabled={loading || submitted}>
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : submitted ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            buttonText
                        )}
                    </Button>
                </div>
            </form>
        );
    }

    // Default inline variant
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md w-full">
            <Input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                disabled={loading || submitted}
            />
            <Button type="submit" disabled={loading || submitted}>
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Joining...
                    </>
                ) : submitted ? (
                    <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Subscribed!
                    </>
                ) : (
                    buttonText
                )}
            </Button>
        </form>
    );
}

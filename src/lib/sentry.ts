import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry error monitoring
 * 
 * To enable Sentry:
 * 1. Sign up at https://sentry.io
 * 2. Create a new project (select React)
 * 3. Copy your DSN from the project settings
 * 4. Set VITE_SENTRY_DSN in your .env file
 * 
 * Example .env:
 * VITE_SENTRY_DSN=https://your-public-key@sentry.io/your-project-id
 */

export function initSentry() {
    const dsn = import.meta.env.VITE_SENTRY_DSN;

    // Only initialize if DSN is provided and we're not in development
    if (!dsn || import.meta.env.DEV) {
        console.log('Sentry: Skipped initialization (no DSN or dev mode)');
        return;
    }

    Sentry.init({
        dsn,

        // Set environment
        environment: import.meta.env.MODE,

        // Set release version (optional - use your package.json version)
        // release: `nine-hub-tools@${packageJson.version}`,

        // Performance Monitoring
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                // Session Replay: Record user sessions for debugging
                maskAllText: true,
                blockAllMedia: true,
            }),
        ],

        // Performance monitoring - sample rate
        tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% in prod, 100% in staging

        // Session Replay - sample rate
        replaysSessionSampleRate: 0.1, // 10% of sessions
        replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

        // Filter out specific errors
        beforeSend(event, hint) {
            const error = hint.originalException;

            // Filter out browser extension errors
            if (error && typeof error === 'object' && 'message' in error) {
                const message = String(error.message);
                if (
                    message.includes('chrome-extension://') ||
                    message.includes('moz-extension://')
                ) {
                    return null;
                }
            }

            // Filter out network errors (optional)
            if (event.exception?.values?.[0]?.type === 'NetworkError') {
                return null;
            }

            return event;
        },

        // Attach user context (optional - only if you have user data)
        // You can set this after user logs in
        beforeSendTransaction(event) {
            // Example: Add custom tags
            event.tags = {
                ...event.tags,
                'app.section': 'tools',
            };
            return event;
        },
    });

    console.log('Sentry: Initialized successfully');
}

/**
 * Capture an exception manually
 */
export function captureException(error: Error, context?: Record<string, unknown>) {
    if (import.meta.env.DEV) {
        console.error('Sentry (dev):', error, context);
        return;
    }

    if (context) {
        Sentry.captureException(error, { extra: context });
    } else {
        Sentry.captureException(error);
    }
}

/**
 * Capture a message (for non-error events)
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    if (import.meta.env.DEV) {
        console.log(`Sentry (dev) [${level}]:`, message);
        return;
    }

    Sentry.captureMessage(message, level);
}

/**
 * Set user context (call after user logs in)
 */
export function setUser(user: { id: string; email?: string; username?: string }) {
    Sentry.setUser(user);
}

/**
 * Clear user context (call on logout)
 */
export function clearUser() {
    Sentry.setUser(null);
}

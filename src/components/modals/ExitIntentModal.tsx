import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function ExitIntentModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasShown, setHasShown] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Check if user has already seen or closed the modal
        const modalSeen = localStorage.getItem('exit_intent_seen');
        if (modalSeen) return;

        let mouseY = 0;
        const topThreshold = 50; // Distance from top to trigger

        const handleMouseMove = (e: MouseEvent) => {
            mouseY = e.clientY;

            // If moving up quickly towards the top/address bar
            if (e.clientY < topThreshold && !hasShown) {
                setIsOpen(true);
                setHasShown(true);
                localStorage.setItem('exit_intent_seen', 'true');
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            // If mouse leaves window at the top
            if (e.clientY <= 0 && !hasShown) {
                setIsOpen(true);
                setHasShown(true);
                localStorage.setItem('exit_intent_seen', 'true');
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hasShown]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Simulate submission
        setTimeout(() => {
            setSubmitted(true);
            // Close after delay
            setTimeout(() => setIsOpen(false), 3000);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-2xl p-6 md:p-8"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {!submitted ? (
                            <>
                                <div className="text-center mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Wait! Don't Miss Out</h3>
                                    <p className="text-muted-foreground">
                                        Join 5,000+ developers getting early access to our Pro features.
                                        Be the first to know when we launch!
                                    </p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-green-500" />
                                        </div>
                                        <span>Team collaboration tools</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-green-500" />
                                        </div>
                                        <span>Design system export</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-green-500" />
                                        </div>
                                        <span>API Access</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        required
                                    />
                                    <Button type="submit" className="w-full h-12 text-base font-semibold">
                                        Get Early Access
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                                <p className="text-muted-foreground">
                                    Thanks for joining. We'll be in touch soon with your early access invite.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

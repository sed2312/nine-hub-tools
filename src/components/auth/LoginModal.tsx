import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { signInWithEmail } = useAuth();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmail(email);
            setSent(true);
            toast({
                title: '✉️ Check your email!',
                description: 'We sent you a magic link to sign in.',
            });
        } catch (error) {
            toast({
                title: 'Oops! Something went wrong',
                description: error instanceof Error ? error.message : 'Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = (isOpen: boolean) => {
        if (!isOpen) {
            // Reset state when closing
            setTimeout(() => {
                setEmail('');
                setSent(false);
            }, 300);
        }
        onOpenChange(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Sign in to Nine Hub
                    </DialogTitle>
                </DialogHeader>

                {sent ? (
                    <div className="text-center py-6">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Check your email</h3>
                        <p className="text-sm text-muted-foreground">
                            We sent a magic link to <strong>{email}</strong>
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            Click the link to sign in instantly (no password needed!)
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Email address</label>
                            <Input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="mt-1"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Sending magic link...
                                </>
                            ) : (
                                'Send magic link'
                            )}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            No password required. We'll email you a secure sign-in link.
                        </p>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

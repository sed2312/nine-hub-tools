import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from './LoginModal';
import { LogIn, LogOut, User } from 'lucide-react';

export function AuthButton() {
    const { user, signOut } = useAuth();
    const [showLogin, setShowLogin] = useState(false);

    if (user) {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="gap-2"
            >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
            </Button>
        );
    }

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogin(true)}
                className="gap-2"
            >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
            </Button>
            <LoginModal open={showLogin} onOpenChange={setShowLogin} />
        </>
    );
}

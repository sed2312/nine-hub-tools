import { createContext, useContext, useState, ReactNode } from 'react';

interface SubscriptionContextType {
  isPro: boolean;
  email: string | null;
  setEmail: (email: string | null) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  
  // For now, everyone is on free tier
  const isPro = false;

  return (
    <SubscriptionContext.Provider value={{ isPro, email, setEmail }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscriptionContext must be used within a SubscriptionProvider');
  }
  return context;
}
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Essential tools for everyone',
    features: [
      'All 9 tools included',
      '3 preset saves per tool',
      'CSS/SVG export',
      'Community support',
    ],
    highlight: false,
    badge: 'Current',
  },
  {
    name: 'Pro Monthly',
    price: '$12',
    period: '/month',
    description: 'For power users',
    features: [
      'Everything in Free',
      'Unlimited preset saves',
      'Export as PNG/SVG images',
      'Priority support',
      'No watermarks',
      'Early access to new tools',
    ],
    highlight: true,
    badge: 'Coming Soon',
  },
  {
    name: 'Pro Annual',
    price: '$99',
    period: '/year',
    description: 'Best value — save 17%',
    features: [
      'Everything in Pro Monthly',
      '2 months free',
      'Exclusive templates',
      'Lifetime updates',
    ],
    highlight: false,
    badge: 'Coming Soon',
  },
];

export function PricingModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Sparkles className="h-4 w-4" />
          Pricing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Crown className="h-6 w-6 text-primary" />
            Simple, Transparent Pricing
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border-2 p-5 transition-all overflow-visible ${plan.highlight
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border hover:border-primary/30'
                  }`}
              >
                {/* Badge */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${plan.badge === 'Current'
                  ? 'bg-green-500 text-white border border-green-600'
                  : 'bg-primary text-primary-foreground border border-primary'
                  }`}>
                  {plan.badge}
                </div>

                {/* Plan Header */}
                <div className="text-center pt-2 pb-4 border-b border-border">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2 mt-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className="w-full mt-5"
                  variant={plan.highlight ? 'default' : 'outline'}
                  disabled={plan.badge === 'Coming Soon'}
                >
                  {plan.badge === 'Current' ? 'Current Plan' : 'Coming Soon'}
                </Button>
              </div>
            ))}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            All tools are currently 100% free. Pro plans coming soon!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

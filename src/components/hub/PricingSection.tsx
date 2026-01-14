import { Check, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    buttonText: 'Current Plan',
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
    buttonText: 'Coming Soon',
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
    buttonText: 'Coming Soon',
  },
];

export function PricingSection() {
  return (
    <section id="pricing-section" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4">
            <Crown className="h-4 w-4" />
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            All tools are currently 100% free. Pro plans coming soon!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-6 transition-all overflow-visible ${plan.highlight
                  ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
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
              <div className="text-center pt-4 pb-6 border-b border-border">
                <h3 className="font-semibold text-xl">{plan.name}</h3>
                <div className="mt-3">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className="w-full mt-6"
                size="lg"
                variant={plan.highlight ? 'default' : 'outline'}
                disabled={plan.badge === 'Coming Soon'}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

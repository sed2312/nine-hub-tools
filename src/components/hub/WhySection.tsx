import { Zap, Shield, Heart } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'All tools run entirely in your browser. No server calls, no waiting. Instant results every time.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Shield,
    title: '100% Private',
    description: 'Your data never leaves your device. No tracking, no cookies, no analytics. Complete privacy.',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Heart,
    title: 'Always Free',
    description: 'All 9 tools are completely free to use. No signup required, no credit card, no hidden fees.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
];

export function WhySection() {
  return (
    <section className="py-16 border-y border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Why NineProo?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Built for developers who value speed, privacy, and simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className={`inline-flex p-4 rounded-2xl ${feature.bgColor} mb-4`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

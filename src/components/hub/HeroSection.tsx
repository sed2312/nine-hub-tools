import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmailCapture } from '@/components/EmailCapture';

export function HeroSection() {
  const scrollToTools = () => {
    document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container relative mx-auto px-4 text-center">
        {/* Main Heading - Single H1 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-gradient">9 Free CSS & Web Design Tools</span>
          <br />
          <span className="text-foreground">for Faster Development</span>
        </h1>

        {/* Supporting Paragraph - SEO Optimized */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Generate production-ready glassmorphism, gradients, grids, and CSS effects
          in seconds. Used by <strong>10,000+ developers</strong> to build modern
          web experiences faster. No signup, no limits, instant export.
        </p>

        {/* Trust Signals / Social Proof */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 text-sm md:text-base">
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl md:text-2xl text-primary">100%</span>
            <span className="text-muted-foreground text-xs uppercase tracking-wider">Free to Use</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl md:text-2xl text-primary">10k+</span>
            <span className="text-muted-foreground text-xs uppercase tracking-wider">Developers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl md:text-2xl text-primary">0s</span>
            <span className="text-muted-foreground text-xs uppercase tracking-wider">Login Req.</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl md:text-2xl text-primary">9+</span>
            <span className="text-muted-foreground text-xs uppercase tracking-wider">Pro Tools</span>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            onClick={scrollToTools}
            className="gap-2"
          >
            Explore Tools
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Trust Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>Free to Use Now</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>No Login Required</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>Instant Results</span>
          </div>
        </div>

        {/* Secondary CTA - Waitlist */}
        <div className="max-w-md mx-auto">
          <EmailCapture
            source="Hero Section"
            buttonText="Join Waitlist"
            placeholder="Enter your email for early access"
            successMessage="🎉 You're on the list! We'll notify you about premium features."
          />
          <p className="text-xs text-muted-foreground mt-2">
            Sign up for early access to premium features
          </p>
        </div>
      </div>
    </section>
  );
}

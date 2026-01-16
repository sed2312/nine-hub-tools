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
          <span className="text-gradient">Free Online Tools</span>
          <br />
          <span className="text-foreground">for Developers, Designers & Creators</span>
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Generate CSS, UI elements, AI prompts, and web utilities instantly — free to use for now, no login required.
        </p>

        {/* Primary CTA */}
        <Button
          size="lg"
          onClick={scrollToTools}
          className="gap-2 mb-6"
        >
          Explore Tools
          <ArrowRight className="h-4 w-4" />
        </Button>

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

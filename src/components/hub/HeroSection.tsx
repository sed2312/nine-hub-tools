import { ArrowDown } from 'lucide-react';
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
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            Free Forever
          </span>
          <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
            Instant Export
          </span>
          <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
            No Signup
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-gradient">Nine Essential</span>
          <br />
          <span className="text-foreground">Web Utilities</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Professional-grade tools for modern web development.
          Generate CSS, check accessibility, optimize prompts, and more.
        </p>

        {/* Email Capture */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <EmailCapture
            source="Hero Section"
            buttonText="Get Pro Updates"
            placeholder="Enter your email..."
            successMessage="🎉 Thanks! We'll notify you when Pro features launch."
          />
          <p className="text-xs text-muted-foreground">
            Join the waitlist for Pro features • Launching soon
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={scrollToTools}
          className="gap-2 mb-12"
          variant="outline"
        >
          Explore Tools
          <ArrowDown className="h-4 w-4" />
        </Button>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl text-foreground">9</span>
            <span>Tools</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl text-foreground">100%</span>
            <span>Privacy</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl text-foreground">0</span>
            <span>Cost</span>
          </div>
        </div>
      </div>
    </section>
  );
}

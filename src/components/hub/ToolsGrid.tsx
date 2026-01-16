import { Link } from 'react-router-dom';
import {
  Layers,
  Type,
  Box,
  Circle,
  Grid3X3,
  Palette,
  MessageSquare,
  FileCode,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const toolCategories = {
  design: [
    {
      title: 'Glassmorphism Generator',
      description: 'Create modern glass effects with blur, transparency, and custom colors',
      icon: Layers,
      path: '/glass',
    },
    {
      title: 'Gradient Text Generator',
      description: 'Eye-catching gradient text with customizable colors and animations',
      icon: Type,
      path: '/gradient-text',
    },
    {
      title: 'Box Shadow Generator',
      description: 'Design perfect shadows with real-time preview and multiple layers',
      icon: Box,
      path: '/shadow',
    },
    {
      title: 'Blob SVG Generator',
      description: 'Generate organic blob shapes for modern web design',
      icon: Circle,
      path: '/blob',
    },
  ],
  css: [
    {
      title: 'CSS Grid Generator',
      description: 'Build responsive grid layouts visually with instant code export',
      icon: Grid3X3,
      path: '/grid',
    },
    {
      title: 'Color Palette Generator',
      description: 'Create harmonious color schemes with multiple color harmony rules',
      icon: Palette,
      path: '/palette',
    },
  ],
  ai: [
    {
      title: 'AI Prompt Helper',
      description: 'Optimize prompts for ChatGPT, Claude, and other AI tools',
      icon: MessageSquare,
      path: '/prompt',
    },
    {
      title: 'Meta Tag Generator',
      description: 'Generate SEO-optimized meta tags for better search visibility',
      icon: FileCode,
      path: '/meta',
    },
    {
      title: 'Contrast Checker',
      description: 'Ensure WCAG accessibility with color contrast validation',
      icon: Eye,
      path: '/contrast',
    },
  ],
};

const starterTools = [
  { title: 'Glassmorphism Generator', path: '/glass' },
  { title: 'CSS Grid Generator', path: '/grid' },
  { title: 'AI Prompt Helper', path: '/prompt' },
];

export function ToolsGrid() {
  return (
    <>
      {/* Tools Categories Section */}
      <section id="tools-section" className="py-16 relative">
        <div className="container mx-auto px-4">
          {/* Design & UI Tools */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Design & UI Tools</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Create stunning visual effects and UI elements with these design-focused generators
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {toolCategories.design.map((tool) => (
                <Link key={tool.path} to={tool.path}>
                  <div className="group border border-border rounded-lg p-6 hover:border-primary/50 transition-colors h-full bg-background/50 hover:bg-background">
                    <tool.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2 text-foreground">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CSS & Layout Tools */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">CSS & Layout Tools</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Build responsive layouts and generate production-ready CSS
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {toolCategories.css.map((tool) => (
                <Link key={tool.path} to={tool.path}>
                  <div className="group border border-border rounded-lg p-6 hover:border-primary/50 transition-colors h-full bg-background/50 hover:bg-background">
                    <tool.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2 text-foreground">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* AI & SEO Tools */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">AI & SEO Tools</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Optimize for search engines, accessibility, and AI-powered workflows
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {toolCategories.ai.map((tool) => (
                <Link key={tool.path} to={tool.path}>
                  <div className="group border border-border rounded-lg p-6 hover:border-primary/50 transition-colors h-full bg-background/50 hover:bg-background">
                    <tool.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2 text-foreground">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">About NineProo</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            NineProo is a collection of free online tools designed to help developers and designers work faster.
            All tools run directly in the browser and generate clean, production-ready output with no registration
            required for current tools. Sign up to join the waitlist for upcoming premium features.
          </p>
        </div>
      </section>

      {/* Start Here Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">New here? Start with:</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {starterTools.map((tool) => (
                <Link key={tool.path} to={tool.path}>
                  <Button variant="outline" size="lg" className="gap-2">
                    {tool.title}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { 
  Layers, 
  MessageSquare, 
  Palette, 
  Grid3X3, 
  Type, 
  Box, 
  Circle, 
  Eye, 
  FileCode 
} from 'lucide-react';
import { ToolCard } from './ToolCard';

const tools = [
  {
    title: 'Glass Architect',
    description: 'Generate stunning glassmorphism and frosted glass CSS effects with live preview.',
    icon: Layers,
    path: '/glass',
    colorClass: 'text-glass',
  },
  {
    title: 'Prompt Engineer',
    description: 'Optimize your AI prompts with persona, tone, and output format controls.',
    icon: MessageSquare,
    path: '/prompt',
    colorClass: 'text-prompt',
  },
  {
    title: 'Palette Master',
    description: 'Generate algorithmic color harmonies with lock, copy, and export features.',
    icon: Palette,
    path: '/palette',
    colorClass: 'text-palette',
  },
  {
    title: 'Grid Architect',
    description: 'Visual CSS Grid layout designer with interactive preview and instant export.',
    icon: Grid3X3,
    path: '/grid',
    colorClass: 'text-grid',
  },
  {
    title: 'Gradient Text',
    description: 'Create eye-catching gradient text effects with customizable colors and direction.',
    icon: Type,
    path: '/gradient-text',
    colorClass: 'text-gradient-text',
  },
  {
    title: 'Shadow Studio',
    description: 'Design neumorphic shadows with light source control and shape presets.',
    icon: Box,
    path: '/shadow',
    colorClass: 'text-shadow',
  },
  {
    title: 'Blob Maker',
    description: 'Generate organic blob shapes with gradient colors and optional animation.',
    icon: Circle,
    path: '/blob',
    colorClass: 'text-blob',
  },
  {
    title: 'Contrast Eye',
    description: 'WCAG accessibility checker with vision simulations and auto-fix suggestions.',
    icon: Eye,
    path: '/contrast',
    colorClass: 'text-contrast',
  },
  {
    title: 'Meta Tags',
    description: 'SEO and Open Graph meta tag generator with live Google and social previews.',
    icon: FileCode,
    path: '/meta',
    colorClass: 'text-meta',
  },
];

export function ToolsGrid() {
  return (
    <section id="tools-section" className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">All 9 Tools</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Click any tool to get started. No signup, no setup — just start creating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.path} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

import type { LucideIcon } from 'lucide-react';
import { 
  Palette, 
  Sparkles, 
  Grid3x3, 
  Type, 
  Shadow, 
  Shapes, 
  Contrast, 
  Tag,
  GlassWater 
} from 'lucide-react';

export interface ToolConfig {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: LucideIcon;
  category: 'design' | 'development' | 'seo';
  keywords: string[];
  metaDescription: string;
  ogImage?: string;
  features: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const toolsConfig: ToolConfig[] = [
  {
    id: 'glass',
    name: 'Glass Generator',
    path: '/glass',
    description: 'Create stunning glassmorphism effects with real-time preview',
    icon: GlassWater,
    category: 'design',
    keywords: ['glassmorphism', 'glass effect', 'frosted glass', 'backdrop filter', 'css glass'],
    metaDescription: 'Generate beautiful glassmorphism effects for your web designs. Customize blur, transparency, borders, and shadows with real-time preview and instant CSS code export.',
    features: [
      'Real-time glassmorphism preview',
      'Customizable blur and transparency',
      'Border and shadow controls',
      'Instant CSS code generation',
      'Multiple preset styles'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'prompt',
    name: 'AI Prompt Generator',
    path: '/prompt',
    description: 'Enhance and optimize your AI prompts for better results',
    icon: Sparkles,
    category: 'development',
    keywords: ['ai prompt', 'prompt engineering', 'chatgpt prompts', 'ai optimization'],
    metaDescription: 'Create and optimize AI prompts for ChatGPT, Claude, and other AI tools. Improve prompt quality with templates, enhancements, and best practices.',
    features: [
      'Prompt enhancement suggestions',
      'Template library',
      'Best practices guide',
      'Copy optimized prompts',
      'Multi-AI platform support'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'palette',
    name: 'Color Palette Generator',
    path: '/palette',
    description: 'Generate beautiful color palettes for your design projects',
    icon: Palette,
    category: 'design',
    keywords: ['color palette', 'color scheme', 'color generator', 'design colors', 'hex colors'],
    metaDescription: 'Create beautiful color palettes with our AI-powered color generator. Get harmonious color schemes, export to various formats, and find perfect color combinations.',
    features: [
      'AI-powered color generation',
      'Harmony rules (complementary, triadic, etc.)',
      'Export to multiple formats',
      'Accessibility checking',
      'Save favorite palettes'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'grid',
    name: 'CSS Grid Generator',
    path: '/grid',
    description: 'Create responsive CSS Grid layouts with visual editor',
    icon: Grid3x3,
    category: 'development',
    keywords: ['css grid', 'grid layout', 'responsive grid', 'css grid generator'],
    metaDescription: 'Build responsive CSS Grid layouts visually. Drag and drop to create complex grid structures, customize gaps, and export production-ready CSS code.',
    features: [
      'Visual grid editor',
      'Responsive breakpoints',
      'Grid template areas',
      'Gap and alignment controls',
      'Copy CSS code instantly'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'gradient-text',
    name: 'Gradient Text Generator',
    path: '/gradient-text',
    description: 'Create eye-catching gradient text effects',
    icon: Type,
    category: 'design',
    keywords: ['gradient text', 'text gradient', 'css gradient text', 'colorful text'],
    metaDescription: 'Generate stunning gradient text effects for your web projects. Customize colors, angles, and styles with live preview and instant CSS code.',
    features: [
      'Live gradient preview',
      'Multiple gradient types',
      'Angle and direction control',
      'Custom color stops',
      'CSS and HTML export'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'shadow',
    name: 'Box Shadow Generator',
    path: '/shadow',
    description: 'Design perfect box shadows for your UI elements',
    icon: Shadow,
    category: 'design',
    keywords: ['box shadow', 'css shadow', 'shadow generator', 'drop shadow'],
    metaDescription: 'Create beautiful box shadows with our intuitive shadow generator. Customize multiple shadows, inset effects, and get CSS code instantly.',
    features: [
      'Multiple shadow layers',
      'Inset shadow support',
      'Real-time preview',
      'Shadow presets library',
      'CSS code export'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'blob',
    name: 'Blob Shape Generator',
    path: '/blob',
    description: 'Generate organic blob shapes for modern designs',
    icon: Shapes,
    category: 'design',
    keywords: ['blob generator', 'organic shapes', 'svg blob', 'random shapes'],
    metaDescription: 'Create unique organic blob shapes for your designs. Generate random blobs, customize complexity, and export as SVG or CSS.',
    features: [
      'Random blob generation',
      'Complexity controls',
      'SVG and CSS export',
      'Animation support',
      'Multiple blob styles'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'contrast',
    name: 'Contrast Checker',
    path: '/contrast',
    description: 'Check color contrast for WCAG accessibility compliance',
    icon: Contrast,
    category: 'design',
    keywords: ['contrast checker', 'wcag', 'accessibility', 'color contrast', 'a11y'],
    metaDescription: 'Ensure your designs meet WCAG accessibility standards. Check color contrast ratios, get compliance feedback, and find accessible color alternatives.',
    features: [
      'WCAG 2.1 compliance checking',
      'AA and AAA level testing',
      'Contrast ratio calculator',
      'Accessible color suggestions',
      'Multiple text size support'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'meta',
    name: 'Meta Tags Generator',
    path: '/meta',
    description: 'Generate SEO-optimized meta tags for your website',
    icon: Tag,
    category: 'seo',
    keywords: ['meta tags', 'seo', 'open graph', 'twitter cards', 'social media tags'],
    metaDescription: 'Create perfect meta tags for SEO and social media. Generate Open Graph, Twitter Cards, and standard meta tags with preview and instant copy.',
    features: [
      'SEO meta tags',
      'Open Graph tags',
      'Twitter Card tags',
      'Preview for social platforms',
      'Copy all tags instantly'
    ],
    difficulty: 'beginner'
  }
];

export const getToolById = (id: string): ToolConfig | undefined => {
  return toolsConfig.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: string): ToolConfig[] => {
  return toolsConfig.filter(tool => tool.category === category);
};

export const searchTools = (query: string): ToolConfig[] => {
  const lowercaseQuery = query.toLowerCase();
  return toolsConfig.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
};

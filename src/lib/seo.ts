// SEO Utility Functions for Nine Hub Tools

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
}

const defaultMetadata: SEOMetadata = {
  title: 'Nine Hub Tools - Free Design Tools for Developers',
  description: 'Professional design tools for web developers. Generate glassmorphism, gradients, shadows, color palettes, and more. Free and open-source.',
  keywords: 'design tools, web development, CSS generator, glassmorphism, color palette, gradient generator, shadow generator, blob generator, contrast checker, meta tags',
  ogImage: '/og-image.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  canonicalUrl: 'https://nineproo.com'
};

export const toolsMetadata: Record<string, SEOMetadata> = {
  glass: {
    title: 'Glassmorphism Generator | Nine Hub Tools',
    description: 'Create stunning glassmorphism effects with our intuitive CSS generator. Adjust blur, transparency, and borders in real-time. Copy CSS code instantly.',
    keywords: 'glassmorphism generator, glass effect, frosted glass CSS, backdrop filter, blur effect generator',
    ogImage: '/og-images/glass-tool.png',
    canonicalUrl: 'https://nineproo.com/glass'
  },
  prompt: {
    title: 'AI Prompt Generator | Nine Hub Tools',
    description: 'Enhance your AI prompts with our intelligent prompt generator. Perfect for ChatGPT, Claude, and other AI assistants.',
    keywords: 'AI prompt generator, ChatGPT prompts, prompt engineering, AI assistant, prompt optimizer',
    ogImage: '/og-images/prompt-tool.png',
    canonicalUrl: 'https://nineproo.com/prompt'
  },
  palette: {
    title: 'Color Palette Generator | Nine Hub Tools',
    description: 'Generate beautiful color palettes for your web projects. Harmonious colors with hex, RGB, and HSL values. Export to CSS variables.',
    keywords: 'color palette generator, color scheme, hex colors, RGB colors, color picker, design colors',
    ogImage: '/og-images/palette-tool.png',
    canonicalUrl: 'https://nineproo.com/palette'
  },
  grid: {
    title: 'CSS Grid Generator | Nine Hub Tools',
    description: 'Visual CSS Grid layout generator. Create responsive grid layouts with an intuitive interface. Copy production-ready CSS code.',
    keywords: 'CSS grid generator, grid layout, CSS grid template, responsive grid, grid columns, grid rows',
    ogImage: '/og-images/grid-tool.png',
    canonicalUrl: 'https://nineproo.com/grid'
  },
  'gradient-text': {
    title: 'Gradient Text Generator | Nine Hub Tools',
    description: 'Create eye-catching gradient text effects. Customize colors, angles, and styles. Get CSS code for beautiful text gradients.',
    keywords: 'gradient text, text gradient CSS, gradient typography, colorful text, linear gradient text',
    ogImage: '/og-images/gradient-text-tool.png',
    canonicalUrl: 'https://nineproo.com/gradient-text'
  },
  shadow: {
    title: 'Box Shadow Generator | Nine Hub Tools',
    description: 'Design perfect box shadows for your UI elements. Adjust offset, blur, spread, and color. Multiple shadows supported.',
    keywords: 'box shadow generator, CSS shadow, drop shadow, shadow CSS, UI shadows, card shadows',
    ogImage: '/og-images/shadow-tool.png',
    canonicalUrl: 'https://nineproo.com/shadow'
  },
  blob: {
    title: 'Blob Shape Generator | Nine Hub Tools',
    description: 'Generate organic blob shapes for modern web design. Customize complexity, size, and colors. Export as SVG or CSS.',
    keywords: 'blob generator, organic shapes, SVG blob, random shape generator, modern design shapes',
    ogImage: '/og-images/blob-tool.png',
    canonicalUrl: 'https://nineproo.com/blob'
  },
  contrast: {
    title: 'Color Contrast Checker | Nine Hub Tools',
    description: 'Check WCAG color contrast ratios for accessibility. Ensure your designs meet AA and AAA standards for text readability.',
    keywords: 'contrast checker, WCAG contrast, accessibility checker, color contrast ratio, text readability, AA AAA compliance',
    ogImage: '/og-images/contrast-tool.png',
    canonicalUrl: 'https://nineproo.com/contrast'
  },
  meta: {
    title: 'Meta Tags Generator | Nine Hub Tools',
    description: 'Generate SEO-optimized meta tags for your website. Create Open Graph, Twitter Card, and standard meta tags instantly.',
    keywords: 'meta tags generator, SEO meta tags, open graph generator, twitter card generator, HTML meta tags',
    ogImage: '/og-images/meta-tool.png',
    canonicalUrl: 'https://nineproo.com/meta'
  }
};

export const updateMetaTags = (metadata: Partial<SEOMetadata>) => {
  const meta = { ...defaultMetadata, ...metadata };

  // Update title
  document.title = meta.title;

  // Update or create meta tags
  const metaTags = [
    { name: 'description', content: meta.description },
    { name: 'keywords', content: meta.keywords || defaultMetadata.keywords },
    
    // Open Graph
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:image', content: meta.ogImage || defaultMetadata.ogImage },
    { property: 'og:type', content: meta.ogType || defaultMetadata.ogType },
    { property: 'og:url', content: meta.canonicalUrl || defaultMetadata.canonicalUrl },
    { property: 'og:site_name', content: 'Nine Hub Tools' },
    
    // Twitter Card
    { name: 'twitter:card', content: meta.twitterCard || defaultMetadata.twitterCard },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: meta.ogImage || defaultMetadata.ogImage },
    
    // Additional SEO
    { name: 'author', content: 'NineProo.com' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ];

  metaTags.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    let element = document.querySelector(selector) as HTMLMetaElement;
    
    if (!element) {
      element = document.createElement('meta');
      if (name) element.setAttribute('name', name);
      if (property) element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content || '');
  });

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', meta.canonicalUrl || defaultMetadata.canonicalUrl || '');
};

export const getToolMetadata = (toolKey: string): SEOMetadata => {
  return toolsMetadata[toolKey] || defaultMetadata;
};

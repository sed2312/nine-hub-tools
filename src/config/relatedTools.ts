export const relatedToolsMap: Record<string, Array<{ name: string; path: string; description: string; icon: string }>> = {
    '/glass': [
        { name: 'Box Shadow Generator', path: '/shadow', description: 'Add depth with perfect shadows', icon: '📦' },
        { name: 'Gradient Text', path: '/gradient-text', description: 'Colorful text effects', icon: '🌈' },
        { name: 'Blob SVG Generator', path: '/blob', description: 'Organic shapes', icon: '🎨' }
    ],
    '/gradient-text': [
        { name: 'Glassmorphism', path: '/glass', description: 'Frosted glass UI effects', icon: '✨' },
        { name: 'Color Palette', path: '/palette', description: 'Harmonious color schemes', icon: '🎨' },
        { name: 'Box Shadow', path: '/shadow', description: 'Perfect CSS shadows', icon: '📦' }
    ],
    '/shadow': [
        { name: 'Glassmorphism', path: '/glass', description: 'Modern glass effects', icon: '✨' },
        { name: 'Blob SVG', path: '/blob', description: 'Organic backgrounds', icon: '🎨' },
        { name: 'CSS Grid', path: '/grid', description: 'Responsive layouts', icon: '📐' }
    ],
    '/palette': [
        { name: 'Gradient Text', path: '/gradient-text', description: 'Colorful typography', icon: '🌈' },
        { name: 'Contrast Checker', path: '/contrast', description: 'WCAG compliance', icon: '👁️' },
        { name: 'Glassmorphism', path: '/glass', description: 'Glass UI effects', icon: '✨' }
    ],
    '/grid': [
        { name: 'CSS Grid Generator', path: '/grid', description: 'Layout grids', icon: '📐' },
        { name: 'Box Shadow', path: '/shadow', description: 'UI depth', icon: '📦' },
        { name: 'Color Palette', path: '/palette', description: 'Color schemes', icon: '🎨' }
    ],
    '/blob': [
        { name: 'Glassmorphism', path: '/glass', description: 'Frosted glass', icon: '✨' },
        { name: 'Box Shadow', path: '/shadow', description: 'Shadow effects', icon: '📦' },
        { name: 'Gradient Text', path: '/gradient-text', description: 'Text gradients', icon: '🌈' }
    ],
    '/contrast': [
        { name: 'Color Palette', path: '/palette', description: 'Color harmony', icon: '🎨' },
        { name: 'Meta Tag Generator', path: '/meta', description: 'SEO meta tags', icon: '🏷️' },
        { name: 'Gradient Text', path: '/gradient-text', description: 'Colorful text', icon: '🌈' }
    ],
    '/meta': [
        { name: 'AI Prompt Helper', path: '/prompt', description: 'Better AI prompts', icon: '🤖' },
        { name: 'Contrast Checker', path: '/contrast', description: 'Accessibility check', icon: '👁️' },
        { name: 'Color Palette', path: '/palette', description: 'Brand colors', icon: '🎨' }
    ],
    '/prompt': [
        { name: 'Meta Tag Generator', path: '/meta', description: 'SEO optimization', icon: '🏷️' },
        { name: 'Gradient Text', path: '/gradient-text', description: 'Visual design', icon: '🌈' },
        { name: 'Glassmorphism', path: '/glass', description: 'Modern UI', icon: '✨' }
    ]
};

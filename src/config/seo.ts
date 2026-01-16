export interface PageSEO {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
    ogImage?: string;
    schema?: any;
}

export const seoConfig: Record<string, PageSEO> = {
    '/': {
        title: 'Nine Hub Tools - Free Web Design Tools for Developers',
        description: 'Professional design tools for web developers. Generate glassmorphism, gradients, shadows, color palettes, and more. Free and open-source.',
        keywords: ['free web tools', 'developer tools', 'web design tools', 'css generator'],
        canonical: 'https://nineproo.com/',
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "NineProo",
                "alternateName": "Nine Hub Tools",
                "url": "https://nineproo.com",
                "description": "Free online web design tools for developers, designers, and creators"
            },
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "NineProo",
                "url": "https://nineproo.com",
                "logo": "https://nineproo.com/logo.png",
                "sameAs": [
                    "https://x.com/nine_proo",
                    "https://www.instagram.com/nine_proo/",
                    "https://github.com"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "hello@nineproo.com",
                    "contactType": "Customer Service"
                }
            }
        ]
    },

    '/glass': {
        title: 'Glassmorphism Generator – Create Frosted Glass UI Effects in CSS | NineProo',
        description: 'Generate modern glassmorphism UI effects with CSS. Customize blur, transparency, borders, and shadows instantly using NineProo\'s free Glassmorphism Generator.',
        keywords: ['glassmorphism generator', 'glassmorphism css', 'frosted glass ui', 'glass effect css'],
        canonical: 'https://nineproo.com/glass',
        ogImage: '/og-glass.png',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Glassmorphism Generator",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "url": "https://nineproo.com/glass",
            "description": "Generate modern glassmorphism UI effects with customizable CSS properties.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    },

    '/gradient-text': {
        title: 'Gradient Text Generator – Create CSS Gradient Text Online | NineProo',
        description: 'Create beautiful gradient text using pure CSS. Customize colors, directions, and styles instantly with NineProo\'s free Gradient Text Generator.',
        keywords: ['gradient text generator', 'css text gradient', 'gradient typography', 'text gradient css'],
        canonical: 'https://nineproo.com/gradient-text',
        ogImage: '/og-gradient-text.png',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Gradient Text Generator",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "url": "https://nineproo.com/gradient-text",
            "description": "Create beautiful gradient text using pure CSS with customizable colors.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    },

    '/shadow': {
        title: 'Box Shadow Generator – CSS Box Shadow Creator Tool | NineProo',
        description: 'Design perfect CSS box shadows visually. Adjust blur, spread, color, and position and copy clean CSS code instantly with NineProo.',
        keywords: ['box shadow generator', 'css box shadow', 'shadow css', 'box shadow tool'],
        canonical: 'https://nineproo.com/shadow',
        ogImage: '/og-shadow.png',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Box Shadow Generator",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "url": "https://nineproo.com/shadow",
            "description": "Design perfect CSS box shadows visually with real-time preview.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    },

    '/palette': {
        title: 'Color Palette Generator – Create Harmonious Color Schemes | NineProo',
        description: 'Generate beautiful color palettes for web and UI design. Create harmonious color schemes instantly with NineProo\'s free Color Palette Generator.',
        keywords: ['color palette generator', 'color scheme generator', 'palette maker', 'color harmony'],
        canonical: 'https://nineproo.com/palette',
        ogImage: '/og-palette.png',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Color Palette Generator",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "url": "https://nineproo.com/palette",
            "description": "Generate beautiful color palettes for web and UI design.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    },

    '/grid': {
        title: 'CSS Grid Generator – Visual CSS Grid Layout Builder | NineProo',
        description: 'Build responsive CSS grid layouts visually. Generate clean, production-ready CSS Grid code using NineProo\'s free grid generator.',
        keywords: ['css grid generator', 'css grid layout', 'grid builder', 'responsive grid'],
        canonical: 'https://nineproo.com/grid',
        ogImage: '/og-grid.png',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "CSS Grid Generator",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "url": "https://nineproo.com/grid",
            "description": "Build responsive CSS grid layouts visually with instant code generation.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    },

    '/blob': {
        title: 'Blob SVG Generator – Create Organic SVG Shapes Online | NineProo',
        description: 'Generate organic SVG blob shapes for modern web design. Customize shapes and export SVG instantly with NineProo\'s Blob SVG Generator.',
        keywords: ['blob svg generator', 'svg blob', 'organic shapes svg', 'blob maker'],
        canonical: 'https://nineproo.com/blob',
        ogImage: '/og-blob.png',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Blob SVG Generator",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "url": "https://nineproo.com/blob",
            "description": "Generate organic SVG blob shapes for modern web design.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    },

    '/contrast': {
        title: 'Contrast Checker – WCAG Color Contrast Accessibility Tool | NineProo',
        description: 'Check color contrast ratios for accessibility. Ensure WCAG compliance for text and UI elements using NineProo\'s free Contrast Checker.',
        keywords: ['contrast checker', 'wcag contrast', 'accessibility checker', 'color contrast'],
        canonical: 'https://nineproo.com/contrast',
        ogImage: '/og-contrast.png',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Contrast Checker",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "url": "https://nineproo.com/contrast",
            "description": "Check color contrast ratios for WCAG accessibility compliance.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    },

    '/meta': {
        title: 'Meta Tag Generator – SEO Meta Title & Description Tool | NineProo',
        description: 'Generate SEO-optimized meta titles and descriptions instantly. Improve search visibility using NineProo\'s free Meta Tag Generator.',
        keywords: ['meta tag generator', 'seo meta', 'meta tags', 'seo generator'],
        canonical: 'https://nineproo.com/meta',
        ogImage: '/og-meta.png',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Meta Tag Generator",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "url": "https://nineproo.com/meta",
            "description": "Generate SEO-optimized meta titles and descriptions instantly.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    },

    '/prompt': {
        title: 'AI Prompt Helper – Generate Better AI Prompts Instantly | NineProo',
        description: 'Create clear, effective prompts for AI tools like ChatGPT and Claude. Improve output quality using NineProo\'s free AI Prompt Helper.',
        keywords: ['ai prompt generator', 'prompt engineering', 'chatgpt prompts', 'ai helper'],
        canonical: 'https://nineproo.com/prompt',
        ogImage: '/og-prompt.png',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Prompt Helper",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "url": "https://nineproo.com/prompt",
            "description": "Create clear, effective prompts for AI tools like ChatGPT and Claude.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    },

    // Supporting pages
    '/about': {
        title: 'About Nine Hub Tools - Free Design Tools for Developers',
        description: 'Learn about Nine Hub Tools, our mission to provide free professional design tools for web developers, and our open-source commitment.',
        keywords: ['about nine hub tools', 'web design tools', 'free developer tools'],
        canonical: 'https://nineproo.com/about',
    },

    '/contact': {
        title: 'Contact Nine Hub Tools - Get in Touch',
        description: 'Contact Nine Hub Tools for questions, feedback, or support. Reach us via email or social media.',
        keywords: ['contact nine hub tools', 'support', 'feedback'],
        canonical: 'https://nineproo.com/contact',
    },

    '/privacy': {
        title: 'Privacy Policy - Nine Hub Tools',
        description: 'Read our privacy policy to understand how Nine Hub Tools collects, uses, and protects your personal data.',
        keywords: ['privacy policy', 'data protection', 'privacy'],
        canonical: 'https://nineproo.com/privacy',
    },

    '/terms': {
        title: 'Terms of Service - Nine Hub Tools',
        description: 'Read our terms of service to understand your rights and responsibilities when using Nine Hub Tools.',
        keywords: ['terms of service', 'terms and conditions', 'legal'],
        canonical: 'https://nineproo.com/terms',
    },

    // New legal pages
    '/terms-of-service': {
        title: 'Terms of Service - NineProo',
        description: 'Terms of Service for NineProo. By using our free web tools, you agree to these terms. Learn about your rights, limitations, and our policies.',
        keywords: ['terms of service', 'legal', 'terms and conditions', 'user agreement'],
        canonical: 'https://nineproo.com/terms-of-service',
    },

    '/privacy-policy': {
        title: 'Privacy Policy - NineProo',
        description: 'Privacy Policy for NineProo. Learn how we collect, use, and protect your data when you use our free web design tools.',
        keywords: ['privacy policy', 'data privacy', 'cookies', 'user data'],
        canonical: 'https://nineproo.com/privacy-policy',
    },

    '/disclaimer': {
        title: 'Disclaimer - NineProo',
        description: 'Legal disclaimer for NineProo. Our web tools are provided as-is for educational purposes. Read the full disclaimer before use.',
        keywords: ['disclaimer', 'legal notice', 'liability', 'terms of use'],
        canonical: 'https://nineproo.com/disclaimer',
    },

    '/cookie-policy': {
        title: 'Cookie Policy - NineProo',
        description: 'Cookie Policy for NineProo. Learn about the cookies we use, how we use them, and how you can manage cookie preferences.',
        keywords: ['cookie policy', 'cookies', 'tracking', 'privacy'],
        canonical: 'https://nineproo.com/cookie-policy',
    },
};

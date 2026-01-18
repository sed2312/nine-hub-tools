import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArrowRight, ExternalLink, Check } from 'lucide-react';
import { workflows, synergies, faqs } from '@/data/overview-content';
import {
    generateWebPageSchema,
    generateSoftwareApplicationSchema,
    generateHowToSchema,
    generateFAQPageSchema,
    generateBreadcrumbSchema,
    generateOrganizationSchema,
    combineSchemas
} from '@/lib/schema-markup';

// Tool data for the directory section
const allTools = [
    {
        id: 'glass',
        name: 'Glassmorphism Generator',
        path: '/glass',
        icon: '✨',
        description: 'Professional glassmorphism CSS generator for creating modern frosted glass UI effects. Generate backdrop-filter CSS code with live preview.',
        whatIsIt: 'Glassmorphism is a modern UI design trend characterized by frosted glass effects using CSS backdrop-filter properties. It creates semi-transparent elements with blurred backgrounds, subtle borders, and soft shadows that appear to float above content. This effect became popular in 2020-2021 and is widely used in modern web applications for cards, modals, navigation bars, and overlay elements.',
        bestFor: [
            { text: 'Modern landing page cards', link: true },
            { text: 'Dashboard components and widgets', link: true },
            { text: 'Modal overlays and popups', link: false },
            { text: 'Navigation bars with transparency', link: false }
        ],
        worksWith: [
            { name: 'Color Palette Generator', path: '/palette', reason: 'Choose perfect background colors with transparency values' },
            { name: 'Box Shadow Generator', path: '/shadow', reason: 'Add depth and elevation to glass effects' },
            { name: 'Contrast Checker', path: '/contrast', reason: 'Ensure text readability on transparent backgrounds' }
        ],
        proTips: [
            'Use moderate blur values (10-20px) for optimal readability. Higher blur can make text hard to read.',
            'Glassmorphism works best on busy backgrounds (images, gradients). On solid colors, use subtle transparency (80-90%).',
            'Always provide fallback solid backgrounds for older browsers that don\'t support backdrop-filter.',
            'Combine with soft shadows (0 8px 32px rgba(0,0,0,0.1)) for proper depth perception and visual hierarchy.'
        ]
    },
    {
        id: 'gradient-text',
        name: 'Gradient Text Generator',
        path: '/gradient-text',
        icon: '🌈',
        description: 'Create stunning gradient text effects for headings and CTAs. Generate CSS with customizable colors, angles, and animation.',
        whatIsIt: 'Gradient text applies color gradients to typography using CSS background-clip and text-fill properties. Unlike solid color text, gradient text can transition between multiple colors, creating eye-catching effects perfect for hero headings, brand names, and call-to-action elements. Modern browsers support smooth, high-quality gradient rendering with animation capabilities.',
        bestFor: [
            { text: 'Hero section headings', link: true },
            { text: 'Brand names and logos', link: false },
            { text: 'Call-to-action buttons and links', link: true },
            { text: 'Section titles and emphasis text', link: false }
        ],
        worksWith: [
            { name: 'Color Palette Generator', path: '/palette', reason: 'Select harmonious color combinations for gradients' },
            { name: 'Box Shadow Generator', path: '/shadow', reason: 'Add text shadows for depth and readability' },
            { name: 'Contrast Checker', path: '/contrast', reason: 'Verify gradient endpoints maintain readability' }
        ],
        proTips: [
            'Use 2-3 colors maximum for readability. Too many colors create visual noise and reduce legibility.',
            'Choose colors with similar brightness levels to maintain consistent readability across the gradient.',
            'Add subtle text shadows (2px 2px 4px rgba(0,0,0,0.1)) to improve legibility on complex backgrounds.',
            'Consider animated gradients for high-impact hero sections, but avoid on body text to prevent distraction.'
        ]
    },
    {
        id: 'shadow',
        name: 'Box Shadow Generator',
        path: '/shadow',
        icon: '🎭',
        description: 'Design perfect box shadows for UI elements. Create depth, elevation, and visual hierarchy with customizable shadow layers.',
        whatIsIt: 'Box shadows create depth and elevation in UI design by simulating how light casts shadows on physical objects. CSS box-shadow property allows multiple shadow layers, inset shadows, and precise control over offset, blur, spread, and color. Proper shadow usage establishes visual hierarchy, guides user attention, and creates realistic depth perception in flat digital interfaces.',
        bestFor: [
            { text: 'Card components and containers', link: true },
            { text: 'Buttons with elevation states', link: true },
            { text: 'Modal dialogs and popovers', link: true },
            { text: 'Image galleries and media elements', link: false }
        ],
        worksWith: [
            { name: 'Glassmorphism Generator', path: '/glass', reason: 'Add depth to frosted glass effects' },
            { name: 'Color Palette Generator', path: '/palette', reason: 'Match shadow colors to your palette' },
            { name: 'CSS Grid Generator', path: '/grid', reason: 'Apply consistent shadows across grid layouts' }
        ],
        proTips: [
            'Create a shadow system with 3-5 levels (subtle, small, medium, large, extra-large) for consistency across your application.',
            'Use larger blur radius and lighter opacity for elevated elements farther from the background.',
            'Colored shadows (matching your brand) create more cohesive designs than pure black shadows.',
            'For interactive elements, use different shadow levels for default, hover, and active states to indicate interactivity.'
        ]
    },
    {
        id: 'palette',
        name: 'Color Palette Generator',
        path: '/palette',
        icon: '🎨',
        description: 'Generate harmonious color palettes using color theory. Create accessible, beautiful color schemes with multiple harmony rules.',
        whatIsIt: 'Color palette generators use color theory principles to create harmonious color combinations. Based on a starting color, the generator applies harmony rules (complementary, analogous, triadic, tetradic) to suggest colors that work well together. Professional color palettes include primary colors, secondary colors, neutrals, and semantic colors (success, error, warning), all tested for accessibility and visual harmony.',
        bestFor: [
            { text: 'Brand identity color systems', link: true },
            { text: 'Design system foundations', link: true },
            { text: 'Theme creation (light/dark modes)', link: true },
            { text: 'Marketing materials and landing pages', link: false }
        ],
        worksWith: [
            { name: 'Contrast Checker', path: '/contrast', reason: 'Verify color combinations meet accessibility standards' },
            { name: 'Gradient Text Generator', path: '/gradient-text', reason: 'Apply palette colors to gradient effects' },
            { name: 'Glassmorphism Generator', path: '/glass', reason: 'Use palette colors for glass background tints' }
        ],
        proTips: [
            'Start with your brand color as the base, then generate harmonious secondary colors automatically.',
            'Generate multiple shades (5-7) of each main color for flexibility in light/dark text and background combinations.',
            'Test every palette against both white and dark backgrounds to ensure versatility for light and dark modes.',
            'Save successful palettes with descriptive names - document which colors serve which purposes (primary, accent, neutral).'
        ]
    },
    {
        id: 'grid',
        name: 'CSS Grid Generator',
        path: '/grid',
        icon: '📐',
        description: 'Build responsive grid layouts visually. Create complex CSS Grid structures with template areas, gaps, and alignment controls.',
        whatIsIt: 'CSS Grid is a powerful two-dimensional layout system that enables complex, responsive layouts with clean, semantic code. Unlike older methods (floats, positioning), CSS Grid provides precise control over both rows and columns, enabling magazine-style layouts, dashboards, card grids, and responsive designs that adapt fluidly across devices. The visual editor makes grid creation intuitive even for Grid beginners.',
        bestFor: [
            { text: 'Dashboard layouts and admin panels', link: true },
            { text: 'Card-based designs and galleries', link: true },
            { text: 'Magazine-style content layouts', link: false },
            { text: 'Responsive application shells', link: true }
        ],
        worksWith: [
            { name: 'Glassmorphism Generator', path: '/glass', reason: 'Create glass cards within grid layouts' },
            { name: 'Box Shadow Generator', path: '/shadow', reason: 'Add shadows to grid items for depth' },
            { name: 'Color Palette Generator', path: '/palette', reason: 'Define consistent colors across grid sections' }
        ],
        proTips: [
            'Start with mobile layouts (1 column) and enhance for larger screens - mobile-first approach ensures accessibility.',
            'Use named grid template areas for complex layouts - they\'re more maintainable than line numbers.',
            'Set a maximum width on the grid container (max-width: 1200px) to prevent extremely wide layouts on large screens.',
            'Use gap property instead of margins for spacing - it creates cleaner code and prevents margin collapse issues.'
        ]
    },
    {
        id: 'blob',
        name: 'Blob SVG Generator',
        path: '/blob',
        icon: '🫧',
        description: 'Create organic blob shapes for modern designs. Generate random SVG blobs with customizable complexity and smoothness.',
        whatIsIt: 'Blob generators create organic, irregular SVG shapes that break away from rigid geometric design. These fluid shapes add visual interest, movement, and modern aesthetics to backgrounds, section divisions, and decorative elements. Blobs are generated using randomized curves with controllable complexity, creating unique shapes each time while maintaining visual harmony and balance.',
        bestFor: [
            { text: 'Background decorative elements', link: true },
            { text: 'Section dividers and transitions', link: false },
            { text: 'Abstract brand graphics', link: true },
            { text: 'Hero section organic shapes', link: true }
        ],
        worksWith: [
            { name: 'Color Palette Generator', path: '/palette', reason: 'Apply brand colors to blob fills and gradients' },
            { name: 'Gradient Text Generator', path: '/gradient-text', reason: 'Create gradient-filled blobs' },
            { name: 'Box Shadow Generator', path: '/shadow', reason: 'Add depth to floating blob shapes' }
        ],
        proTips: [
            'Use low opacity (10-30%) for background blobs to avoid overwhelming content and maintain text readability.',
            'Layer multiple blobs with different colors and blur filters for complex, depth-filled backgrounds.',
            'Animate blob shapes with CSS transforms (scale, rotate) for subtle motion that adds life to static designs.',
            'Export blobs as SVG rather than CSS backgrounds when you need crisp edges and small file sizes.'
        ]
    },
    {
        id: 'contrast',
        name: 'Contrast Checker',
        path: '/contrast',
        icon: '♿',
        description: 'Verify color contrast for WCAG accessibility. Check contrast ratios, get compliance feedback, find accessible alternatives.',
        whatIsIt: 'Contrast checking validates that text and background color combinations meet Web Content Accessibility Guidelines (WCAG) for users with vision impairments. WCAG defines minimum contrast ratios: 4.5:1 for normal text (AA), 7:1 for AAA, and 3:1 for large text. Proper contrast ensures readability for users with low vision, color blindness, or viewing content on poor displays or in bright sunlight.',
        bestFor: [
            { text: 'Ensuring accessible text readability', link: true },
            { text: 'WCAG compliance verification', link: true },
            { text: 'Color system accessibility testing', link: true },
            { text: 'Brand color accessibility validation', link: false }
        ],
        worksWith: [
            { name: 'Color Palette Generator', path: '/palette', reason: 'Validate palette colors for accessibility' },
            { name: 'Glassmorphism Generator', path: '/glass', reason: 'Check text contrast on glass backgrounds' },
            { name: 'Gradient Text Generator', path: '/gradient-text', reason: 'Verify gradient endpoints meet standards' }
        ],
        proTips: [
            'Test all text sizes - small text requires higher contrast (4.5:1) than large text (3:1) for AA compliance.',
            'Remember that transparency affects contrast - test glassmorphism and overlays with actual background images.',
            'Don\'t rely solely on color to convey information - use icons, labels, and patterns for color-blind users.',
            'Use the tool to find accessible alternatives when your preferred colors fail - small hue adjustments often fix contrast issues.'
        ]
    },
    {
        id: 'meta',
        name: 'Meta Tag Generator',
        path: '/meta',
        icon: '🏷️',
        description: 'Generate SEO-optimized meta tags. Create Open Graph, Twitter Cards, and standard meta tags with instant preview.',
        whatIsIt: 'Meta tags are HTML elements in the document head that provide metadata about web pages to search engines and social media platforms. They control how pages appear in search results (title, description) and social shares (Open Graph for Facebook, Twitter Cards). Proper meta tags significantly impact click-through rates, SEO performance, and social media engagement by presenting your content attractively.',
        bestFor: [
            { text: 'SEO optimization for better rankings', link: true },
            { text: 'Social media share previews', link: true },
            { text: 'Website metadata management', link: false },
            { text: 'Landing page optimization', link: true }
        ],
        worksWith: [
            { name: 'Contrast Checker', path: '/contrast', reason: 'Ensure meta images have readable text overlays' },
            { name: 'Color Palette Generator', path: '/palette', reason: 'Design consistent meta preview images' }
        ],
        proTips: [
            'Keep titles under 60 characters and descriptions under 160 characters to prevent truncation in search results.',
            'Write unique meta descriptions for each page - duplicate descriptions reduce SEO effectiveness.',
            'Include target keywords naturally in title and description, but prioritize readability over keyword stuffing.',
            'Create custom Open Graph images (1200x630px) with text overlays for better social media engagement.'
        ]
    },
    {
        id: 'prompt',
        name: 'AI Prompt Helper',
        path: '/prompt',
        icon: '🤖',
        description: 'Optimize AI prompts for better results. Enhance prompts for ChatGPT, Claude, and other AI tools with best practices.',
        whatIsIt: 'AI Prompt optimization improves the quality of responses from AI language models like ChatGPT, Claude, and others. Well-crafted prompts include clear context, specific instructions, desired format, constraints, and examples. The tool helps structure prompts effectively, suggest improvements, and apply prompt engineering best practices like role assignment, step-by-step reasoning, and output formatting.',
        bestFor: [
            { text: 'Improving ChatGPT/Claude responses', link: true },
            { text: 'Content generation workflows', link: false },
            { text: 'AI-assisted development tasks', link: true },
            { text: 'Creative writing and brainstorming', link: false }
        ],
        worksWith: [
            { name: 'Meta Tag Generator', path: '/meta', reason: 'Generate meta descriptions using AI prompts' },
            { name: 'Color Palette Generator', path: '/palette', reason: 'Use AI prompts to generate color scheme ideas' }
        ],
        proTips: [
            'Provide examples of desired output format - AI models learn patterns from examples better than abstract instructions.',
            'Use role assignment ("You are an expert web developer...") to get more specialized, higher-quality responses.',
            'Break complex tasks into step-by-step prompts rather than one massive prompt - iterative refinement works better.',
            'Specify constraints explicitly (word count, tone, audience) to get responses that meet your exact requirements.'
        ]
    }
];

export default function ToolsOverview() {
    // Generate all schema markup
    const schemas = combineSchemas(
        generateWebPageSchema({
            name: 'Web Design Tools Overview - Complete Guide for Developers',
            description: 'Comprehensive guide to using 9 professional web design tools together. Learn workflows, tool synergies, and best practices for modern web development.',
            url: 'https://nineproo.com/tools-overview'
        }),
        generateOrganizationSchema(),
        generateBreadcrumbSchema([
            { name: 'Home', url: 'https://nineproo.com' },
            { name: 'Tools Overview', url: 'https://nineproo.com/tools-overview' }
        ]),
        generateFAQPageSchema(faqs),
        ...workflows.map(workflow =>
            generateHowToSchema({
                name: workflow.title,
                description: workflow.description,
                steps: workflow.toolSequence.map(tool => ({
                    name: tool.tool,
                    text: tool.action,
                    url: `https://nineproo.com${tool.path}`
                }))
            })
        ),
        ...allTools.map(tool =>
            generateSoftwareApplicationSchema({
                name: tool.name,
                description: tool.description,
                url: `https://nineproo.com${tool.path}`,
                applicationCategory: 'DesignApplication',
                features: tool.proTips
            })
        )
    );

    // Set page title and meta
    useEffect(() => {
        document.title = 'Web Design Tools Overview - 9 Free CSS Generators | Nine Hub Tools';
    }, []);

    return (
        <Layout>
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />

            {/* Breadcrumbs */}
            <div className="border-b border-border">
                <div className="container mx-auto px-4 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-foreground">Tools Overview</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Hero Section */}
                <header className="mb-16 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Complete Web Design Tools Guide for Developers
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Master 9 professional web design tools that work together seamlessly. Learn proven workflows,
                        discover powerful tool combinations, and create stunning, accessible designs faster than ever.
                        Whether you're building landing pages, dashboards, or complete design systems, these free CSS
                        generators and design tools streamline your development workflow while ensuring professional results.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/glass"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Try Glassmorphism Generator
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/palette"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-semibold hover:border-primary transition-colors"
                        >
                            Explore Color Palettes
                        </Link>
                    </div>
                </header>

                {/* Table of Contents */}
                <nav className="mb-16 p-6 rounded-lg border border-border bg-card/50">
                    <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
                    <ul className="grid md:grid-cols-2 gap-3">
                        <li>
                            <a href="#workflows" className="text-primary hover:underline flex items-center gap-2">
                                <span className="text-lg">🚀</span>
                                Quick Start Design Workflows
                            </a>
                        </li>
                        <li>
                            <a href="#synergies" className="text-primary hover:underline flex items-center gap-2">
                                <span className="text-lg">🔗</span>
                                Tool Combinations & Synergies
                            </a>
                        </li>
                        <li>
                            <a href="#tools" className="text-primary hover:underline flex items-center gap-2">
                                <span className="text-lg">🛠️</span>
                                Complete Tool Directory
                            </a>
                        </li>
                        <li>
                            <a href="#design-systems" className="text-primary hover:underline flex items-center gap-2">
                                <span className="text-lg">🎨</span>
                                Building Design Systems
                            </a>
                        </li>
                        <li>
                            <a href="#best-practices" className="text-primary hover:underline flex items-center gap-2">
                                <span className="text-lg">✅</span>
                                Design Tool Best Practices
                            </a>
                        </li>
                        <li>
                            <a href="#faq" className="text-primary hover:underline flex items-center gap-2">
                                <span className="text-lg">❓</span>
                                Frequently Asked Questions
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Section 1: Quick Start Workflows */}
                <section id="workflows" className="mb-20">
                    <h2 className="text-3xl font-bold mb-4">Quick Start Design Workflows</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Learn how to combine multiple tools in proven workflows that solve real design challenges.
                        Each workflow provides step-by-step guidance for common web design tasks, from landing page heroes
                        to accessible UI components.
                    </p>

                    <div className="space-y-8">
                        {workflows.map((workflow, index) => (
                            <article
                                key={workflow.id}
                                className="p-6 rounded-lg border border-border bg-card/30 hover:border-primary/50 transition-colors"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-2">{workflow.title}</h3>
                                        <p className="text-muted-foreground">{workflow.description}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                                        The Challenge
                                    </h4>
                                    <p className="text-foreground/90">{workflow.problem}</p>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                                        Tool Sequence
                                    </h4>
                                    <ol className="space-y-3">
                                        {workflow.toolSequence.map((tool, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0 mt-0.5">
                                                    {idx + 1}
                                                </span>
                                                <div>
                                                    <Link
                                                        to={tool.path}
                                                        className="font-semibold text-primary hover:underline"
                                                    >
                                                        {tool.tool}
                                                    </Link>
                                                    <p className="text-sm text-muted-foreground mt-1">{tool.action}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                <div className="mb-4 p-4 rounded-lg bg-muted/50">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <span className="text-yellow-500">💡</span>
                                        Why This Workflow Works
                                    </h4>
                                    <p className="text-sm text-muted-foreground">{workflow.why}</p>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                                        Expected Outcome
                                    </h4>
                                    <p className="text-foreground/90">{workflow.outcome}</p>
                                </div>

                                {workflow.codeExample && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold mb-2 text-sm">Code Example</h4>
                                        <pre className="p-4 rounded-lg bg-black/50 text-sm overflow-x-auto">
                                            <code className="text-green-400">{workflow.codeExample.code}</code>
                                        </pre>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                {/* Section 2: Tool Synergies */}
                <section id="synergies" className="mb-20">
                    <h2 className="text-3xl font-bold mb-4">Tool Combinations & Synergies</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Discover how our design tools work together to create stunning effects. These combinations show you
                        exactly which tools to use together and in what order to achieve professional results.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {synergies.map((synergy) => (
                            <article
                                key={synergy.id}
                                className="p-6 rounded-lg border border-border bg-card/30 hover:border-primary/50 transition-colors"
                            >
                                <h3 className="text-xl font-bold mb-3">{synergy.title}</h3>
                                <p className="text-muted-foreground mb-4">{synergy.description}</p>

                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2 text-sm">Tools Used</h4>
                                    <ul className="space-y-2">
                                        {synergy.tools.map((tool, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <div>
                                                    <Link to={tool.path} className="text-primary hover:underline font-medium">
                                                        {tool.name}
                                                    </Link>
                                                    <span className="text-muted-foreground"> - {tool.purpose}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2 text-sm">Steps</h4>
                                    <ol className="space-y-2">
                                        {synergy.steps.map((step, idx) => (
                                            <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                                <span className="text-primary font-semibold">{idx + 1}.</span>
                                                <span>{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                {synergy.codeSnippet && (
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm">Code Snippet</h4>
                                        <pre className="p-3 rounded-lg bg-black/50 text-xs overflow-x-auto">
                                            <code className="text-green-400">{synergy.codeSnippet}</code>
                                        </pre>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                {/* Section 3: Complete Tool Directory */}
                <section id="tools" className="mb-20">
                    <h2 className="text-3xl font-bold mb-4">Complete Tool Directory</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Explore all 9 professional web design tools. Each tool is explained in detail with use cases,
                        best practices, and recommendations for complementary tools.
                    </p>

                    <div className="space-y-8">
                        {allTools.map((tool) => (
                            <article
                                key={tool.id}
                                id={tool.id}
                                className="p-6 rounded-lg border border-border bg-card/30 scroll-mt-20"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <span className="text-4xl">{tool.icon}</span>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
                                        <p className="text-muted-foreground mb-4">{tool.description}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2">What is {tool.name.replace(' Generator', '').replace(' Checker', '').replace(' Helper', '')}?</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{tool.whatIsIt}</p>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2">Best Used For:</h4>
                                    <ul className="space-y-1">
                                        {tool.bestFor.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2">Works Best With:</h4>
                                    <ul className="space-y-2">
                                        {tool.worksWith.map((relatedTool, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <ExternalLink className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <div>
                                                    <Link to={relatedTool.path} className="text-primary hover:underline font-medium">
                                                        {relatedTool.name}
                                                    </Link>
                                                    <span className="text-muted-foreground"> - {relatedTool.reason}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-4 p-4 rounded-lg bg-muted/50">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <span className="text-yellow-500">💡</span>
                                        Pro Tips
                                    </h4>
                                    <ul className="space-y-2">
                                        {tool.proTips.map((tip, idx) => (
                                            <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                                <span className="text-primary">•</span>
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    to={tool.path}
                                    className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                                >
                                    Try {tool.name}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Section 4: Building Design Systems */}
                <section id="design-systems" className="mb-20">
                    <h2 className="text-3xl font-bold mb-4">Building Complete Design Systems</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                        A design system is your blueprint for consistent, scalable design. Learn how to use our tools
                        together to create a comprehensive design system that ensures consistency across your entire application.
                    </p>

                    <div className="prose prose-invert max-w-none">
                        <h3 className="text-xl font-semibold mb-3">What is a Design System?</h3>
                        <p className="text-muted-foreground mb-4">
                            A design system is a collection of reusable components, design tokens (colors, typography, spacing),
                            and guidelines that ensure consistent design across your application. For developers, it's like having
                            a design API - predefined values and components you can use confidently, knowing they'll work together
                            harmoniously and maintain brand consistency.
                        </p>

                        <h3 className="text-xl font-semibold mb-3">Why Developers Need Design Systems</h3>
                        <p className="text-muted-foreground mb-4">
                            Design systems eliminate decision fatigue. Instead of choosing colors, shadows, and spacing for every
                            element, you reference predefined tokens. This speeds up development, ensures consistency, makes
                            maintenance easier (update tokens once, changes propagate everywhere), and ensures accessibility by
                            building it into your foundation. Even solo developers benefit from reduced cognitive load and faster iteration.
                        </p>

                        <h3 className="text-xl font-semibold mb-3">Step-by-Step: Creating Your Design System with Nine Hub Tools</h3>

                        <div className="space-y-6 mt-4">
                            <div className="p-4 rounded-lg border border-border bg-card/30">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    Foundation: Color System
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Use the <Link to="/palette" className="text-primary hover:underline">Color Palette Generator</Link> to create
                                    your foundational colors. Generate primary, secondary, and neutral palettes with 5-7 shades each. These become
                                    your color tokens (--color-primary-500, --color-neutral-700, etc.).
                                </p>
                            </div>

                            <div className="p-4 rounded-lg border border-border bg-card/30">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    Validation: Accessibility
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Use the <Link to="/contrast" className="text-primary hover:underline">Contrast Checker</Link> to validate
                                    every text/background combination. Document which color pairs are accessible (4.5:1 for body text). This
                                    prevents accessibility issues before they happen.
                                </p>
                            </div>

                            <div className="p-4 rounded-lg border border-border bg-card/30">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    Elevation: Shadow System
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Use the <Link to="/shadow" className="text-primary hover:underline">Box Shadow Generator</Link> to create
                                    a 5-level shadow system (xs, sm, md, lg, xl). These shadows represent different elevations and create
                                    consistent depth throughout your application.
                                </p>
                            </div>

                            <div className="p-4 rounded-lg border border-border bg-card/30">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    Effects: Glass & Gradients
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Define component variants using the <Link to="/glass" className="text-primary hover:underline">Glassmorphism Generator</Link> (light
                                    glass, dark glass, colored glass) and <Link to="/gradient-text" className="text-primary hover:underline">Gradient Text Generator</Link> (heading
                                    gradients, accent gradients). Save these as reusable CSS classes.
                                </p>
                            </div>

                            <div className="p-4 rounded-lg border border-border bg-card/30">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">5</span>
                                    Layout: Grid Systems
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Use the <Link to="/grid" className="text-primary hover:underline">CSS Grid Generator</Link> to establish
                                    standard layout patterns (12-column grid, dashboard layout, card grid). Define consistent breakpoints
                                    (mobile: 640px, tablet: 768px, desktop: 1024px, wide: 1280px).
                                </p>
                            </div>

                            <div className="p-4 rounded-lg border border-border bg-card/30">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">6</span>
                                    Documentation: Component Library
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Create a component library using your design tokens. Build buttons, cards, forms, and navigation
                                    components that reference your color, shadow, and layout tokens. Document usage guidelines and examples.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-3 mt-8">Export and Implementation</h3>
                        <p className="text-muted-foreground mb-4">
                            Export your design tokens as CSS custom properties. Modern frameworks (React, Vue, Svelte) and CSS
                            preprocessors (SASS, LESS) can consume these tokens. Update your entire design by changing token values
                            rather than hunting through stylesheets. This is the power of systematic design - make decisions once,
                            apply everywhere, maintain effortlessly.
                        </p>

                        <div className="mt-4 p-4 rounded-lg bg-black/50">
                            <pre className="text-sm overflow-x-auto">
                                <code className="text-green-400">{`/* Design system tokens */
:root {
  /* Colors */
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.15);
  
  /* Glass */
  --glass-light: rgba(255, 255, 255, 0.1);
  --glass-blur: blur(12px);
  
  /* Spacing (8px base) */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-4: 2rem;
}

/* Usage example */
.card {
  background: var(--glass-light);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-md);
  padding: var(--space-4);
  color: var(--color-primary-600);
}`}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                {/* Section 5: Best Practices */}
                <section id="best-practices" className="mb-20">
                    <h2 className="text-3xl font-bold mb-4">Design Tool Best Practices</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Maximize the effectiveness of your design tools with these best practices covering performance,
                        accessibility, browser compatibility, and code organization.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-lg border border-border bg-card/30">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <span>⚡</span>
                                Performance Considerations
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Minimize backdrop-filter usage - it's GPU-intensive. Use on 5-10 elements maximum per page.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Avoid animating expensive properties (box-shadow, backdrop-filter). Use transform and opacity instead.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Combine multiple box-shadows in one declaration rather than layering multiple elements.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Use CSS custom properties for design tokens - they're faster than SASS variables at runtime.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-lg border border-border bg-card/30">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <span>🌐</span>
                                Browser Compatibility
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Always provide fallbacks for backdrop-filter - 5% of users still use older browsers.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Test gradient text in Firefox - it renders slightly differently than Chrome/Safari.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Use @supports queries to provide alternative styles for unsupported features.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>CSS Grid has excellent support (96%+), but provide sensible flexbox fallbacks for legacy browsers.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-lg border border-border bg-card/30">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <span>♿</span>
                                Accessibility First
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Check every color combination with Contrast Checker before implementation - don't guess.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Ensure focus states are clearly visible - use box-shadows or outlines, never just color changes.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Test glassmorphism effects with actual content - transparency can destroy text contrast.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Provide text alternatives for decorative elements (blob shapes, gradients) using aria-label or aria-hidden.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-lg border border-border bg-card/30">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <span>📱</span>
                                Responsive Design
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Design mobile-first - start with 1-column layouts in Grid Generator, enhance for desktop.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Reduce blur amounts on mobile devices - heavy backdrop-filter can cause performance issues.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Use relative units (rem, em, %) for spacing and typography to ensure proper scaling.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Test touch targets - buttons and interactive elements should be minimum 44x44px for mobile users.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-lg border border-border bg-card/30">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <span>📝</span>
                                Code Organization
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Create a design tokens file with all colors, shadows, and effects - single source of truth.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Use semantic naming (--color-primary, not --color-blue) - enables theme switching without renaming.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Group related utilities in comments - makes generated CSS easier to maintain and understand.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Document complex effects with comments explaining the design intent and browser requirements.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-lg border border-border bg-card/30">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <span>🎨</span>
                                Design Token Management
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Start with 3-5 design tokens, expand as needed - too many tokens create decision paralysis.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Use a naming convention (BEM, SMACSS) and stick to it for consistency across projects.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Version your design system - track changes to tokens just like code changes.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Share tokens across teams using JSON or YAML files - enables cross-platform consistency.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 6: FAQ */}
                <section id="faq" className="mb-20">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Common questions about web design tools, workflows, and best practices answered comprehensively.
                    </p>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <article
                                key={index}
                                className="p-6 rounded-lg border border-border bg-card/30"
                            >
                                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center py-16 px-6 rounded-lg border border-border bg-gradient-to-br from-primary/5 to-purple-500/5">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Design Workflow?</h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Start using these professional web design tools today. All tools are free, require no account,
                        and provide instant code generation. Create stunning, accessible designs in minutes.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/glass"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                        >
                            Explore All 9 Tools
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/sitemap"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-lg font-semibold text-lg hover:border-primary transition-colors"
                        >
                            View Sitemap
                        </Link>
                    </div>
                </section>
            </div>

            {/* Hidden SEO content - for search engine indexing */}
            <div className="sr-only">
                <p>
                    Nine Hub Tools provides free CSS generators and web design tools for developers. Our collection includes
                    glassmorphism generator, gradient text generator, box shadow generator, color palette generator, CSS grid
                    generator, blob SVG generator, contrast checker, meta tag generator, and AI prompt helper. All tools are
                    open-source, free to use, and provide instant CSS code generation for modern web development projects.
                </p>
            </div>
        </Layout>
    );
}

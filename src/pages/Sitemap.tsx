import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

export default function Sitemap() {
    const designTools = [
        { path: '/glass', name: 'Glassmorphism Generator', desc: 'Create modern frosted glass UI effects' },
        { path: '/gradient-text', name: 'Gradient Text Generator', desc: 'Animated gradient text effects' },
        { path: '/shadow', name: 'Box Shadow Generator', desc: 'Perfect CSS shadow effects' },
        { path: '/blob', name: 'Blob SVG Generator', desc: 'Organic SVG shapes' }
    ];

    const cssTools = [
        { path: '/grid', name: 'CSS Grid Generator', desc: 'Responsive grid layouts' },
        { path: '/palette', name: 'Color Palette Generator', desc: 'Harmonious color schemes' }
    ];

    const aiSeoTools = [
        { path: '/prompt', name: 'AI Prompt Helper', desc: 'Optimize AI prompts for better results' },
        { path: '/meta', name: 'Meta Tag Generator', desc: 'SEO-optimized meta tags' },
        { path: '/contrast', name: 'Contrast Checker', desc: 'WCAG accessibility compliance' }
    ];

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
                <p className="text-muted-foreground mb-12">
                    Complete overview of all pages and tools on NineProo
                </p>

                {/* Tools Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-primary">Design & UI Tools</h2>
                    <ul className="space-y-3 ml-4">
                        {designTools.map((tool) => (
                            <li key={tool.path}>
                                <Link to={tool.path} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                                    {tool.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">{tool.desc}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-primary">CSS & Layout Tools</h2>
                    <ul className="space-y-3 ml-4">
                        {cssTools.map((tool) => (
                            <li key={tool.path}>
                                <Link to={tool.path} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                                    {tool.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">{tool.desc}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-primary">AI & SEO Tools</h2>
                    <ul className="space-y-3 ml-4">
                        {aiSeoTools.map((tool) => (
                            <li key={tool.path}>
                                <Link to={tool.path} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                                    {tool.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">{tool.desc}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Company Pages */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Company</h2>
                    <ul className="space-y-2 ml-4">
                        <li><Link to="/tools-overview" className="text-foreground hover:text-primary transition-colors">Tools Overview</Link></li>
                        <li><Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link></li>
                        <li><Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </section>

                {/* Legal */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Legal</h2>
                    <ul className="space-y-2 ml-4">
                        <li><Link to="/terms-of-service" className="text-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link to="/privacy-policy" className="text-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/disclaimer" className="text-foreground hover:text-primary transition-colors">Disclaimer</Link></li>
                        <li><Link to="/cookie-policy" className="text-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
                    </ul>
                </section>
            </div>
        </Layout>
    );
}

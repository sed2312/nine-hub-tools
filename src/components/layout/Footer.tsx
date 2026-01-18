import { Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { EmailCapture } from '@/components/EmailCapture';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 pb-8 border-b border-border">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-semibold text-lg mb-2">Stay in the Loop</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified when we launch new tools and Pro features
            </p>
            <div className="flex justify-center">
              <EmailCapture
                source="Footer"
                variant="footer"
                placeholder="Enter your email"
                buttonText="Subscribe"
              />
            </div>
          </div>
        </div>

        {/* Main Footer Content - Tool Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Design & UI Tools */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Design & UI Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/glass" className="text-muted-foreground hover:text-foreground transition-colors">
                  Glassmorphism Generator
                </Link>
              </li>
              <li>
                <Link to="/gradient-text" className="text-muted-foreground hover:text-foreground transition-colors">
                  Gradient Text Generator
                </Link>
              </li>
              <li>
                <Link to="/shadow" className="text-muted-foreground hover:text-foreground transition-colors">
                  Box Shadow Generator
                </Link>
              </li>
              <li>
                <Link to="/blob" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blob SVG Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* CSS & Layout Tools */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">CSS & Layout</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/grid" className="text-muted-foreground hover:text-foreground transition-colors">
                  CSS Grid Generator
                </Link>
              </li>
              <li>
                <Link to="/palette" className="text-muted-foreground hover:text-foreground transition-colors">
                  Color Palette Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* AI & SEO Tools */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">AI & SEO Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/prompt" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Prompt Helper
                </Link>
              </li>
              <li>
                <Link to="/meta" className="text-muted-foreground hover:text-foreground transition-colors">
                  Meta Tag Generator
                </Link>
              </li>
              <li>
                <Link to="/contrast" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contrast Checker
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sitemap
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@nineproo.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@nineproo.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-muted-foreground text-sm">
                © 2026 NineProo. All rights reserved.
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Follow us on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/nine_proo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/nine_proo/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

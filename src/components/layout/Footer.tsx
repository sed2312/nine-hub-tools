import { Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { EmailCapture } from '@/components/EmailCapture';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-semibold text-lg mb-2">Stay in the Loop</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified when we launch new tools and Pro features
            </p>
            <div className="flex justify-center">
              <EmailCapture
                source="Footer"
                variant="footer"
                placeholder="your@email.com"
                buttonText="Subscribe"
              />
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-muted-foreground text-sm">© 2026</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:hello@nineproo.com" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/nine_proo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
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
    </footer>
  );
}

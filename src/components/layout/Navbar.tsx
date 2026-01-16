import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/components/Logo';
import { AuthButton } from '@/components/auth/AuthButton';
import { PricingModal } from '@/components/modals/PricingModal';

const toolsList = [
  { path: '/glass', label: 'Glassmorphism Generator' },
  { path: '/gradient-text', label: 'Gradient Text Generator' },
  { path: '/shadow', label: 'Box Shadow Generator' },
  { path: '/palette', label: 'Color Palette Generator' },
  { path: '/grid', label: 'CSS Grid Generator' },
  { path: '/blob', label: 'Blob SVG Generator' },
  { path: '/contrast', label: 'Contrast Checker' },
  { path: '/meta', label: 'Meta Tag Generator' },
  { path: '/prompt', label: 'AI Prompt Helper' },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen) {
        const target = event.target as HTMLElement;
        const nav = document.querySelector('nav');
        if (nav && !nav.contains(target)) {
          setMobileMenuOpen(false);
        }
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close Tools dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsDropdownOpen) {
        const target = event.target as HTMLElement;
        const dropdown = document.querySelector('[data-dropdown="tools"]');
        const button = document.querySelector('[data-dropdown-button="tools"]');

        if (dropdown && !dropdown.contains(target) && button && !button.contains(target)) {
          setToolsDropdownOpen(false);
        }
      }
    };

    if (toolsDropdownOpen) {
      // Small delay to prevent immediate closing when opening
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toolsDropdownOpen]);

  // Close dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
            <li>
              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className={location.pathname === '/' ? 'bg-secondary' : ''}
                >
                  Home
                </Button>
              </Link>
            </li>

            {/* Tools Dropdown */}
            <li className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                data-dropdown-button="tools"
              >
                Tools
                <ChevronDown className="h-4 w-4" />
              </Button>

              {toolsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50"
                  data-dropdown="tools"
                >
                  <ul className="list-none m-0 p-0">
                    {toolsList.map((tool) => (
                      <li key={tool.path}>
                        <Link
                          to={tool.path}
                          className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                        >
                          {tool.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li>
              <Link to="/about">
                <Button
                  variant="ghost"
                  size="sm"
                  className={location.pathname === '/about' ? 'bg-secondary' : ''}
                >
                  About
                </Button>
              </Link>
            </li>

            <li>
              <Link to="/contact">
                <Button
                  variant="ghost"
                  size="sm"
                  className={location.pathname === '/contact' ? 'bg-secondary' : ''}
                >
                  Contact
                </Button>
              </Link>
            </li>
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
            </div>
            <AuthButton />
            <PricingModal />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <ul className="flex flex-col gap-2 list-none m-0 p-0">
              <li>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Home
                  </Button>
                </Link>
              </li>

              {/* Tools Section */}
              <li>
                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                  Tools
                </div>
                <ul className="list-none m-0 p-0 pl-2">
                  {toolsList.map((tool) => (
                    <li key={tool.path}>
                      <Link to={tool.path} onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-sm">
                          {tool.label}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    About
                  </Button>
                </Link>
              </li>

              <li>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

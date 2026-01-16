import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  MessageSquare,
  Palette,
  Grid3X3,
  Type,
  Box,
  Circle,
  Eye,
  FileCode,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AboutModal } from '@/components/modals/AboutModal';
import { ExportHistoryModal } from '@/components/modals/ExportHistoryModal';
import { PricingModal } from '@/components/modals/PricingModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/components/Logo';
import { AuthButton } from '@/components/auth/AuthButton';

const tools = [
  { path: '/glass', icon: Layers, label: 'Glass', color: 'text-glass' },
  { path: '/prompt', icon: MessageSquare, label: 'Prompt', color: 'text-prompt' },
  { path: '/palette', icon: Palette, label: 'Palette', color: 'text-palette' },
  { path: '/grid', icon: Grid3X3, label: 'Grid', color: 'text-grid' },
  { path: '/gradient-text', icon: Type, label: 'Gradient', color: 'text-gradient-text' },
  { path: '/shadow', icon: Box, label: 'Shadow', color: 'text-shadow' },
  { path: '/blob', icon: Circle, label: 'Blob', color: 'text-blob' },
  { path: '/contrast', icon: Eye, label: 'Contrast', color: 'text-contrast' },
  { path: '/meta', icon: FileCode, label: 'Meta', color: 'text-meta' },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/">
              <Button variant="ghost" size="sm" className={location.pathname === '/' ? 'bg-secondary' : ''}>
                Hub
              </Button>
            </Link>
            <div className="flex items-center gap-0.5 px-2">
              {tools.map((tool) => (
                <Link key={tool.path} to={tool.path}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${location.pathname === tool.path ? 'bg-secondary' : ''}`}
                    title={tool.label}
                  >
                    <tool.icon className={`h-4 w-4 ${tool.color}`} />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1 md:gap-2">
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <ExportHistoryModal />
              <AboutModal />
            </div>
            <AuthButton />
            <PricingModal />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="grid grid-cols-3 gap-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Hub
                </Button>
              </Link>
              {tools.map((tool) => (
                <Link key={tool.path} to={tool.path} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <tool.icon className={`h-4 w-4 ${tool.color}`} />
                    {tool.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

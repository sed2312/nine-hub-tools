import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
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
  Home,
  Moon,
  Sun,
  Shuffle,
  Copy,
  RotateCcw,
} from 'lucide-react';
import { useTheme } from 'next-themes';

const tools = [
  { path: '/', icon: Home, label: 'Hub', description: 'Go to homepage' },
  { path: '/glass', icon: Layers, label: 'Glass Tool', description: 'Create glassmorphism effects' },
  { path: '/prompt', icon: MessageSquare, label: 'Prompt Tool', description: 'Generate AI prompts' },
  { path: '/palette', icon: Palette, label: 'Palette Tool', description: 'Create color palettes' },
  { path: '/grid', icon: Grid3X3, label: 'Grid Tool', description: 'Design CSS grids' },
  { path: '/gradient-text', icon: Type, label: 'Gradient Text', description: 'Create gradient text effects' },
  { path: '/shadow', icon: Box, label: 'Shadow Tool', description: 'Generate box shadows' },
  { path: '/blob', icon: Circle, label: 'Blob Tool', description: 'Create SVG blobs' },
  { path: '/contrast', icon: Eye, label: 'Contrast Tool', description: 'Check color contrast' },
  { path: '/meta', icon: FileCode, label: 'Meta Tool', description: 'Generate meta tags' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const handleNavigate = useCallback((path: string) => {
    runCommand(() => navigate(path));
  }, [navigate, runCommand]);

  const toggleTheme = useCallback(() => {
    runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'));
  }, [theme, setTheme, runCommand]);

  // Dispatch custom events for tool actions
  const dispatchAction = useCallback((action: string) => {
    runCommand(() => {
      window.dispatchEvent(new CustomEvent('command-palette-action', { detail: action }));
    });
  }, [runCommand]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {tools.map((tool) => (
            <CommandItem
              key={tool.path}
              value={tool.label}
              onSelect={() => handleNavigate(tool.path)}
              className="gap-3"
            >
              <tool.icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{tool.label}</span>
                <span className="text-xs text-muted-foreground">{tool.description}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => dispatchAction('randomize')} className="gap-3">
            <Shuffle className="h-4 w-4 text-muted-foreground" />
            <span>Randomize</span>
            <CommandShortcut>R</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => dispatchAction('copy')} className="gap-3">
            <Copy className="h-4 w-4 text-muted-foreground" />
            <span>Copy to Clipboard</span>
            <CommandShortcut>C</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => dispatchAction('reset')} className="gap-3">
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
            <span>Reset</span>
            <CommandShortcut>Esc</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={toggleTheme} className="gap-3">
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Moon className="h-4 w-4 text-muted-foreground" />
            )}
            <span>Toggle Theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

import { Keyboard } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface KeyboardHintsProps {
  shortcuts: Array<{ key: string; description?: string }>;
}

export function KeyboardHints({ shortcuts }: KeyboardHintsProps) {
  if (shortcuts.length === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 hover:opacity-100">
          <Keyboard className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="space-y-1">
        <p className="font-semibold text-xs mb-2">Keyboard Shortcuts</p>
        {shortcuts.map((s, i) => (
          <div key={i} className="flex items-center justify-between gap-4 text-xs">
            <span className="text-muted-foreground">{s.description}</span>
            <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px] font-mono uppercase">
              {s.key}
            </kbd>
          </div>
        ))}
      </TooltipContent>
    </Tooltip>
  );
}

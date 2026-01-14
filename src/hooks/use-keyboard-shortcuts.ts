import { useEffect, useCallback } from 'react';

type ShortcutHandler = () => void;

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: ShortcutHandler;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.handler();
          break;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export function useToolShortcuts({
  onRandomize,
  onCopy,
  onReset,
}: {
  onRandomize?: () => void;
  onCopy?: () => void;
  onReset?: () => void;
}) {
  const shortcuts: ShortcutConfig[] = [];

  if (onRandomize) {
    shortcuts.push({ key: 'r', handler: onRandomize, description: 'Randomize' });
  }
  if (onCopy) {
    shortcuts.push({ key: 'c', handler: onCopy, description: 'Copy to clipboard' });
  }
  if (onReset) {
    shortcuts.push({ key: 'Escape', handler: onReset, description: 'Reset' });
  }

  useKeyboardShortcuts(shortcuts);

  return shortcuts;
}

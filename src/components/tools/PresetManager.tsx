import { useState } from 'react';
import { Save, Share2, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Preset<T> {
  id: string;
  name: string;
  data: T;
  createdAt: number;
}

interface PresetManagerProps<T> {
  presets: Preset<T>[];
  onSave: (name: string) => void;
  onLoad: (data: T) => void;
  onDelete: (id: string) => void;
  onShare: () => string | null;
}

export function PresetManager<T>({
  presets,
  onSave,
  onLoad,
  onDelete,
  onShare,
}: PresetManagerProps<T>) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (!presetName.trim()) return;
    onSave(presetName.trim());
    setPresetName('');
    setSaveDialogOpen(false);
    toast({
      title: 'Preset saved',
      description: `"${presetName}" has been saved locally.`,
    });
  };

  const handleShare = () => {
    const url = onShare();
    if (url) {
      navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'Shareable link copied to clipboard.',
      });
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Save Preset Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Save preset">
            <Save className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Preset</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Input
              placeholder="Preset name..."
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <Button onClick={handleSave} disabled={!presetName.trim()}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        title="Share configuration"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
      </Button>

      {/* Load Presets Dropdown */}
      {presets.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              Presets
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {presets.map((preset) => (
              <DropdownMenuItem
                key={preset.id}
                className="flex items-center justify-between group"
              >
                <span
                  className="flex-1 cursor-pointer"
                  onClick={() => onLoad(preset.data)}
                >
                  {preset.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(preset.id);
                  }}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-muted-foreground">
              {presets.length} preset{presets.length !== 1 ? 's' : ''} saved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

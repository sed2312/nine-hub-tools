import { useState, useRef, MouseEvent, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { hexToHsl, hslToHex, hexToRgb } from '@/lib/color-utils';
import { cn } from '@/lib/utils';

interface ShadePickerGradientProps {
  baseColor: string;
  colorName: string;
  onSelectShade: (newColor: string) => void;
  onClose: () => void;
}

export const ShadePickerGradient = memo(function ShadePickerGradient({
  baseColor,
  colorName,
  onSelectShade,
  onClose,
}: ShadePickerGradientProps) {
  const [selectedShade, setSelectedShade] = useState(baseColor);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  // Sync state when baseColor changes (though key in parent helps too)
  useEffect(() => {
    setSelectedShade(baseColor);
  }, [baseColor]);

  const [h, s] = hexToHsl(baseColor);

  // Generate gradient from very light to very dark
  const generateGradientStops = () => {
    const stops: string[] = [];
    for (let i = 0; i <= 20; i++) {
      const lightness = 95 - (i * 4.5); // From 95% to 5%
      const color = hslToHex(h, s, Math.round(lightness));
      stops.push(color);
    }
    return stops;
  };

  const gradientStops = generateGradientStops();
  const gradientCSS = `linear-gradient(to right, ${gradientStops.join(', ')})`;

  const handleGradientClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!gradientRef.current) return;

    const rect = gradientRef.current.getBoundingClientRect();
    if (rect.width === 0) return;

    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // Calculate lightness based on position (95% to 5%)
    const lightness = Math.max(5, Math.min(95, 95 - (percentage * 0.9)));
    const newColor = hslToHex(h, s, Math.round(lightness));
    setSelectedShade(newColor);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!gradientRef.current) return;
    const rect = gradientRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setHoverPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  const handleApply = () => {
    onSelectShade(selectedShade);
    onClose();
  };

  const getLuminance = (hex: string): number => {
    const [r, g, b] = hexToRgb(hex);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const getHslValues = (hex: string) => {
    const [h, s, l] = hexToHsl(hex);
    return `H: ${h}° S: ${s}% L: ${l}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 border-2 border-palette">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Pick a Shade</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Click anywhere on the gradient to select a shade of <span className="font-semibold">{colorName}</span>
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Gradient Picker */}
          <div className="space-y-4">
            <div
              ref={gradientRef}
              className="relative h-32 rounded-lg cursor-crosshair shadow-lg"
              style={{ background: gradientCSS }}
              onClick={handleGradientClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Hover indicator */}
              {hoverPosition !== null && (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
                  style={{ left: `${hoverPosition}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-800" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-800" />
                </div>
              )}

              {/* Grid overlay for better visibility */}
              <div className="absolute inset-0 pointer-events-none">
                {[0, 25, 50, 75, 100].map((pos) => (
                  <div
                    key={pos}
                    className="absolute top-0 bottom-0 w-px bg-black/10"
                    style={{ left: `${pos}%` }}
                  />
                ))}
              </div>

              {/* Labels */}
              <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">Light</div>
              <div className="absolute -bottom-6 right-0 text-xs text-muted-foreground">Dark</div>
            </div>

            {/* Selected Color Preview */}
            <div className="grid grid-cols-2 gap-4">
              {/* Original */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Original</p>
                <div
                  className="h-24 rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center"
                  style={{ backgroundColor: baseColor }}
                >
                  <span
                    className={cn(
                      'font-mono text-sm font-bold',
                      getLuminance(baseColor) < 128 ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {baseColor}
                  </span>
                  <span
                    className={cn(
                      'text-xs mt-1',
                      getLuminance(baseColor) < 128 ? 'text-white/70' : 'text-slate-700'
                    )}
                  >
                    {getHslValues(baseColor)}
                  </span>
                </div>
              </div>

              {/* Selected */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Selected</p>
                  <Badge variant="secondary" className="text-xs">
                    {selectedShade === baseColor ? 'Same' : 'Changed'}
                  </Badge>
                </div>
                <div
                  className="h-24 rounded-lg border-2 border-palette flex flex-col items-center justify-center shadow-lg"
                  style={{ backgroundColor: selectedShade }}
                >
                  <span
                    className={cn(
                      'font-mono text-sm font-bold',
                      getLuminance(selectedShade) < 128 ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {selectedShade}
                  </span>
                  <span
                    className={cn(
                      'text-xs mt-1',
                      getLuminance(selectedShade) < 128 ? 'text-white/70' : 'text-slate-700'
                    )}
                  >
                    {getHslValues(selectedShade)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Quick Shades</p>
            <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
              {[95, 90, 80, 70, 60, 50, 45, 35, 25, 15, 8].map((lightness, idx) => {
                const shadeColor = hslToHex(h, s, lightness);
                const shadeLabel = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][idx];
                return (
                  <button
                    key={lightness}
                    className="aspect-square rounded-md border-2 hover:border-palette hover:scale-110 transition-transform relative group focus:outline-none focus:ring-2 focus:ring-palette"
                    style={{ backgroundColor: shadeColor }}
                    onClick={() => setSelectedShade(shadeColor)}
                    title={`Shade ${shadeLabel}`}
                    aria-label={`Select shade ${shadeLabel}`}
                  >
                    {selectedShade === shadeColor && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    )}
                    <span
                      className={cn(
                        'absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap',
                        'text-muted-foreground'
                      )}
                    >
                      {shadeLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedShade(baseColor)}
                disabled={selectedShade === baseColor}
              >
                Reset
              </Button>
              <Button onClick={handleApply} disabled={selectedShade === baseColor}>
                <Check className="h-4 w-4 mr-2" />
                Apply Shade
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

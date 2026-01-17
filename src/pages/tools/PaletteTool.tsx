import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { KeyboardHints } from '@/components/tools/KeyboardHints';
import { PresetManager } from '@/components/tools/PresetManager';
import { ShadePickerGradient } from '@/components/palette/ShadePickerGradient';
import { usePresets } from '@/hooks/use-presets';
import { useToolShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Lock, Unlock, Shuffle, Copy, Check, Pencil, Eye, Layers,
  Download, Info, AlertCircle, CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo/SEOHead';
import { RelatedTools } from '@/components/tools/RelatedTools';

import { cn } from '@/lib/utils';
import {
  hexToHsl,
  hslToHex,
  getLuminance,
  getContrastRatio,
  getWCAGLevel,
  getColorName,
  generateGradient,
  simulateColorBlindness,
  exportFormats,
  type ColorBlindType,
} from '@/lib/color-utils';

type HarmonyType = 'analogous' | 'complementary' | 'triadic' | 'split' | 'tetradic' | 'monochromatic';

interface ColorState {
  hex: string;
  locked: boolean;
  name?: string;
}

interface PaletteState {
  harmony: HarmonyType;
  format: 'hex' | 'rgb' | 'css' | 'tailwind';
  colors: ColorState[];
}

const harmonyDescriptions = {
  analogous: 'Colors that are next to each other on the color wheel. Creates serene and comfortable designs.',
  complementary: 'Colors opposite each other on the color wheel. Creates vibrant, high-contrast looks.',
  triadic: 'Three colors equally spaced around the color wheel. Creates vibrant, balanced palettes.',
  split: 'Base color plus two colors adjacent to its complement. Provides high contrast with less tension.',
  tetradic: 'Four colors arranged into two complementary pairs. Rich and versatile.',
  monochromatic: 'Variations of a single hue. Creates cohesive, elegant designs.',
};

const generateHarmony = (baseHue: number, type: HarmonyType): number[] => {
  const hues: number[] = [baseHue];
  switch (type) {
    case 'analogous':
      hues.push((baseHue + 30) % 360, (baseHue + 60) % 360, (baseHue - 30 + 360) % 360, (baseHue - 60 + 360) % 360);
      break;
    case 'complementary':
      hues.push((baseHue + 180) % 360, (baseHue + 15) % 360, (baseHue - 15 + 360) % 360, (baseHue + 195) % 360);
      break;
    case 'triadic':
      hues.push((baseHue + 120) % 360, (baseHue + 240) % 360, (baseHue + 60) % 360, (baseHue + 180) % 360);
      break;
    case 'split':
      hues.push((baseHue + 150) % 360, (baseHue + 210) % 360, (baseHue + 30) % 360, (baseHue - 30 + 360) % 360);
      break;
    case 'tetradic':
      hues.push((baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360, (baseHue + 45) % 360);
      break;
    case 'monochromatic':
      return [baseHue, baseHue, baseHue, baseHue, baseHue];
  }
  return hues.slice(0, 5);
};

const randomHue = () => Math.floor(Math.random() * 360);

const generateInitialColors = (harmony: HarmonyType): ColorState[] => {
  const hues = generateHarmony(randomHue(), harmony);
  return hues.map((h, i) => ({
    hex: hslToHex(h, 70 + (i * 5), 50 + (i * 3)),
    locked: false,
  }));
};

export default function PaletteTool() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Color Palette', href: '/palette' },
  ];

  const relatedTools = [
    {
      name: 'Glassmorphism',
      path: '/glass',
      description: 'Create modern frosted glass UI effects',
      icon: '💎'
    },
    {
      name: 'Gradient Text',
      path: '/gradient-text',
      description: 'Create animated gradient text',
      icon: '🌈'
    },
    {
      name: 'Contrast Checker',
      path: '/contrast',
      description: 'Check color contrast for accessibility',
      icon: '👁️'
    }
  ];

  const [state, setState] = useState<PaletteState>({
    harmony: 'analogous',
    format: 'hex',
    colors: generateInitialColors('analogous'),
  });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindType | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const { toast } = useToast();

  const { presets, savePreset, deletePreset, getShareableUrl, loadFromUrl } = usePresets('palette', state);

  useEffect(() => {
    const urlPreset = loadFromUrl();
    if (urlPreset) {
      setState(urlPreset);
      toast({ title: 'Preset loaded from URL' });
    }
  }, []);

  // Add color names to state
  const colorsWithNames = useMemo(() => {
    return state.colors.map(color => ({
      ...color,
      name: getColorName(color.hex),
    }));
  }, [state.colors]);

  // Calculate accessibility scores
  const accessibilityScores = useMemo(() => {
    const scores: Array<{ bg: number; fg: number; ratio: number; level: string }> = [];

    for (let i = 0; i < state.colors.length; i++) {
      for (let j = i + 1; j < state.colors.length; j++) {
        const ratio = getContrastRatio(state.colors[i].hex, state.colors[j].hex);
        const { level } = getWCAGLevel(ratio, 'normal');
        scores.push({ bg: i, fg: j, ratio, level });
      }
    }

    return scores.sort((a, b) => b.ratio - a.ratio);
  }, [state.colors]);

  const regenerate = useCallback(() => {
    const baseHue = randomHue();
    const hues = generateHarmony(baseHue, state.harmony);
    setState(prev => ({
      ...prev,
      colors: prev.colors.map((c, i) => {
        if (c.locked) return c;

        if (state.harmony === 'monochromatic') {
          return {
            hex: hslToHex(hues[i], 60 + Math.random() * 20, 20 + i * 15),
            locked: false,
          };
        }

        return {
          hex: hslToHex(hues[i], 65 + Math.random() * 20, 45 + Math.random() * 20),
          locked: false,
        };
      }),
    }));
    toast({ title: 'Palette regenerated!' });
  }, [state.harmony, toast]);

  const handleCopy = useCallback(() => {
    const exported = exportFormats.css(state.colors.map(c => c.hex), colorsWithNames.map(c => c.name || ''));
    navigator.clipboard.writeText(exported);
    toast({ title: 'CSS copied!' });
  }, [state.colors, colorsWithNames, toast]);

  const shortcuts = useToolShortcuts({
    onRandomize: regenerate,
    onCopy: handleCopy,
  });

  const toggleLock = (index: number) => {
    setState(prev => ({
      ...prev,
      colors: prev.colors.map((c, i) =>
        i === index ? { ...c, locked: !c.locked } : c
      ),
    }));
  };

  const updateColor = (index: number, newHex: string) => {
    setState(prev => ({
      ...prev,
      colors: prev.colors.map((c, i) =>
        i === index ? { ...c, hex: newHex, locked: true } : c
      ),
    }));
  };

  const getFormattedColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    switch (state.format) {
      case 'rgb': return `${r},${g},${b}`;
      case 'css': return `rgb(${r},${g},${b})`;
      case 'tailwind': return `bg-[${hex}]`;
      default: return hex;
    }
  };

  const copyColor = async (hex: string, index: number) => {
    const value = getFormattedColor(hex);
    await navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    toast({ title: 'Copied!', description: value });
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Get display colors (with color blind simulation if active)
  const displayColors = useMemo(() => {
    if (!colorBlindMode) return colorsWithNames;

    return colorsWithNames.map(c => ({
      ...c,
      hex: simulateColorBlindness(c.hex, colorBlindMode),
    }));
  }, [colorsWithNames, colorBlindMode]);

  // Export functions
  const exportAs = (format: keyof typeof exportFormats) => {
    const names = colorsWithNames.map(c => c.name || '');
    const hexColors = state.colors.map(c => c.hex);
    const exported = exportFormats[format](hexColors, names);
    navigator.clipboard.writeText(exported);
    toast({ title: `${format.toUpperCase()} copied!` });
  };

  return (
    <Layout>
      <SEOHead path="/palette" />
      <ToolLayout
        title="Palette Master"
        description="Professional color palette generator with interactive shade picker, accessibility checker, Elementor export, and advanced features"
        colorClass="text-palette"
        breadcrumbs={breadcrumbs}
        relatedTools={<RelatedTools tools={relatedTools} />}
        headerActions={
          <>
            <KeyboardHints shortcuts={shortcuts} />
            <Button variant="outline" size="sm" onClick={() => setShowInfo(!showInfo)}>
              <Info className="h-4 w-4 mr-2" />
              {showInfo ? 'Hide' : 'Show'} Info
            </Button>
            <PresetManager
              presets={presets}
              onSave={savePreset}
              onLoad={(data) => setState(data)}
              onDelete={deletePreset}
              onShare={getShareableUrl}
            />
          </>
        }
      >
        <div className="space-y-8">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label>Harmony</Label>
              <Select
                value={state.harmony}
                onValueChange={(v: HarmonyType) => setState(prev => ({ ...prev, harmony: v }))}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triadic">Triadic</SelectItem>
                  <SelectItem value="split">Split-Complementary</SelectItem>
                  <SelectItem value="tetradic">Tetradic</SelectItem>
                  <SelectItem value="monochromatic">Monochromatic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label>Format</Label>
              <Select
                value={state.format}
                onValueChange={(v: typeof state.format) => setState(prev => ({ ...prev, format: v }))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hex">HEX</SelectItem>
                  <SelectItem value="rgb">RGB</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="tailwind">Tailwind</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label>Vision Mode</Label>
              <Select
                value={colorBlindMode || 'normal'}
                onValueChange={(v) => setColorBlindMode(v === 'normal' ? null : v as ColorBlindType)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="protanopia">Protanopia</SelectItem>
                  <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                  <SelectItem value="tritanopia">Tritanopia</SelectItem>
                  <SelectItem value="achromatopsia">Achromatopsia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={regenerate}>
              <Shuffle className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>

          {/* Info Card */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        {state.harmony.charAt(0).toUpperCase() + state.harmony.slice(1)} Harmony
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {harmonyDescriptions[state.harmony]}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Palette Display */}
          <motion.div
            className="flex h-64 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {displayColors.map((color, index) => {
              const textColor = getLuminance(color.hex) < 128 ? 'text-white' : 'text-slate-900';
              return (
                <motion.div
                  key={index}
                  className="flex-1 relative group transition-all duration-300 hover:flex-[1.3] cursor-pointer flex flex-col justify-between p-6"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyColor(color.hex, index)}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Top Actions */}
                  <div className="flex justify-between items-start z-20">
                    <Badge variant="secondary" className={cn('opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity', textColor)}>
                      {color.name}
                    </Badge>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLock(index); }}
                        className={cn(
                          textColor,
                          state.colors[index].locked ? 'opacity-100' : 'opacity-40 hover:opacity-100 focus:opacity-100 focus-visible:opacity-100',
                          'transition-opacity p-2 rounded hover:bg-black/10'
                        )}
                        title="Lock Color"
                        aria-label={state.colors[index].locked ? "Unlock Color" : "Lock Color"}
                      >
                        {state.colors[index].locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </button>
                      <div className="relative">
                        <Input
                          type="color"
                          value={state.colors[index].hex}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-10 h-10"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Edit Color Hex"
                        />
                        <button
                          className={cn(textColor, 'opacity-40 hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 p-2 rounded hover:bg-black/10')}
                          title="Edit Color"
                          aria-label="Open color picker"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedColor(selectedColor === index ? null : index); }}
                        className={cn(
                          textColor,
                          selectedColor === index ? 'opacity-100 bg-black/20' : 'opacity-40 hover:opacity-100 focus:opacity-100 focus-visible:opacity-100',
                          'transition-all p-2 rounded hover:bg-black/10'
                        )}
                        title="Pick Shade"
                        aria-label="Open shade picker"
                      >
                        <Layers className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Color Value */}
                  <div className="flex flex-col items-center gap-2 z-10 group-hover:scale-110 transition-transform">
                    <span className={cn('font-mono font-bold text-sm tracking-wider', textColor)}>
                      {getFormattedColor(color.hex)}
                    </span>
                    <span className={cn(
                      'text-[10px] uppercase font-bold bg-black/20 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1',
                      textColor
                    )}>
                      {copiedIndex === index ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copiedIndex === index ? 'Copied' : 'Copy'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Interactive Shade Picker */}
          <AnimatePresence>
            {selectedColor !== null && (
              <ShadePickerGradient
                key={selectedColor}
                baseColor={state.colors[selectedColor].hex}
                colorName={colorsWithNames[selectedColor].name || `Color ${selectedColor + 1}`}
                onSelectShade={(newColor) => updateColor(selectedColor, newColor)}
                onClose={() => setSelectedColor(null)}
              />
            )}
          </AnimatePresence>

          {/* Gradient Preview */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-palette" />
              Gradient Preview
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {['to right', 'to bottom', 'to bottom right'].map((direction) => (
                <div key={direction} className="space-y-2">
                  <div
                    className="h-24 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-lg"
                    style={{
                      background: generateGradient(
                        state.colors.map(c => c.hex),
                        direction as Parameters<typeof generateGradient>[1]
                      ),
                    }}
                    onClick={() => {
                      const gradient = generateGradient(state.colors.map(c => c.hex), direction as Parameters<typeof generateGradient>[1]);
                      navigator.clipboard.writeText(`background: ${gradient};`);
                      toast({ title: 'Gradient copied!' });
                    }}
                  />
                  <p className="text-xs text-center text-muted-foreground capitalize">
                    {direction.replace('to ', '')}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Accessibility Checker */}
          <Card className="p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Eye className="h-5 w-5 text-palette" />
              Accessibility (WCAG Contrast)
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Testing color pairs for text contrast. Higher ratios = better readability.
            </p>
            <div className="space-y-3">
              {accessibilityScores.slice(0, 5).map(({ bg, fg, ratio, level }, idx) => {
                const bgColor = state.colors[bg].hex;
                const fgColor = state.colors[fg].hex;
                const isPassing = level === 'aaa' || level === 'aa';
                return (
                  <div key={idx} className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-colors",
                    isPassing ? "bg-secondary" : "bg-secondary/50"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded border border-border" style={{ backgroundColor: bgColor }} />
                        <div className="w-8 h-8 rounded -ml-2 border border-border" style={{ backgroundColor: fgColor }} />
                      </div>
                      <div className="text-sm">
                        <span className="font-mono font-semibold">{ratio.toFixed(2)}:1</span>
                        <p className="text-[10px] text-muted-foreground">
                          {isPassing ? 'Good for text' : 'Not recommended for text'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {level === 'aaa' && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          AAA
                        </Badge>
                      )}
                      {level === 'aa' && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          AA
                        </Badge>
                      )}
                      {level === 'fail' && (
                        <Badge variant="outline" className="border-orange-500 text-orange-600 dark:text-orange-400">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Low
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>AAA (7:1+):</strong> Best for body text • <strong>AA (4.5:1+):</strong> Minimum for body text • <strong>Low (&lt;4.5:1):</strong> Use for decorative elements only, not text
                </span>
              </p>
            </div>
          </Card>

          {/* Export Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Download className="h-5 w-5 text-palette" />
                Export Palette
              </h3>
            </div>

            <Tabs defaultValue="css" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 h-auto p-1 gap-1">
                <TabsTrigger value="css" className="text-[10px] sm:text-xs">CSS</TabsTrigger>
                <TabsTrigger value="hsl" className="text-[10px] sm:text-xs">HSL</TabsTrigger>
                <TabsTrigger value="oklch" className="text-[10px] sm:text-xs">OKLCH</TabsTrigger>
                <TabsTrigger value="tailwind" className="text-[10px] sm:text-xs">Tailwind</TabsTrigger>
                <TabsTrigger value="scss" className="text-[10px] sm:text-xs">SCSS</TabsTrigger>
                <TabsTrigger value="json" className="text-[10px] sm:text-xs">JSON</TabsTrigger>
                <TabsTrigger value="elementor" className="text-[10px] sm:text-xs">Elementor</TabsTrigger>
              </TabsList>

              {['hsl', 'oklch', 'css', 'scss', 'tailwind', 'json', 'elementor'].map(format => {
                const names = colorsWithNames.map(c => c.name || '');
                const hexColors = state.colors.map(c => c.hex);
                const code = exportFormats[format as keyof typeof exportFormats](hexColors, names);

                return (
                  <TabsContent key={format} value={format} className="space-y-2">
                    <div className="flex justify-end">
                      <Button size="sm" onClick={() => exportAs(format as keyof typeof exportFormats)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy {format.toUpperCase()}
                      </Button>
                    </div>
                    <pre className="p-4 rounded-lg bg-secondary text-xs overflow-auto max-h-64 font-mono">
                      {code}
                    </pre>
                  </TabsContent>
                );
              })}
            </Tabs>
          </Card>
        </div>
      </ToolLayout>
    </Layout>
  );
}

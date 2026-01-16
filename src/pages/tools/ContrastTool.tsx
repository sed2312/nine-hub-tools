import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { KeyboardHints } from '@/components/tools/KeyboardHints';
import { PresetManager } from '@/components/tools/PresetManager';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight, Lightbulb, RotateCcw, Shuffle } from 'lucide-react';
import { useToolShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { usePresets } from '@/hooks/use-presets';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo/SEOHead';
import { RelatedTools } from '@/components/tools/RelatedTools';


interface ContrastConfig {
  foreground: string;
  background: string;
}

interface ContrastResult {
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
};

const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  let [r, g, b] = hexToRgb(hex);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrastRatio = (fg: string, bg: string): number => {
  const [r1, g1, b1] = hexToRgb(fg);
  const [r2, g2, b2] = hexToRgb(bg);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

const fixContrast = (fgHex: string, bgHex: string, target: 'fg' | 'bg', targetRatio: number): string => {
  const fgHsl = hexToHsl(fgHex);
  const bgHsl = hexToHsl(bgHex);

  const workingHsl = target === 'fg' ? { ...fgHsl } : { ...bgHsl };
  const otherHex = target === 'fg' ? bgHex : fgHex;
  const [or, og, ob] = hexToRgb(otherHex);
  const otherLum = getLuminance(or, og, ob);

  const direction = otherLum < 0.5 ? 1 : -1;

  for (let i = 0; i < 100; i++) {
    const newHex = hslToHex(workingHsl.h, workingHsl.s, workingHsl.l);
    const ratio = target === 'fg'
      ? getContrastRatio(newHex, bgHex)
      : getContrastRatio(fgHex, newHex);

    if (ratio >= targetRatio) return newHex;

    workingHsl.l += direction * 2;
    workingHsl.l = Math.max(0, Math.min(100, workingHsl.l));

    if (workingHsl.l === 0 || workingHsl.l === 100) break;
  }

  return hslToHex(workingHsl.h, workingHsl.s, workingHsl.l);
};

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

const visionFilters: Record<string, string> = {
  none: 'none',
  protanopia: 'url(#protanopia)',
  deuteranopia: 'url(#deuteranopia)',
  tritanopia: 'url(#tritanopia)',
  grayscale: 'grayscale(100%)',
};

const defaultConfig: ContrastConfig = {
  foreground: '#ffffff',
  background: '#0f172a',
};

export default function ContrastTool() {
  const [config, setConfig] = useState<ContrastConfig>(defaultConfig);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contrast Checker', href: '/contrast' },
  ];

  const relatedTools = [
    {
      name: 'Color Palette',
      path: '/palette',
      description: 'Create harmonious color schemes',
      icon: '🎨'
    },
    {
      name: 'Gradient Text',
      path: '/gradient-text',
      description: 'Create animated gradient text',
      icon: '🌈'
    },
    {
      name: 'Glassmorphism',
      path: '/glass',
      description: 'Create modern frosted glass UI effects',
      icon: '💎'
    }
  ];

  const [fgInput, setFgInput] = useState(defaultConfig.foreground);
  const [bgInput, setBgInput] = useState(defaultConfig.background);
  const [visionMode, setVisionMode] = useState('none');
  const { toast } = useToast();

  const { presets, savePreset, deletePreset, getShareableUrl, loadFromUrl } = usePresets('contrast', config);

  // Load preset from URL on mount
  useEffect(() => {
    const urlPreset = loadFromUrl();
    if (urlPreset) {
      setConfig(urlPreset);
      setFgInput(urlPreset.foreground);
      setBgInput(urlPreset.background);
      toast({ title: 'Preset loaded from URL' });
    }
  }, []);

  const updateFg = (val: string) => {
    setConfig(prev => ({ ...prev, foreground: val }));
    setFgInput(val);
  };

  const updateBg = (val: string) => {
    setConfig(prev => ({ ...prev, background: val }));
    setBgInput(val);
  };

  const handleFgInputChange = (val: string) => {
    setFgInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setConfig(prev => ({ ...prev, foreground: val }));
    }
  };

  const handleBgInputChange = (val: string) => {
    setBgInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setConfig(prev => ({ ...prev, background: val }));
    }
  };

  const result = useMemo<ContrastResult>(() => {
    const ratio = getContrastRatio(config.foreground, config.background);
    return {
      ratio,
      aa: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaa: ratio >= 7,
      aaaLarge: ratio >= 4.5,
    };
  }, [config.foreground, config.background]);

  const swapColors = useCallback(() => {
    const temp = config.foreground;
    updateFg(config.background);
    updateBg(temp);
  }, [config]);

  const reset = useCallback(() => {
    setConfig(defaultConfig);
    setFgInput(defaultConfig.foreground);
    setBgInput(defaultConfig.background);
  }, []);

  const randomize = useCallback(() => {
    const fg = randomColor();
    const bg = randomColor();
    updateFg(fg);
    updateBg(bg);
  }, []);

  const copyResult = useCallback(() => {
    navigator.clipboard.writeText(`Foreground: ${config.foreground}\nBackground: ${config.background}\nContrast Ratio: ${result.ratio.toFixed(2)}:1`);
    toast({ title: 'Contrast info copied to clipboard' });
  }, [config, result]);

  const shortcuts = useToolShortcuts({
    onRandomize: randomize,
    onCopy: copyResult,
    onReset: reset,
  });

  const suggestFixFg = (ratio: number) => {
    const fixed = fixContrast(config.foreground, config.background, 'fg', ratio);
    updateFg(fixed);
  };

  const suggestFixBg = (ratio: number) => {
    const fixed = fixContrast(config.foreground, config.background, 'bg', ratio);
    updateBg(fixed);
  };

  const loadPreset = (data: ContrastConfig) => {
    setConfig(data);
    setFgInput(data.foreground);
    setBgInput(data.background);
  };

  const ratioPercentage = Math.min((result.ratio / 21) * 100, 100);

  return (
    <Layout>
      <SEOHead path="/contrast" />
      <ToolLayout
        title="Contrast Eye"
        description="WCAG accessibility checker with vision simulations and auto-fix suggestions"
        colorClass="text-contrast"
        breadcrumbs={breadcrumbs}
        relatedTools={<RelatedTools tools={relatedTools} />}
      >
        {/* SVG Filters for color blindness simulation */}
        <svg className="hidden">
          <defs>
            <filter id="protanopia">
              <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" />
            </filter>
            <filter id="deuteranopia">
              <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" />
            </filter>
            <filter id="tritanopia">
              <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" />
            </filter>
          </defs>
        </svg>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="space-y-6">
            <motion.div
              className="p-8 rounded-xl min-h-[300px] flex flex-col items-center justify-center gap-4 transition-all relative"
              style={{
                backgroundColor: config.background,
                filter: visionFilters[visionMode],
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {visionMode !== 'none' && (
                <span className="absolute top-3 right-3 text-[10px] uppercase font-bold bg-black/30 text-white px-2 py-1 rounded">
                  {visionMode}
                </span>
              )}
              <motion.p
                style={{ color: config.foreground }}
                className="text-sm"
                key={`${config.foreground}-sm`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Small text (14px)
              </motion.p>
              <motion.p
                style={{ color: config.foreground }}
                className="text-lg font-bold"
                key={`${config.foreground}-lg`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Bold text (18px)
              </motion.p>
              <motion.p
                style={{ color: config.foreground }}
                className="text-2xl"
                key={`${config.foreground}-xl`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Large text (24px)
              </motion.p>
            </motion.div>

            {/* Vision Simulation */}
            <div className="space-y-2">
              <Label>Vision Simulation</Label>
              <Select value={visionMode} onValueChange={setVisionMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Normal Vision</SelectItem>
                  <SelectItem value="protanopia">Protanopia (Red-Blind)</SelectItem>
                  <SelectItem value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
                  <SelectItem value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
                  <SelectItem value="grayscale">Grayscale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Controls & Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Controls</h3>
              <div className="flex items-center gap-2">
                <PresetManager
                  presets={presets}
                  onSave={savePreset}
                  onLoad={loadPreset}
                  onDelete={deletePreset}
                  onShare={getShareableUrl}
                />
                <Button variant="outline" size="sm" onClick={randomize}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Random
                </Button>
              </div>
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Foreground (Text)</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.foreground}
                    onChange={(e) => updateFg(e.target.value)}
                    className="w-14 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={fgInput}
                    onChange={(e) => handleFgInputChange(e.target.value)}
                    className="font-mono"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.background}
                    onChange={(e) => updateBg(e.target.value)}
                    className="w-14 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={bgInput}
                    onChange={(e) => handleBgInputChange(e.target.value)}
                    className="font-mono"
                    placeholder="#0f172a"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={swapColors} className="flex-1">
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Swap Colors
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Contrast Ratio */}
            <motion.div
              className="p-6 rounded-xl bg-secondary/50 border border-border space-y-4"
              key={result.ratio.toFixed(2)}
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold"
                  key={result.ratio}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {result.ratio.toFixed(2)}:1
                </motion.div>
                <p className="text-sm text-muted-foreground">Contrast Ratio</p>
              </div>

              {/* Ratio Bar */}
              <div className="h-3 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className={`h-full ${result.aaa ? 'bg-green-500' : result.aa ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${ratioPercentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              {/* WCAG Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <span className="text-sm">AA Normal</span>
                  <Badge variant={result.aa ? 'default' : 'destructive'}>
                    {result.aa ? 'Pass' : 'Fail'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <span className="text-sm">AA Large</span>
                  <Badge variant={result.aaLarge ? 'default' : 'destructive'}>
                    {result.aaLarge ? 'Pass' : 'Fail'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <span className="text-sm">AAA Normal</span>
                  <Badge variant={result.aaa ? 'default' : 'destructive'}>
                    {result.aaa ? 'Pass' : 'Fail'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <span className="text-sm">AAA Large</span>
                  <Badge variant={result.aaaLarge ? 'default' : 'destructive'}>
                    {result.aaaLarge ? 'Pass' : 'Fail'}
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Auto-fix Suggestions */}
            {!result.aa && (
              <motion.div
                className="p-4 rounded-lg bg-contrast/10 border border-contrast/20 space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 text-contrast">
                  <Lightbulb className="h-4 w-4" />
                  <span className="font-medium">Auto-Fix Suggestions</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Fix Foreground</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => suggestFixFg(4.5)} className="flex-1 text-xs">
                        AA
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => suggestFixFg(7)} className="flex-1 text-xs">
                        AAA
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Fix Background</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => suggestFixBg(4.5)} className="flex-1 text-xs">
                        AA
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => suggestFixBg(7)} className="flex-1 text-xs">
                        AAA
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <KeyboardHints shortcuts={shortcuts} />
          </div>
        </div>
      </ToolLayout>
    </Layout>
  );
}
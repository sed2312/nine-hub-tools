import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Layout } from '@/components/layout/Layout';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ExportButton } from '@/components/tools/ExportButton';
import { KeyboardHints } from '@/components/tools/KeyboardHints';
import { PresetManager } from '@/components/tools/PresetManager';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Shuffle, Sun, Moon } from 'lucide-react';
import { useToolShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { usePresets } from '@/hooks/use-presets';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo/SEOHead';
import { RelatedTools } from '@/components/tools/RelatedTools';

interface GradientConfig {
  text: string;
  highlightWord: string;
  color1: string;
  color2: string;
  color3?: string;
  direction: string;
  angle?: number;
  fontSize: number;
  fontFamily: string;
  animated: boolean;
  textShadow: boolean;
  strokeWidth: number;
}

const directions = [
  { value: 'to right', label: 'Left → Right', tw: 'r', el: 0 },
  { value: 'to left', label: 'Right → Left', tw: 'l', el: 180 },
  { value: 'to bottom', label: 'Top → Bottom', tw: 'b', el: 90 },
  { value: 'to top', label: 'Bottom → Top', tw: 't', el: 270 },
  { value: 'to bottom right', label: 'Diagonal ↘', tw: 'br', el: 135 },
  { value: 'to bottom left', label: 'Diagonal ↙', tw: 'bl', el: 45 },
  { value: 'to top right', label: 'Diagonal ↗', tw: 'tr', el: 315 },
  { value: 'to top left', label: 'Diagonal ↖', tw: 'tl', el: 225 },
];

const presets = [
  { name: 'Sunset', c1: '#fb923c', c2: '#db2777', c3: '#f59e0b' },
  { name: 'Ocean', c1: '#0ea5e9', c2: '#6366f1', c3: '#8b5cf6' },
  { name: 'Forest', c1: '#22c55e', c2: '#14b8a6', c3: '#10b981' },
  { name: 'Fire', c1: '#ef4444', c2: '#f97316', c3: '#fbbf24' },
  { name: 'Royal', c1: '#8b5cf6', c2: '#ec4899', c3: '#f43f5e' },
  { name: 'Gold', c1: '#fbbf24', c2: '#f59e0b', c3: '#eab308' },
  { name: 'Neon', c1: '#a3e635', c2: '#22d3ee', c3: '#f472b6' },
  { name: 'Pastel', c1: '#fda4af', c2: '#c4b5fd', c3: '#93c5fd' },
  { name: 'Mint', c1: '#6ee7b7', c2: '#34d399', c3: '#10b981' },
  { name: 'Berry', c1: '#f472b6', c2: '#e879f9', c3: '#c084fc' },
  { name: 'Tropical', c1: '#fbbf24', c2: '#fb923c', c3: '#f472b6' },
  { name: 'Midnight', c1: '#1e293b', c2: '#3730a3', c3: '#701a75' },
];

const fonts = [
  { value: 'system-ui', label: 'System' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Playfair Display', label: 'Playfair' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Bebas Neue', label: 'Bebas Neue' },
];

const defaultConfig: GradientConfig = {
  text: 'Build Faster Websites',
  highlightWord: 'Faster',
  color1: '#fb923c',
  color2: '#db2777',
  color3: '#f59e0b',
  direction: 'to right',
  angle: 90,
  fontSize: 48,
  fontFamily: 'system-ui',
  animated: false,
  textShadow: false,
  strokeWidth: 0,
};

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

export default function GradientTextTool() {
  const [config, setConfig] = useState<GradientConfig>(defaultConfig);
  const [darkPreview, setDarkPreview] = useState(true);
  const { toast } = useToast();

  const { presets: savedPresets, savePreset, deletePreset, getShareableUrl, loadFromUrl } = usePresets('gradient-text', config);

  // Load preset from URL on mount
  useEffect(() => {
    const urlPreset = loadFromUrl();
    if (urlPreset) {
      setConfig(urlPreset);
      toast({ title: 'Preset loaded from URL' });
    }
  }, []);

  const gradientCSS = config.color3
    ? `linear-gradient(${config.angle ? `${config.angle}deg` : config.direction}, ${config.color1}, ${config.color2}, ${config.color3})`
    : `linear-gradient(${config.angle ? `${config.angle}deg` : config.direction}, ${config.color1}, ${config.color2})`;
  const twDir = directions.find(d => d.value === config.direction)?.tw || 'r';
  const elAngle = config.angle || directions.find(d => d.value === config.direction)?.el || 0;

  const randomize = useCallback(() => {
    setConfig({
      ...config,
      color1: randomColor(),
      color2: randomColor(),
    });
  }, [config]);

  const reset = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(tailwindCode);
    toast({ title: 'Tailwind code copied to clipboard' });
  }, [config]);

  const shortcuts = useToolShortcuts({
    onRandomize: randomize,
    onCopy: copyCode,
    onReset: reset,
  });

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Gradient Text', href: '/gradient-text' },
  ];

  const relatedTools = [
    {
      name: 'Glassmorphism',
      path: '/glass',
      description: 'Create modern frosted glass UI effects',
      icon: '💎'
    },
    {
      name: 'Color Palette',
      path: '/palette',
      description: 'Create harmonious color schemes',
      icon: '🎨'
    },
    {
      name: 'Contrast Checker',
      path: '/contrast',
      description: 'Check color contrast for accessibility',
      icon: '👁️'
    }
  ];

  const renderPreview = () => {
    const { text, highlightWord } = config;

    if (highlightWord && text.includes(highlightWord)) {
      const parts = text.split(highlightWord);
      return (
        <span className="font-bold" style={{
          fontSize: `${config.fontSize}px`,
          fontFamily: config.fontFamily,
          textShadow: config.textShadow ? '2px 2px 4px rgba(0,0,0,0.3)' : undefined,
          WebkitTextStroke: config.strokeWidth > 0 ? `${config.strokeWidth}px rgba(255,255,255,0.3)` : undefined,
        }}>
          <span className={darkPreview ? 'text-white' : 'text-slate-900'}>{parts[0]}</span>
          <motion.span
            className={config.animated ? 'animate-gradient' : ''}
            style={{
              background: gradientCSS,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: config.animated ? '200% 200%' : 'auto',
            }}
            key={`${config.color1}-${config.color2}-${config.color3}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {highlightWord}
          </motion.span>
          <span className={darkPreview ? 'text-white' : 'text-slate-900'}>{parts.slice(1).join(highlightWord)}</span>
        </span>
      );
    }

    return (
      <motion.span
        className={`font-extrabold ${config.animated ? 'animate-gradient' : ''}`}
        style={{
          fontSize: `${config.fontSize}px`,
          fontFamily: config.fontFamily,
          background: gradientCSS,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          backgroundSize: config.animated ? '200% 200%' : 'auto',
          textShadow: config.textShadow ? '2px 2px 4px rgba(0,0,0,0.3)' : undefined,
          WebkitTextStroke: config.strokeWidth > 0 ? `${config.strokeWidth}px rgba(255,255,255,0.3)` : undefined,
        }}
        key={`${config.color1}-${config.color2}-${config.color3}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {text || 'Gradient Text'}
      </motion.span>
    );
  };

  const cssCode = config.highlightWord && config.text.includes(config.highlightWord)
    ? `/* CSS */
            .gradient-word {
              background: ${gradientCSS};
            -webkit-background-clip: text;
            color: transparent;
            font-weight: bold;
}

            <!-- HTML -->
            <h1>${config.text.replace(config.highlightWord, `<span class="gradient-word">${config.highlightWord}</span>`)}</h1>`
    : `.gradient-text {
              background: ${gradientCSS};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: ${config.fontSize}px;
            font-weight: 800;
}`;

  const tailwindCode = config.highlightWord && config.text.includes(config.highlightWord)
    ? `<h1 class="text-white font-bold text-[${config.fontSize}px]">
              ${config.text.replace(config.highlightWord, `<span class="bg-clip-text text-transparent bg-gradient-to-${twDir} from-[${config.color1}] to-[${config.color2}]">${config.highlightWord}</span>`)}
            </h1>`
    : `<h1 class="font-extrabold text-[${config.fontSize}px] bg-clip-text text-transparent bg-gradient-to-${twDir} from-[${config.color1}] to-[${config.color2}]">
              ${config.text}
            </h1>`;

  const reactCode = config.highlightWord && config.text.includes(config.highlightWord)
    ? `const GradientText = () => (
            <h1 className="text-white font-bold" style={{ fontSize: '${config.fontSize}px' }}>
              ${config.text.split(config.highlightWord)[0]}
              <span style={{
                background: '${gradientCSS}',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                ${config.highlightWord}
              </span>
              ${config.text.split(config.highlightWord)[1] || ''}
            </h1>
            );`
    : `const GradientText = () => (
            <h1 style={{
              fontSize: '${config.fontSize}px',
              background: '${gradientCSS}',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '800'
            }}>
              ${config.text}
            </h1>
            );`;

  const inlineCode = config.highlightWord && config.text.includes(config.highlightWord)
    ? `<h1 style="color: ${darkPreview ? '#ffffff' : '#0f172a'}; font-weight: 700; font-size: ${config.fontSize}px;">
              ${config.text.replace(config.highlightWord, `<span style="background: ${gradientCSS}; -webkit-background-clip: text; color: transparent; font-weight: 800;">${config.highlightWord}</span>`)}
            </h1>`
    : `<h1 style="background: ${gradientCSS}; -webkit-background-clip: text; color: transparent; font-weight: 800; font-size: ${config.fontSize}px;">
              ${config.text}
            </h1>`;

  const elementorCode = `/* Elementor Gradient Text Settings */
            /* Navigate to: Typography > Text Color */

            Text Color: Gradient

            Gradient Type: Linear
            Angle: ${elAngle}°

            Color 1: ${config.color1}
            Location: 0%

            Color 2: ${config.color2}
            Location: 100%

            /* Typography */
            Font Size: ${config.fontSize}px
            Font Weight: ${config.highlightWord ? '700' : '800'}

/* Alternative: Custom CSS */
            /* If gradient text not supported, add this to Custom CSS: */
            selector {
              background: ${gradientCSS};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
}`;

  const applyPreset = (preset: typeof presets[0]) => {
    setConfig({ ...config, color1: preset.c1, color2: preset.c2, color3: preset.c3 });
  };

  return (
    <Layout>
      <SEOHead path="/gradient-text" />
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
      <ToolLayout
        title="Gradient Text"
        description="Create eye-catching gradient text effects with animation, 3 colors, custom fonts, and more"
        colorClass="text-gradient-text"
        breadcrumbs={breadcrumbs}
        relatedTools={<RelatedTools tools={relatedTools} />}
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="order-2 lg:order-1">
            <motion.div
              className={`p-8 rounded-xl border min-h-[300px] flex items-center justify-center overflow-hidden transition-colors ${darkPreview ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-200'
                }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {renderPreview()}
            </motion.div>
            <div className="mt-4 flex items-center justify-end">
              <Button variant="outline" size="sm" onClick={() => setDarkPreview(!darkPreview)}>
                {darkPreview ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {darkPreview ? 'Light' : 'Dark'} Preview
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Controls</h3>
              <div className="flex items-center gap-2">
                <PresetManager
                  presets={savedPresets}
                  onSave={savePreset}
                  onLoad={setConfig}
                  onDelete={deletePreset}
                  onShare={getShareableUrl}
                />
                <Button variant="outline" size="sm" onClick={randomize}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Random
                </Button>
                <Button variant="outline" size="sm" onClick={reset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Text</Label>
                <Input
                  value={config.text}
                  onChange={(e) => setConfig({ ...config, text: e.target.value })}
                  placeholder="Enter your text"
                />
              </div>

              <div className="space-y-2">
                <Label>Highlight Word <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input
                  value={config.highlightWord}
                  onChange={(e) => setConfig({ ...config, highlightWord: e.target.value })}
                  placeholder="Word to highlight with gradient"
                />
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <Label>Color Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <motion.button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ background: `linear-gradient(135deg, ${preset.c1}, ${preset.c2})` }}
                      title={preset.name}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color 1</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.color1}
                      onChange={(e) => setConfig({ ...config, color1: e.target.value })}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={config.color1}
                      onChange={(e) => setConfig({ ...config, color1: e.target.value })}
                      className="font-mono text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Color 2</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.color2}
                      onChange={(e) => setConfig({ ...config, color2: e.target.value })}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={config.color2}
                      onChange={(e) => setConfig({ ...config, color2: e.target.value })}
                      className="font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Color 3 - Optional */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Color 3 <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  {config.color3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs px-2"
                      onClick={() => setConfig({ ...config, color3: undefined })}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                {config.color3 ? (
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.color3}
                      onChange={(e) => setConfig({ ...config, color3: e.target.value })}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={config.color3}
                      onChange={(e) => setConfig({ ...config, color3: e.target.value })}
                      className="font-mono text-xs"
                    />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfig({ ...config, color3: '#f59e0b' })}
                    className="w-full"
                  >
                    + Add 3rd Color
                  </Button>
                )}
              </div>

              {/* Font Family */}
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select value={config.fontFamily} onValueChange={(v) => setConfig({ ...config, fontFamily: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Angle Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Angle <span className="text-muted-foreground text-xs">(0-360°)</span></Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.angle || 90}
                      onChange={(e) => setConfig({ ...config, angle: Math.min(360, Math.max(0, parseInt(e.target.value) || 0)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="0"
                      max="360"
                    />
                    <span className="text-sm text-muted-foreground">°</span>
                  </div>
                </div>
                <Slider
                  value={[config.angle || 90]}
                  onValueChange={([v]) => setConfig({ ...config, angle: v })}
                  min={0}
                  max={360}
                  step={15}
                />
              </div>

              <div className="space-y-2">
                <Label>Direction</Label>
                <Select value={config.direction} onValueChange={(v) => setConfig({ ...config, direction: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {directions.map((d) => (
                      <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.fontSize}
                      onChange={(e) => setConfig({ ...config, fontSize: Math.min(128, Math.max(16, parseInt(e.target.value) || 16)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="16"
                      max="128"
                    />
                    <span className="text-sm text-muted-foreground">px</span>
                  </div>
                </div>
                <Slider
                  value={[config.fontSize]}
                  onValueChange={([v]) => setConfig({ ...config, fontSize: v })}
                  min={16}
                  max={128}
                  step={4}
                />
              </div>

              {/* Effects Section */}
              <div className="space-y-3 pt-3 border-t border-border">
                <Label className="text-sm font-semibold">Effects</Label>

                <div className="flex items-center justify-between py-2">
                  <Label className="font-normal cursor-pointer" htmlFor="animated-toggle">Animated Gradient</Label>
                  <input
                    id="animated-toggle"
                    type="checkbox"
                    checked={config.animated}
                    onChange={(e) => setConfig({ ...config, animated: e.target.checked })}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300"
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label className="font-normal cursor-pointer" htmlFor="shadow-toggle">Text Shadow</Label>
                  <input
                    id="shadow-toggle"
                    type="checkbox"
                    checked={config.textShadow}
                    onChange={(e) => setConfig({ ...config, textShadow: e.target.checked })}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="font-normal">Stroke Width</Label>
                    <span className="text-sm text-muted-foreground">{config.strokeWidth}px</span>
                  </div>
                  <Slider
                    value={[config.strokeWidth]}
                    onValueChange={([v]) => setConfig({ ...config, strokeWidth: v })}
                    min={0}
                    max={3}
                    step={0.5}
                  />
                </div>
              </div>
            </div>

            {/* Export */}
            <div className="pt-6 border-t border-border">
              <Tabs defaultValue="tailwind">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="react">React</TabsTrigger>
                    <TabsTrigger value="inline">Inline</TabsTrigger>
                    <TabsTrigger value="elementor">Elementor</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="css">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-48">
                      <code>{cssCode}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <ExportButton code={cssCode} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tailwind">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-48">
                      <code>{tailwindCode}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <ExportButton code={tailwindCode} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="react">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-48">
                      <code>{reactCode}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <ExportButton code={reactCode} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="inline">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-48">
                      <code>{inlineCode}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <ExportButton code={inlineCode} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="elementor">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-secondary text-xs overflow-x-auto max-h-64 leading-relaxed">
                      <code>{elementorCode}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <ExportButton code={elementorCode} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <KeyboardHints shortcuts={shortcuts} />
          </div>
        </div>
      </ToolLayout>
    </Layout>
  );
}
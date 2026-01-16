import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ExportButton } from '@/components/tools/ExportButton';
import { KeyboardHints } from '@/components/tools/KeyboardHints';
import { PresetManager } from '@/components/tools/PresetManager';
import { usePresets } from '@/hooks/use-presets';
import { useToolShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, Shuffle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo/SEOHead';
import { RelatedTools } from '@/components/tools/RelatedTools';


interface ShadowConfig {
  size: number;
  distance: number;
  blur: number;
  intensity: number;
  borderRadius: number;
  lightSource: string;
  isPressed: boolean;
  bgColor: string;
  mode: 'neumorphic' | 'classic';
  spread: number;
  customLightColor?: string;
  customDarkColor?: string;
  offsetX: number;
  offsetY: number;
  previewBg: 'light' | 'dark' | 'custom';
  customBgColor: string;
  previewTemplate: 'shape' | 'button' | 'card' | 'image' | 'modal';
}

const defaultConfig: ShadowConfig = {
  size: 200,
  distance: 20,
  blur: 40,
  intensity: 15,
  borderRadius: 50,
  lightSource: 'TL',
  isPressed: false,
  bgColor: '#1e293b',
  mode: 'neumorphic',
  spread: 0,
  offsetX: 0,
  offsetY: 0,
  previewBg: 'dark',
  customBgColor: '#f1f5f9',
  previewTemplate: 'shape',
};

const shadowPresets = [
  { name: 'Soft', distance: 10, blur: 30, intensity: 8, spread: 0 },
  { name: 'Hard', distance: 5, blur: 5, intensity: 25, spread: 0 },
  { name: 'Floating', distance: 20, blur: 50, intensity: 15, spread: -5 },
  { name: 'Lifted', distance: 15, blur: 40, intensity: 12, spread: 0 },
  { name: 'Inner', distance: 8, blur: 15, intensity: 20, spread: 0, isPressed: true },
  { name: 'Subtle', distance: 5, blur: 20, intensity: 5, spread: 0 },
  { name: 'Strong', distance: 30, blur: 60, intensity: 30, spread: 0 },
  { name: 'Glow', distance: 0, blur: 25, intensity: 20, spread: 5 },
];

const shapePresets = [
  { name: 'Circle', borderRadius: 150, size: 200 },
  { name: 'Square', borderRadius: 0, size: 200 },
  { name: 'Rounded', borderRadius: 20, size: 200 },
  { name: 'Pill', borderRadius: 100, size: 200 },
  { name: 'Card', borderRadius: 12, size: 250 },
];

const lightSources = [
  { id: 'TL', label: '↖' },
  { id: 'TR', label: '↗' },
  { id: 'BL', label: '↙' },
  { id: 'BR', label: '↘' },
  { id: 'ALL', label: '○' },
];

const adjustColor = (hex: string, amount: number): string => {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `rgb(${r}, ${g}, ${b})`;
};

const hexToRGBA = (hex: string, alpha: number = 1): string => {
  const num = parseInt(hex.slice(1), 16);
  const r = (num >> 16);
  const g = ((num >> 8) & 0x00FF);
  const b = (num & 0x0000FF);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function ShadowTool() {
  const [config, setConfig] = useState<ShadowConfig>(defaultConfig);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Box Shadow', href: '/shadow' },
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
      name: 'Color Palette',
      path: '/palette',
      description: 'Create harmonious color schemes',
      icon: '🎨'
    }
  ];

  const { toast } = useToast();

  const { presets, savePreset, deletePreset, getShareableUrl, loadFromUrl } = usePresets('shadow', config);

  useEffect(() => {
    const urlPreset = loadFromUrl();
    if (urlPreset) {
      setConfig(urlPreset);
      toast({ title: 'Preset loaded from URL' });
    }
  }, []);

  const handleReset = useCallback(() => {
    setConfig(defaultConfig);
    toast({ title: 'Reset to defaults' });
  }, [toast]);

  const handleRandomize = useCallback(() => {
    const sources = ['TL', 'TR', 'BL', 'BR', 'ALL'];
    setConfig({
      ...config,
      distance: Math.floor(Math.random() * 30) + 10,
      blur: Math.floor(Math.random() * 60) + 20,
      intensity: Math.floor(Math.random() * 30) + 10,
      borderRadius: Math.floor(Math.random() * 100),
      lightSource: sources[Math.floor(Math.random() * sources.length)],
      isPressed: Math.random() > 0.5,
    });
    toast({ title: 'Randomized!' });
  }, [config, toast]);

  const lightColor = adjustColor(config.bgColor, config.intensity);
  const darkColor = adjustColor(config.bgColor, -config.intensity);

  const getBoxShadow = () => {
    const { distance, blur, lightSource, isPressed } = config;
    const inset = isPressed ? 'inset ' : '';

    if (lightSource === 'ALL') {
      return `${inset}${distance}px ${distance}px ${blur}px ${darkColor}, ${inset}-${distance}px -${distance}px ${blur}px ${lightColor}, ${inset}-${distance}px ${distance}px ${blur}px ${darkColor}, ${inset}${distance}px -${distance}px ${blur}px ${lightColor}`;
    }

    let d1 = distance, d2 = distance, d3 = -distance, d4 = -distance;

    if (lightSource === 'TR') { d1 = -distance; d2 = distance; d3 = distance; d4 = -distance; }
    if (lightSource === 'BL') { d1 = distance; d2 = -distance; d3 = -distance; d4 = distance; }
    if (lightSource === 'BR') { d1 = -distance; d2 = -distance; d3 = distance; d4 = distance; }

    return `${inset}${d1}px ${d2}px ${blur}px ${darkColor}, ${inset}${d3}px ${d4}px ${blur}px ${lightColor}`;
  };

  const boxShadow = getBoxShadow();

  const cssCode = `.neumorphic {
  width: ${config.size}px;
  height: ${config.size}px;
  background: ${config.bgColor};
  border-radius: ${config.borderRadius}px;
  box-shadow: ${boxShadow};
}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    toast({ title: 'CSS copied!' });
  }, [cssCode, toast]);

  const shortcuts = useToolShortcuts({
    onRandomize: handleRandomize,
    onReset: handleReset,
    onCopy: handleCopy,
  });

  const tailwindCode = `<div class="w-[${config.size}px] h-[${config.size}px] rounded-[${config.borderRadius}px] bg-[${config.bgColor}] shadow-[${boxShadow.replace(/, /g, ',')}]">
</div>`;

  const reactCode = `const NeumorphicElement = () => (
  <div style={{
    width: '${config.size}px',
    height: '${config.size}px',
    borderRadius: '${config.borderRadius}px',
    background: '${config.bgColor}',
    boxShadow: '${boxShadow}'
  }} />
);`;

  // Elementor Export - Parse shadow for Elementor format
  const generateElementorCode = () => {
    const { distance, blur, lightSource, isPressed } = config;

    // For Elementor, we'll use the primary shadow (first one)
    let horizontal = distance;
    let vertical = distance;

    if (lightSource === 'TR') { horizontal = -distance; vertical = distance; }
    if (lightSource === 'BL') { horizontal = distance; vertical = -distance; }
    if (lightSource === 'BR') { horizontal = -distance; vertical = -distance; }
    if (lightSource === 'ALL') { horizontal = 0; vertical = 0; }

    const shadowColor = hexToRGBA(darkColor.replace('rgb(', '#').replace(')', '').split(',').map(x => parseInt(x.trim()).toString(16).padStart(2, '0')).join(''), 0.3);

    return `/* Elementor Box Shadow Settings */
/* Navigate to: Advanced > Border > Box Shadow */

Horizontal: ${horizontal}px
Vertical: ${vertical}px
Blur: ${blur}px
Spread: 0px
Color: ${shadowColor}
Position: ${isPressed ? 'Inset' : 'Outline'}

/* Additional Shadow (for neumorphic effect) */
/* Add a second box shadow layer: */
Horizontal: ${-horizontal}px
Vertical: ${-vertical}px
Blur: ${blur}px
Spread: 0px
Color: ${hexToRGBA(lightColor.replace('rgb(', '#').replace(')', '').split(',').map(x => parseInt(x.trim()).toString(16).padStart(2, '0')).join(''), 0.3)}
Position: ${isPressed ? 'Inset' : 'Outline'}

/* Border Radius */
Border Radius: ${config.borderRadius}px

/* Background */
Background Color: ${config.bgColor}`;
  };

  const elementorCode = generateElementorCode();

  return (
    <Layout>
      <SEOHead path="/shadow" />
      <ToolLayout
        title="Shadow Studio"
        description="Design neumorphic shadows with light source control, shape presets, and Elementor export"
        colorClass="text-shadow"
        breadcrumbs={breadcrumbs}
        relatedTools={<RelatedTools tools={relatedTools} />}
        headerActions={
          <>
            <KeyboardHints shortcuts={shortcuts} />
            <PresetManager
              presets={presets}
              onSave={savePreset}
              onLoad={(data) => setConfig(data)}
              onDelete={deletePreset}
              onShare={getShareableUrl}
            />
          </>
        }
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end gap-2 mb-2">
              <Label className="text-xs self-center">Preview BG:</Label>
              <Button
                variant={config.previewBg === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setConfig({ ...config, previewBg: 'light' })}
                className="h-7 text-xs px-2"
              >
                Light
              </Button>
              <Button
                variant={config.previewBg === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setConfig({ ...config, previewBg: 'dark' })}
                className="h-7 text-xs px-2"
              >
                Dark
              </Button>
              <Button
                variant={config.previewBg === 'custom' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setConfig({ ...config, previewBg: 'custom' })}
                className="h-7 text-xs px-2"
              >
                Custom
              </Button>
              {config.previewBg === 'custom' && (
                <Input
                  type="color"
                  value={config.customBgColor}
                  onChange={(e) => setConfig({ ...config, customBgColor: e.target.value })}
                  className="w-12 h-7 p-1 cursor-pointer"
                />
              )}
            </div>
            <div className="flex justify-end gap-2 mb-2">
              <Label className="text-xs self-center">Template:</Label>
              {['shape', 'button', 'card', 'image', 'modal'].map((template) => (
                <Button
                  key={template}
                  variant={config.previewTemplate === template ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setConfig({ ...config, previewTemplate: template as ShadowConfig['previewTemplate'] })}
                  className="h-7 text-xs px-2 capitalize"
                >
                  {template}
                </Button>
              ))}
            </div>
            <div
              className="p-8 rounded-xl min-h-[500px] flex items-center justify-center transition-colors"
              style={{
                backgroundColor:
                  config.previewBg === 'light' ? '#f1f5f9' :
                    config.previewBg === 'custom' ? config.customBgColor :
                      config.bgColor
              }}
            >
              {/* Template-based Preview */}
              {config.previewTemplate === 'shape' && (
                <motion.div
                  className="flex items-center justify-center transition-all duration-300"
                  style={{
                    width: `${config.size}px`,
                    height: `${config.size}px`,
                    backgroundColor: config.bgColor,
                    borderRadius: `${config.borderRadius}px`,
                    boxShadow: boxShadow,
                  }}
                  key={JSON.stringify(config)}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm text-muted-foreground">
                    {config.isPressed ? 'Pressed' : 'Raised'}
                  </span>
                </motion.div>
              )}

              {config.previewTemplate === 'button' && (
                <motion.button
                  className="px-8 py-4 font-semibold rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: config.bgColor,
                    borderRadius: `${config.borderRadius}px`,
                    boxShadow: boxShadow,
                  }}
                  key={JSON.stringify(config)}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Click Me
                </motion.button>
              )}

              {config.previewTemplate === 'card' && (
                <motion.div
                  className="p-6 w-80 transition-all duration-300"
                  style={{
                    backgroundColor: config.bgColor,
                    borderRadius: `${config.borderRadius}px`,
                    boxShadow: boxShadow,
                  }}
                  key={JSON.stringify(config)}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-bold mb-2">Card Title</h3>
                  <p className="text-sm text-muted-foreground">This is a preview of how the shadow looks on a card component.</p>
                </motion.div>
              )}

              {config.previewTemplate === 'image' && (
                <motion.div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    width: `${config.size}px`,
                    height: `${config.size}px`,
                    borderRadius: `${config.borderRadius}px`,
                    boxShadow: boxShadow,
                  }}
                  key={JSON.stringify(config)}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400"
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              {config.previewTemplate === 'modal' && (
                <motion.div
                  className="p-8 w-96 transition-all duration-300"
                  style={{
                    backgroundColor: config.bgColor,
                    borderRadius: `${config.borderRadius}px`,
                    boxShadow: boxShadow,
                  }}
                  key={JSON.stringify(config)}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-xl font-bold mb-4">Modal Dialog</h2>
                  <p className="text-sm text-muted-foreground mb-6">This shows how your shadow appears on modal dialogs and overlays.</p>
                  <div className="flex gap-2 justify-end">
                    <button className="px-4 py-2 text-sm rounded">Cancel</button>
                    <button className="px-4 py-2 text-sm rounded bg-primary text-primary-foreground">Confirm</button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Controls</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRandomize}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Randomize
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-5">
              {/* Shape Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={!config.isPressed ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setConfig({ ...config, isPressed: false })}
                  className="flex-1"
                >
                  Raised
                </Button>
                <Button
                  variant={config.isPressed ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setConfig({ ...config, isPressed: true })}
                  className="flex-1"
                >
                  Pressed
                </Button>
              </div>

              {/* Light Source Grid */}
              <div className="space-y-2">
                <Label>Light Source</Label>
                <div className="flex gap-2">
                  {lightSources.map((ls) => (
                    <button
                      key={ls.id}
                      className={`w-10 h-10 rounded-lg border transition-all text-sm font-bold ${config.lightSource === ls.id
                        ? 'border-shadow bg-shadow/20 text-shadow'
                        : 'border-border hover:border-shadow/50 text-muted-foreground'
                        }`}
                      onClick={() => setConfig({ ...config, lightSource: ls.id })}
                    >
                      {ls.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shadow Presets */}
              <div className="space-y-2">
                <Label>Shadow Presets</Label>
                <div className="grid grid-cols-4 gap-2">
                  {shadowPresets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setConfig({
                        ...config,
                        distance: preset.distance,
                        blur: preset.blur,
                        intensity: preset.intensity
                      })}
                      className="text-xs"
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Shape Presets */}
              <div className="space-y-2">
                <Label>Shape Presets</Label>
                <div className="grid grid-cols-5 gap-2">
                  {shapePresets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setConfig({
                        ...config,
                        borderRadius: preset.borderRadius,
                        size: preset.size
                      })}
                      className="text-xs"
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Shape Size</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.size}
                      onChange={(e) => setConfig({ ...config, size: Math.min(300, Math.max(100, parseInt(e.target.value) || 100)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="100"
                      max="300"
                    />
                    <span className="text-sm text-muted-foreground">px</span>
                  </div>
                </div>
                <Slider
                  value={[config.size]}
                  onValueChange={([v]) => setConfig({ ...config, size: v })}
                  min={100}
                  max={300}
                  step={10}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Distance</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.distance}
                      onChange={(e) => setConfig({ ...config, distance: Math.min(50, Math.max(1, parseInt(e.target.value) || 1)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="1"
                      max="50"
                    />
                    <span className="text-sm text-muted-foreground">px</span>
                  </div>
                </div>
                <Slider
                  value={[config.distance]}
                  onValueChange={([v]) => setConfig({ ...config, distance: v })}
                  min={1}
                  max={50}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Blur</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.blur}
                      onChange={(e) => setConfig({ ...config, blur: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-muted-foreground">px</span>
                  </div>
                </div>
                <Slider
                  value={[config.blur]}
                  onValueChange={([v]) => setConfig({ ...config, blur: v })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Intensity</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.intensity}
                      onChange={(e) => setConfig({ ...config, intensity: Math.min(50, Math.max(5, parseInt(e.target.value) || 5)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="5"
                      max="50"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  value={[config.intensity]}
                  onValueChange={([v]) => setConfig({ ...config, intensity: v })}
                  min={5}
                  max={50}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Border Radius</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.borderRadius}
                      onChange={(e) => setConfig({ ...config, borderRadius: Math.min(150, Math.max(0, parseInt(e.target.value) || 0)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="0"
                      max="150"
                    />
                    <span className="text-sm text-muted-foreground">px</span>
                  </div>
                </div>
                <Slider
                  value={[config.borderRadius]}
                  onValueChange={([v]) => setConfig({ ...config, borderRadius: v })}
                  min={0}
                  max={150}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.bgColor}
                    onChange={(e) => setConfig({ ...config, bgColor: e.target.value })}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.bgColor}
                    onChange={(e) => setConfig({ ...config, bgColor: e.target.value })}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Export */}
            <div className="pt-6 border-t border-border">
              <Tabs defaultValue="css">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                    <TabsTrigger value="react">React</TabsTrigger>
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
          </div>
        </div>
      </ToolLayout>
    </Layout>
  );
}

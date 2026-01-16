import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ExportButton } from '@/components/tools/ExportButton';
import { KeyboardHints } from '@/components/tools/KeyboardHints';
import { PresetManager } from '@/components/tools/PresetManager';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, Shuffle, Download } from 'lucide-react';
import { useToolShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { usePresets } from '@/hooks/use-presets';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo/SEOHead';
import { RelatedTools } from '@/components/tools/RelatedTools';


interface BlobConfig {
  complexity: number;
  size: number;
  color1: string;
  color2: string;
  gradientAngle: number;
  rotation: number;
  animate: boolean;
  borderRadius: string;
}

const generateBorderRadius = (complexity: number): string => {
  const min = 50 - (complexity / 2);
  const max = 50 + (complexity / 2);
  const r = () => Math.floor(Math.random() * (max - min + 1) + min) + '%';
  return `${r()} ${r()} ${r()} ${r()} / ${r()} ${r()} ${r()} ${r()}`;
};

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

const defaultConfig: BlobConfig = {
  complexity: 50,
  size: 256,
  color1: '#14b8a6',
  color2: '#0f766e',
  gradientAngle: 135,
  rotation: 0,
  animate: false,
  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
};

export default function BlobTool() {
  const [config, setConfig] = useState<BlobConfig>(defaultConfig);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blob Maker', href: '/blob' },
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
      name: 'Shadow Generator',
      path: '/shadow',
      description: 'Create soft neumorphic shadows',
      icon: '🌑'
    }
  ];

  const { toast } = useToast();

  const { presets, savePreset, deletePreset, getShareableUrl, loadFromUrl } = usePresets('blob', config);

  // Load preset from URL on mount
  useEffect(() => {
    const urlPreset = loadFromUrl();
    if (urlPreset) {
      setConfig(urlPreset);
      toast({ title: 'Preset loaded from URL' });
    }
  }, []);

  const regenerate = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      borderRadius: generateBorderRadius(prev.complexity),
      color1: randomColor(),
      color2: randomColor(),
    }));
  }, []);

  const reset = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    toast({ title: 'CSS copied to clipboard' });
  }, [config]);

  const shortcuts = useToolShortcuts({
    onRandomize: regenerate,
    onCopy: copyCode,
    onReset: reset,
  });

  const downloadSVG = useCallback(() => {
    const svgContent = `
<svg width="${config.size}" height="${config.size}" viewBox="0 0 ${config.size} ${config.size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${config.color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#blobGradient)" rx="${config.borderRadius}" transform="rotate(${config.rotation} ${config.size / 2} ${config.size / 2})" />
  ${config.animate ? `
  <style>
    rect { animation: morphBlob 8s ease-in-out infinite; }
    @keyframes morphBlob {
      0%, 100% { rx: ${config.borderRadius}; }
      25% { rx: ${generateBorderRadius(config.complexity)}; }
      50% { rx: ${generateBorderRadius(config.complexity)}; }
      75% { rx: ${generateBorderRadius(config.complexity)}; }
    }
  </style>` : ''}
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blob-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'SVG Downloaded!' });
  }, [config, toast]);

  const blobStyle = {
    width: `${config.size}px`,
    height: `${config.size}px`,
    background: `linear-gradient(${config.gradientAngle}deg, ${config.color1}, ${config.color2})`,
    borderRadius: config.borderRadius,
    transform: `rotate(${config.rotation}deg)`,
    animation: config.animate ? 'morphBlob 8s ease-in-out infinite' : 'none',
  };

  const animKeyframes = `@keyframes morphBlob {
  0%, 100% { border-radius: ${config.borderRadius}; }
  25% { border-radius: ${generateBorderRadius(config.complexity)}; }
  50% { border-radius: ${generateBorderRadius(config.complexity)}; }
  75% { border-radius: ${generateBorderRadius(config.complexity)}; }
}`;

  const cssCode = `.blob {
  width: ${config.size}px;
  height: ${config.size}px;
  background: linear-gradient(${config.gradientAngle}deg, ${config.color1}, ${config.color2});
  border-radius: ${config.borderRadius};
  transform: rotate(${config.rotation}deg);${config.animate ? `
  animation: morphBlob 8s ease-in-out infinite;
}

${animKeyframes}` : '\n}'}`;

  const reactCode = `const Blob = () => {
  const blobStyle = {
    width: '${config.size}px',
    height: '${config.size}px',
    background: 'linear-gradient(${config.gradientAngle}deg, ${config.color1}, ${config.color2})',
    borderRadius: '${config.borderRadius}',
    transform: 'rotate(${config.rotation}deg)',${config.animate ? `
    animation: 'morphBlob 8s ease-in-out infinite',` : ''}
  };

  return <div style={blobStyle} />;
};`;

  return (
    <Layout>
      <SEOHead path="/blob" />
      <ToolLayout
        title="Blob Maker"
        description="Generate organic blob shapes with gradient colors, rotation, and animation"
        colorClass="text-blob"
        breadcrumbs={breadcrumbs}
        relatedTools={<RelatedTools tools={relatedTools} />}
      >
        <style>{`
          @keyframes morphBlob {
            0%, 100% { border-radius: ${config.borderRadius}; }
            25% { border-radius: ${generateBorderRadius(config.complexity)}; }
            50% { border-radius: ${generateBorderRadius(config.complexity)}; }
            75% { border-radius: ${generateBorderRadius(config.complexity)}; }
          }
        `}</style>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="order-2 lg:order-1">
            <motion.div
              className="p-8 rounded-xl bg-secondary/30 border border-border min-h-[450px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                style={blobStyle}
                className="transition-all duration-500"
                key={config.borderRadius}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </motion.div>
          </div>

          {/* Controls */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Controls</h3>
              <div className="flex items-center gap-2">
                <PresetManager
                  presets={presets}
                  onSave={savePreset}
                  onLoad={setConfig}
                  onDelete={deletePreset}
                  onShare={getShareableUrl}
                />
                <Button variant="outline" size="sm" onClick={regenerate}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Randomize
                </Button>
                <Button variant="outline" size="sm" onClick={reset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Complexity</Label>
                  <span className="text-sm text-muted-foreground">{config.complexity}%</span>
                </div>
                <Slider
                  value={[config.complexity]}
                  onValueChange={([v]) => {
                    setConfig({ ...config, complexity: v, borderRadius: generateBorderRadius(v) });
                  }}
                  min={10}
                  max={100}
                  step={5}
                  aria-label="Complexity"
                  data-testid="complexity-slider"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Size</Label>
                  <span className="text-sm text-muted-foreground">{config.size}px</span>
                </div>
                <Slider
                  value={[config.size]}
                  onValueChange={([v]) => setConfig({ ...config, size: v })}
                  min={100}
                  max={400}
                  step={8}
                  aria-label="Size"
                  data-testid="size-slider"
                />
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

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Gradient Angle</Label>
                  <span className="text-sm text-muted-foreground">{config.gradientAngle}°</span>
                </div>
                <Slider
                  value={[config.gradientAngle]}
                  onValueChange={([v]) => setConfig({ ...config, gradientAngle: v })}
                  min={0}
                  max={360}
                  step={15}
                  aria-label="Gradient Angle"
                  data-testid="angle-slider"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Rotation</Label>
                  <span className="text-sm text-muted-foreground">{config.rotation}°</span>
                </div>
                <Slider
                  value={[config.rotation]}
                  onValueChange={([v]) => setConfig({ ...config, rotation: v })}
                  min={0}
                  max={360}
                  step={5}
                  aria-label="Rotation"
                  data-testid="rotation-slider"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Animate Morph</Label>
                <Switch
                  checked={config.animate}
                  onCheckedChange={(v) => setConfig({ ...config, animate: v })}
                />
              </div>
            </div>

            {/* Export */}
            <div className="pt-6 border-t border-border">
              <Tabs defaultValue="css">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="react">React</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="css">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-64">
                      <code>{cssCode}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <ExportButton code={cssCode} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="react">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-64">
                      <code>{reactCode}</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <ExportButton code={reactCode} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 flex justify-end">
                <Button onClick={downloadSVG} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download SVG
                </Button>
              </div>
            </div>

            <KeyboardHints shortcuts={shortcuts} />
          </div>
        </div>
      </ToolLayout>
    </Layout>
  );
}
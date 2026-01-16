import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RotateCcw, Shuffle, User, ShoppingBag, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GlassConfig {
  blur: number;
  transparency: number;
  saturation: number;
  borderRadius: number;
  tintColor: string;
  borderColor: string;
  showBorder: boolean;
  width: number;
  minHeight: number;
  template: string;
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  buttonBgColor: string; // New field for customizable button background
}

const defaultConfig: GlassConfig = {
  blur: 16,
  transparency: 0.65,
  saturation: 180,
  borderRadius: 16,
  tintColor: '#ffffff',
  borderColor: '#ffffff',
  showBorder: true,
  width: 320,
  minHeight: 0,
  template: 'standard',
  title: 'Glass UI',
  subtitle: 'Modern Aesthetics',
  buttonText: 'Explore',
  imageUrl: '',
  buttonBgColor: '#0ea5e9', // Default sky-500
};

const templates = [
  { value: 'standard', label: 'Standard Card' },
  { value: 'product', label: 'Product Card' },
  { value: 'profile', label: 'Profile Card' },
  { value: 'article', label: 'Article Card' },
  { value: 'social', label: 'Social Media Post' },
];

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : { r: 255, g: 255, b: 255 };
};

export default function GlassTool() {
  const [config, setConfig] = useState<GlassConfig>(defaultConfig);
  const [bgColor, setBgColor] = useState('#0ea5e9');
  const { toast } = useToast();

  const { presets, savePreset, deletePreset, getShareableUrl, loadFromUrl } = usePresets('glass', config);

  useEffect(() => {
    const urlPreset = loadFromUrl();
    if (urlPreset) {
      setConfig(urlPreset);
      toast({ title: 'Preset loaded from URL' });
    }
  }, []);

  const tintRgb = hexToRgb(config.tintColor);
  const borderRgb = hexToRgb(config.borderColor);

  const bgString = `rgba(${tintRgb.r},${tintRgb.g},${tintRgb.b},${config.transparency})`;
  const borderString = config.showBorder
    ? `1px solid rgba(${borderRgb.r},${borderRgb.g},${borderRgb.b},${Math.max(0.2, config.transparency - 0.1)})`
    : 'none';

  const glassStyle = {
    width: `${config.width}px`,
    minHeight: config.minHeight > 0 ? `${config.minHeight}px` : 'auto',
    background: bgString,
    backdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%)`,
    WebkitBackdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%)`,
    borderRadius: `${config.borderRadius}px`,
    border: borderString,
  };

  const randomize = useCallback(() => {
    setConfig({
      ...config,
      blur: Math.floor(Math.random() * 20 + 5),
      transparency: parseFloat((Math.random() * 0.5 + 0.1).toFixed(2)),
      saturation: Math.floor(100 + Math.random() * 100),
    });
    toast({ title: 'Randomized!' });
  }, [config, toast]);

  const handleReset = useCallback(() => {
    setConfig(defaultConfig);
    toast({ title: 'Reset to defaults' });
  }, [toast]);

  const setImage = (type: 'user' | 'product') => {
    const urls = {
      user: 'https://i.pravatar.cc/300?img=47',
      product: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    };
    setConfig({ ...config, imageUrl: urls[type] });
  };

  const getTemplateContentHtml = () => {
    const imgSrc = config.imageUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300';
    const title = config.title || 'Glass UI';
    const subtitle = config.subtitle || 'Modern Aesthetics';
    const buttonText = config.buttonText || 'Explore';
    const buttonBg = config.buttonBgColor || '#0ea5e9';

    switch (config.template) {
      case 'product':
        return `  <div class="w-full h-40 bg-black/20 rounded-lg mb-4 flex items-center justify-center border border-white/10 overflow-hidden">
    <img src="${imgSrc}" class="w-full h-full object-cover" alt="Product" />
  </div>
  <div class="w-full text-left">
    <h3 class="text-xl font-bold text-white mb-1">${title}</h3>
    <p class="text-white/70 text-xs mb-4 uppercase tracking-wider">${subtitle}</p>
    <div class="flex justify-between items-center mb-4">
      <span class="text-2xl font-bold text-sky-300">${buttonText}</span>
      <button class="w-8 h-8 rounded-full text-white flex items-center justify-center" style="background-color: ${buttonBg}">+</button>
    </div>
    <button class="w-full text-white py-2 rounded-lg text-sm font-bold" style="background-color: ${buttonBg}">Buy Now</button>
  </div>`;
      case 'profile':
        return `  <div class="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-1 mb-3">
    <img src="${imgSrc}" class="w-full h-full rounded-full object-cover border-2 border-white/50" alt="Profile" />
  </div>
  <h3 class="text-lg font-bold text-white">${title}</h3>
  <p class="text-sky-300 text-xs font-medium mb-4">${subtitle}</p>
  <div class="flex gap-4 text-white/60 text-sm mb-6">
    <span><b class="text-white">1.2k</b> Followers</span>
    <span><b class="text-white">450</b> Following</span>
  </div>
  <button class="w-full text-white py-2 rounded-lg text-sm font-bold" style="background-color: ${buttonBg}">${buttonText}</button>`;
      case 'article':
        return `  <div class="w-full h-32 mb-4 rounded-lg overflow-hidden border border-white/10">
    <img src="${imgSrc}" class="w-full h-full object-cover" alt="Article" />
  </div>
  <div class="text-left w-full">
    <span class="px-2 py-1 bg-white/10 rounded text-xs font-bold text-sky-300 uppercase">Design</span>
    <h3 class="text-lg font-bold text-white mt-3 mb-2">${title}</h3>
    <p class="text-white/70 text-xs mb-4">${subtitle}</p>
    <div class="flex items-center justify-between border-t border-white/10 pt-4">
      <div class="flex items-center">
        <div class="w-6 h-6 bg-purple-500 rounded-full mr-2"></div>
        <span class="text-xs text-white/80">Author</span>
      </div>
      <span class="text-xs text-white/50">${buttonText}</span>
    </div>
  </div>`;
      case 'social':
        return `  <div class="flex items-center gap-3 mb-4">
    <img src="${imgSrc}" class="w-10 h-10 rounded-full object-cover border border-white/20" alt="Avatar" />
    <div class="flex-1">
      <p class="text-white font-semibold text-sm">${title}</p>
      <p class="text-white/50 text-xs">${subtitle}</p>
    </div>
  </div>
  <p class="text-white/90 text-sm mb-4 leading-relaxed">${buttonText}</p>
  <div class="w-full h-48 rounded-lg bg-black/20 border border-white/10 mb-4 overflow-hidden">
    <img src="${imgSrc}" class="w-full h-full object-cover" alt="Post" />
  </div>
  <div class="flex items-center justify-between text-white/70">
    <div class="flex gap-4">
      <button class="flex items-center gap-1 hover:text-pink-400"><span>♥</span> 124</button>
      <button class="flex items-center gap-1 hover:text-sky-400"><span>💬</span> 18</button>
      <button class="flex items-center gap-1 hover:text-green-400"><span>↗</span></button>
    </div>
    <button class="hover:text-yellow-400"><span>🔖</span></button>
  </div>`;
      default:
        return `  <div class="w-16 h-16 bg-white/20 rounded-full mb-6 flex items-center justify-center backdrop-blur-md border border-white/20">
    <span class="text-white text-3xl">💎</span>
  </div>
  <h3 class="text-2xl font-bold text-white mb-2">${title}</h3>
  <p class="text-white/90 text-sm mb-6 font-medium">${subtitle}</p>
  <button class="text-white border border-white/40 px-6 py-2 rounded-lg text-sm font-medium" style="background-color: ${buttonBg}80">${buttonText}</button>`;
    }
  };

  const renderCardContent = () => {
    const imgSrc = config.imageUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';

    switch (config.template) {
      case 'product':
        return (
          <>
            <div className="w-full h-40 bg-black/20 rounded-lg mb-4 flex items-center justify-center border border-white/10 overflow-hidden">
              <img src={imgSrc} className="w-full h-full object-cover" alt="Product" />
            </div>
            <div className="w-full text-left">
              <h3 className="text-xl font-bold text-white mb-1">{config.title || 'Nike Air'}</h3>
              <p className="text-white/70 text-xs mb-4 uppercase tracking-wider">{config.subtitle || 'Running Shoes'}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-sky-300">{config.buttonText || '$120'}</span>
                <button className="w-8 h-8 rounded-full text-white flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: config.buttonBgColor }}>+</button>
              </div>
              <button className="w-full text-white py-2 rounded-lg text-sm font-bold shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: config.buttonBgColor }}>Buy Now</button>
            </div>
          </>
        );
      case 'profile':
        return (
          <>
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-1 mb-3">
              <img src={imgSrc} className="w-full h-full rounded-full object-cover border-2 border-white/50" alt="Profile" />
            </div>
            <h3 className="text-lg font-bold text-white">{config.title || 'Sarah Jen'}</h3>
            <p className="text-sky-300 text-xs font-medium mb-4">{config.subtitle || 'UX Designer'}</p>
            <div className="flex gap-4 text-white/60 text-sm mb-6">
              <span><b className="text-white">1.2k</b> Followers</span>
              <span><b className="text-white">450</b> Following</span>
            </div>
            <button className="w-full text-white py-2 rounded-lg text-sm font-bold shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: config.buttonBgColor }}>
              {config.buttonText || 'Follow'}
            </button>
          </>
        );
      case 'article':
        return (
          <>
            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden border border-white/10">
              <img src={imgSrc} className="w-full h-full object-cover" alt="Article" />
            </div>
            <div className="text-left w-full">
              <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold text-sky-300 uppercase tracking-wide border border-white/10">Design</span>
              <h3 className="text-lg font-bold text-white mt-3 mb-2 leading-tight">{config.title || 'Glassmorphism'}</h3>
              <p className="text-white/70 text-xs mb-4 leading-relaxed line-clamp-2">{config.subtitle || 'Explore frosted glass effects.'}</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-xs text-white/80">Author</span>
                </div>
                <span className="text-xs text-white/50">{config.buttonText || '5 min'}</span>
              </div>
            </div>
          </>
        );
      case 'social':
        return (
          <>
            <div className="flex items-center gap-3 mb-4">
              <img src={imgSrc} className="w-10 h-10 rounded-full object-cover border border-white/20" alt="Avatar" />
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{config.title || '@username'}</p>
                <p className="text-white/50 text-xs">{config.subtitle || '2 hours ago'}</p>
              </div>
            </div>
            <p className="text-white/90 text-sm mb-4 leading-relaxed">{config.buttonText || 'Just discovered this amazing glass effect! ✨'}</p>
            <div className="w-full h-48 rounded-lg bg-black/20 border border-white/10 mb-4 overflow-hidden">
              <img src={imgSrc} className="w-full h-full object-cover" alt="Post" />
            </div>
            <div className="flex items-center justify-between text-white/70">
              <div className="flex gap-4">
                <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                  <Heart className="w-4 h-4" /> 124
                </button>
                <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                  <MessageCircle className="w-4 h-4" /> 18
                </button>
                <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <button className="hover:text-yellow-400 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="w-16 h-16 bg-white/20 rounded-full mb-6 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
              <span className="text-white text-3xl">💎</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{config.title || 'Title'}</h3>
            <p className="text-white/90 text-sm mb-6 drop-shadow-md font-medium">{config.subtitle || 'Subtitle text goes here.'}</p>
            <button
              className="text-white border border-white/40 px-6 py-2 rounded-lg text-sm font-medium backdrop-blur-sm transition-all shadow-lg hover:opacity-90"
              style={{ backgroundColor: config.buttonBgColor + '80' }}
            >
              {config.buttonText || 'Button'}
            </button>
          </>
        );
    }
  };

  const minHeightStyle = config.minHeight > 0 ? `min-height: ${config.minHeight}px;` : '';
  const minHeightStyleJs = config.minHeight > 0 ? `minHeight: '${config.minHeight}px',` : '';

  const cssCode = `/* CSS Glass Card */
.glass-card {
  width: ${config.width}px;
  ${minHeightStyle ? minHeightStyle + '\n  ' : ''}background: ${bgString};
  backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);
  -webkit-backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);
  border-radius: ${config.borderRadius}px;
  ${config.showBorder ? `border: ${borderString};\n  ` : ''}padding: 24px;
}

/* HTML Structure */
<div class="glass-card">
${getTemplateContentHtml()}
</div>`;

  const tailwindCode = `<!-- Tailwind Glass Card -->
<div class="w-[${config.width}px]${config.minHeight > 0 ? ` min-h-[${config.minHeight}px]` : ''} bg-[${config.tintColor}]/${Math.round(config.transparency * 100)} backdrop-blur-[${config.blur}px] backdrop-saturate-[${config.saturation}%] rounded-[${config.borderRadius}px]${config.showBorder ? ' border border-white/20' : ''} p-6 flex flex-col items-center text-center">
${getTemplateContentHtml()}
</div>`;

  const reactCode = `// React Glass Card Component
const GlassCard = () => (
  <div style={{
    width: '${config.width}px',
    ${minHeightStyleJs ? minHeightStyleJs + '\n    ' : ''}background: '${bgString}',
    backdropFilter: 'blur(${config.blur}px) saturate(${config.saturation}%)',
    WebkitBackdropFilter: 'blur(${config.blur}px) saturate(${config.saturation}%)',
    borderRadius: '${config.borderRadius}px',
    ${config.showBorder ? `border: '${borderString}',\n    ` : ''}padding: '24px',
  }}>
    {/* Template: ${config.template} */}
    {/* Add your content here */}
  </div>
);`;

  const inlineCode = `<!-- Inline HTML Glass Card -->
<div style="width: ${config.width}px;${config.minHeight > 0 ? ` min-height: ${config.minHeight}px;` : ''} background: ${bgString}; backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%); -webkit-backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%); border-radius: ${config.borderRadius}px;${config.showBorder ? ` border: ${borderString};` : ''} padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center;">
${getTemplateContentHtml()}
</div>`;

  // handleCopy must be defined after cssCode
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    toast({ title: 'CSS copied!' });
  }, [cssCode, toast]);

  const shortcuts = useToolShortcuts({
    onRandomize: randomize,
    onReset: handleReset,
    onCopy: handleCopy,
  });

  return (
    <Layout>
      <ToolLayout
        title="Glass Architect"
        description="Generate stunning glassmorphism CSS effects with card templates and live preview"
        colorClass="text-glass"
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
            <div
              className="relative min-h-[600px] rounded-xl overflow-hidden border border-border"
              style={{ background: `linear-gradient(135deg, ${bgColor}, ${bgColor}88)` }}
            >
              {/* Decorative background */}
              <div className="absolute inset-0 bg-slate-950 z-0">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'linear-gradient(45deg, #334155 25%, transparent 25%), linear-gradient(-45deg, #334155 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #334155 75%), linear-gradient(-45deg, transparent 75%, #334155 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }} />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sky-600 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-600 rounded-full mix-blend-screen filter blur-[60px] opacity-50 animate-blob" style={{ animationDelay: '4s' }} />
              </div>

              {/* Glass card */}
              <div className="absolute inset-8 flex items-center justify-center z-10">
                <motion.div
                  style={glassStyle}
                  className="p-6 flex flex-col items-center text-center shadow-xl"
                  key={JSON.stringify(config)}
                  initial={{ opacity: 0.8, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderCardContent()}
                </motion.div>
              </div>
            </div>

            {/* Background color picker */}
            <div className="mt-4 flex items-center gap-4">
              <Label>Background</Label>
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 p-1 cursor-pointer"
              />
            </div>
          </motion.div>

          {/* Controls */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Config Header */}
            <div className="p-4 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Config</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={randomize}>
                    <Shuffle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Template Selection */}
              <div className="space-y-2 mb-4">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Card Template</Label>
                <Select value={config.template} onValueChange={(v) => setConfig({ ...config, template: v })}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Width (px)</Label>
                  <Input
                    type="number"
                    value={config.width}
                    onChange={(e) => setConfig({ ...config, width: parseInt(e.target.value) || 320 })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Min-Height (px)</Label>
                  <Input
                    type="number"
                    value={config.minHeight || ''}
                    placeholder="Auto"
                    onChange={(e) => setConfig({ ...config, minHeight: parseInt(e.target.value) || 0 })}
                    className="bg-background/50"
                  />
                </div>
              </div>
            </div>

            {/* Content & Media Section */}
            <div className="p-4 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                <Label className="text-sky-400 text-xs uppercase tracking-wider font-semibold">Content & Media</Label>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Title / Name</Label>
                  <Input
                    placeholder="Enter title..."
                    value={config.title}
                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Subtitle / Price / Job</Label>
                  <Input
                    placeholder="Enter subtitle..."
                    value={config.subtitle}
                    onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Button Text</Label>
                  <Input
                    placeholder="Enter button text..."
                    value={config.buttonText}
                    onChange={(e) => setConfig({ ...config, buttonText: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://..."
                      value={config.imageUrl}
                      onChange={(e) => setConfig({ ...config, imageUrl: e.target.value })}
                      className="bg-background/50 flex-grow"
                    />
                    <Button variant="outline" size="icon" onClick={() => setImage('user')} title="Avatar">
                      <User className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => setImage('product')} title="Product">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      title="Upload Image"
                      className="text-xs"
                    >
                      📤 Upload
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              setConfig({ ...config, imageUrl: event.target.result as string });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Effect Controls */}
            <div className="p-4 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-border space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <Label className="text-purple-400 text-xs uppercase tracking-wider font-semibold">Glass Effect</Label>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-muted-foreground text-sm">Blur</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.blur}
                      onChange={(e) => setConfig({ ...config, blur: Math.min(40, Math.max(0, parseInt(e.target.value) || 0)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="0"
                      max="40"
                    />
                    <span className="text-sm text-foreground font-medium">px</span>
                  </div>
                </div>
                <Slider
                  value={[config.blur]}
                  onValueChange={([v]) => setConfig({ ...config, blur: v })}
                  min={0}
                  max={40}
                  step={1}
                  className="[&_[role=slider]]:bg-sky-500"
                  aria-label="Blur strength"
                  data-testid="blur-slider"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-muted-foreground text-sm">Transparency</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={Math.round(config.transparency * 100)}
                      onChange={(e) => setConfig({ ...config, transparency: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) / 100 })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-foreground font-medium">%</span>
                  </div>
                </div>
                <Slider
                  value={[config.transparency * 100]}
                  onValueChange={([v]) => setConfig({ ...config, transparency: v / 100 })}
                  min={0}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-sky-500"
                  aria-label="Transparency level"
                  data-testid="transparency-slider"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-muted-foreground text-sm">Saturation</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.saturation}
                      onChange={(e) => setConfig({ ...config, saturation: Math.min(200, Math.max(100, parseInt(e.target.value) || 100)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="100"
                      max="200"
                    />
                    <span className="text-sm text-foreground font-medium">%</span>
                  </div>
                </div>
                <Slider
                  value={[config.saturation]}
                  onValueChange={([v]) => setConfig({ ...config, saturation: v })}
                  min={100}
                  max={200}
                  step={5}
                  className="[&_[role=slider]]:bg-sky-500"
                  aria-label="Saturation level"
                  data-testid="saturation-slider"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-muted-foreground text-sm">Border Radius</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={config.borderRadius}
                      onChange={(e) => setConfig({ ...config, borderRadius: Math.min(50, Math.max(0, parseInt(e.target.value) || 0)) })}
                      className="w-16 h-6 text-xs text-right bg-background/50"
                      min="0"
                      max="50"
                    />
                    <span className="text-sm text-foreground font-medium">px</span>
                  </div>
                </div>
                <Slider
                  value={[config.borderRadius]}
                  onValueChange={([v]) => setConfig({ ...config, borderRadius: v })}
                  min={0}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:bg-sky-500"
                  aria-label="Border radius"
                  data-testid="radius-slider"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Tint Color</Label>
                  <Input type="color" value={config.tintColor} onChange={(e) => setConfig({ ...config, tintColor: e.target.value })} className="h-10 p-1 cursor-pointer bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Border Color</Label>
                  <Input type="color" value={config.borderColor} onChange={(e) => setConfig({ ...config, borderColor: e.target.value })} className="h-10 p-1 cursor-pointer bg-background/50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Quick Tint Presets</Label>
                <div className="grid grid-cols-6 gap-1">
                  <button onClick={() => setConfig({ ...config, tintColor: '#ffffff' })} className="w-full h-8 rounded border-2 border-white/20 hover:border-white/60" style={{ background: '#ffffff' }} title="Frosted White"></button>
                  <button onClick={() => setConfig({ ...config, tintColor: '#0ea5e9' })} className="w-full h-8 rounded border-2 border-white/20 hover:border-white/60" style={{ background: '#0ea5e9' }} title="Sky Blue"></button>
                  <button onClick={() => setConfig({ ...config, tintColor: '#a855f7' })} className="w-full h-8 rounded border-2 border-white/20 hover:border-white/60" style={{ background: '#a855f7' }} title="Purple"></button>
                  <button onClick={() => setConfig({ ...config, tintColor: '#ec4899' })} className="w-full h-8 rounded border-2 border-white/20 hover:border-white/60" style={{ background: '#ec4899' }} title="Pink"></button>
                  <button onClick={() => setConfig({ ...config, tintColor: '#f97316' })} className="w-full h-8 rounded border-2 border-white/20 hover:border-white/60" style={{ background: '#f97316' }} title="Orange"></button>
                  <button onClick={() => setConfig({ ...config, tintColor: '#22c55e' })} className="w-full h-8 rounded border-2 border-white/20 hover:border-white/60" style={{ background: '#22c55e' }} title="Green"></button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Button Background Color</Label>
                <Input type="color" value={config.buttonBgColor} onChange={(e) => setConfig({ ...config, buttonBgColor: e.target.value })} className="h-10 p-1 cursor-pointer bg-background/50" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Label className="text-muted-foreground text-sm">Show Border</Label>
                <Switch checked={config.showBorder} onCheckedChange={(v) => setConfig({ ...config, showBorder: v })} />
              </div>
            </div>

            {/* Export */}
            <div className="p-4 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-border">
              <Tabs defaultValue="css">
                <TabsList className="mb-4 w-full grid grid-cols-4">
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                  <TabsTrigger value="react">React</TabsTrigger>
                  <TabsTrigger value="inline">Inline</TabsTrigger>
                </TabsList>
                <TabsContent value="css">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-background/50 text-sm overflow-x-auto max-h-64 text-muted-foreground"><code>{cssCode}</code></pre>
                    <div className="absolute top-2 right-2"><ExportButton code={cssCode} /></div>
                  </div>
                </TabsContent>
                <TabsContent value="tailwind">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-background/50 text-sm overflow-x-auto max-h-64 text-muted-foreground"><code>{tailwindCode}</code></pre>
                    <div className="absolute top-2 right-2"><ExportButton code={tailwindCode} /></div>
                  </div>
                </TabsContent>
                <TabsContent value="react">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-background/50 text-sm overflow-x-auto max-h-64 text-muted-foreground"><code>{reactCode}</code></pre>
                    <div className="absolute top-2 right-2"><ExportButton code={reactCode} /></div>
                  </div>
                </TabsContent>
                <TabsContent value="inline">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-background/50 text-sm overflow-x-auto max-h-64 text-muted-foreground"><code>{inlineCode}</code></pre>
                    <div className="absolute top-2 right-2"><ExportButton code={inlineCode} /></div>
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

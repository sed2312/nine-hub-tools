import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ExportButton } from '@/components/tools/ExportButton';
import { KeyboardHints } from '@/components/tools/KeyboardHints';
import { PresetManager } from '@/components/tools/PresetManager';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Check, Image, RotateCcw } from 'lucide-react';
import { useToolShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { usePresets } from '@/hooks/use-presets';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo/SEOHead';
import { RelatedTools } from '@/components/tools/RelatedTools';


interface MetaConfig {
  title: string;
  description: string;
  keywords: string;
  author: string;
  image: string;
  url: string;
  socialHandle: string;
  socialPlatform: string;
}

const defaultConfig: MetaConfig = {
  title: 'My Awesome Website',
  description: 'A fantastic website that does amazing things for users around the world.',
  keywords: 'web, development, tools',
  author: 'Your Name',
  image: 'https://example.com/og-image.png',
  url: 'https://example.com',
  socialHandle: '@yourhandle',
  socialPlatform: 'twitter',
};

const platforms = [
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
];

export default function MetaTool() {
  const [config, setConfig] = useState<MetaConfig>(defaultConfig);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Meta Tag Generator', href: '/meta' },
  ];

  const relatedTools = [
    {
      name: 'AI Prompt Helper',
      path: '/prompt',
      description: 'Optimize AI prompts for better results',
      icon: '🤖'
    },
    {
      name: 'Contrast Checker',
      path: '/contrast',
      description: 'Check color contrast for accessibility',
      icon: '👁️'
    },
    {
      name: 'Information Architecture',
      path: '/sitemap',
      description: 'Visualize site structure',
      icon: '🗺️'
    }
  ];

  const { toast } = useToast();

  const { presets, savePreset, deletePreset, getShareableUrl, loadFromUrl } = usePresets('meta', config);

  // Load preset from URL on mount
  useEffect(() => {
    const urlPreset = loadFromUrl();
    if (urlPreset) {
      setConfig(urlPreset);
      toast({ title: 'Preset loaded from URL' });
    }
  }, []);

  const titleLength = config.title.length;
  const descLength = config.description.length;
  const titleOk = titleLength <= 60 && titleLength > 0;
  const descOk = descLength <= 160 && descLength > 0;

  const reset = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(metaCode);
    toast({ title: 'Meta tags copied to clipboard' });
  }, [config]);

  const shortcuts = useToolShortcuts({
    onCopy: copyCode,
    onReset: reset,
  });

  const setExampleImage = () => {
    setConfig({ ...config, image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80' });
  };

  const getSocialTag = () => {
    if (!config.socialHandle) return '';
    switch (config.socialPlatform) {
      case 'twitter':
        return `<meta name="twitter:creator" content="${config.socialHandle}">\n<meta name="twitter:site" content="${config.socialHandle}">`;
      case 'facebook':
        return `<meta property="article:publisher" content="${config.socialHandle}">`;
      case 'linkedin':
        return `<!-- LinkedIn: ${config.socialHandle} -->`;
      case 'instagram':
        return `<!-- Instagram: ${config.socialHandle} -->`;
      default:
        return '';
    }
  };

  const metaCode = useMemo(() => {
    const socialTag = getSocialTag();

    return `<!-- SEO -->
<title>${config.title}</title>
<meta name="title" content="${config.title}">
<meta name="description" content="${config.description}">
<meta name="keywords" content="${config.keywords}">
<meta name="author" content="${config.author}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${config.url}">
<meta property="og:title" content="${config.title}">
<meta property="og:description" content="${config.description}">
<meta property="og:image" content="${config.image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${config.url}">
<meta property="twitter:title" content="${config.title}">
<meta property="twitter:description" content="${config.description}">
<meta property="twitter:image" content="${config.image}">
${socialTag}

<!-- Canonical -->
<link rel="canonical" href="${config.url}">`;
  }, [config]);

  const getHostname = () => {
    try {
      const url = config.url.startsWith('http') ? config.url : `https://${config.url}`;
      return new URL(url).hostname.toUpperCase();
    } catch {
      return 'EXAMPLE.COM';
    }
  };

  return (
    <Layout>
      <SEOHead path="/meta" />
      <ToolLayout
        title="Meta Tags"
        description="SEO and Open Graph meta tag generator with live Google and social previews"
        colorClass="text-meta"
        breadcrumbs={breadcrumbs}
        relatedTools={<RelatedTools tools={relatedTools} />}
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Meta Information</h3>
              <div className="flex items-center gap-2">
                <PresetManager
                  presets={presets}
                  onSave={savePreset}
                  onLoad={setConfig}
                  onDelete={deletePreset}
                  onShare={getShareableUrl}
                />
                <Button variant="outline" size="sm" onClick={reset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Title</Label>
                  <span className={`text-xs flex items-center gap-1 ${titleOk ? 'text-green-500' : 'text-destructive'}`}>
                    {titleOk ? <Check className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    {titleLength}/60
                  </span>
                </div>
                <Input
                  value={config.title}
                  onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  placeholder="Page title"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Description</Label>
                  <span className={`text-xs flex items-center gap-1 ${descOk ? 'text-green-500' : 'text-destructive'}`}>
                    {descOk ? <Check className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    {descLength}/160
                  </span>
                </div>
                <Textarea
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  placeholder="Page description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Keywords</Label>
                <Input
                  value={config.keywords}
                  onChange={(e) => setConfig({ ...config, keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input
                    value={config.author}
                    onChange={(e) => setConfig({ ...config, author: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Site URL</Label>
                  <Input
                    value={config.url}
                    onChange={(e) => setConfig({ ...config, url: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>OG Image URL</Label>
                  <Button variant="ghost" size="sm" onClick={setExampleImage}>
                    <Image className="h-3 w-3 mr-1" />
                    Example
                  </Button>
                </div>
                <Input
                  value={config.image}
                  onChange={(e) => setConfig({ ...config, image: e.target.value })}
                  placeholder="https://example.com/og-image.png"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Social Handle</Label>
                  <Input
                    value={config.socialHandle}
                    onChange={(e) => setConfig({ ...config, socialHandle: e.target.value })}
                    placeholder="@handle or URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={config.socialPlatform} onValueChange={(v) => setConfig({ ...config, socialPlatform: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <KeyboardHints shortcuts={shortcuts} />
          </div>

          {/* Previews & Code */}
          <div className="space-y-6">
            <Tabs defaultValue="google">
              <TabsList className="mb-4">
                <TabsTrigger value="google">Google Preview</TabsTrigger>
                <TabsTrigger value="social">Social Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="google">
                <motion.div
                  className="p-4 rounded-lg bg-white text-black"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-sm text-green-700 truncate">{config.url || 'example.com'}</div>
                  <div className="text-xl text-blue-800 hover:underline cursor-pointer truncate">
                    {config.title || 'Page Title'}
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {config.description || 'Page description will appear here...'}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="social">
                <motion.div
                  className="rounded-lg overflow-hidden border border-border bg-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="aspect-video bg-secondary flex items-center justify-center text-muted-foreground text-sm"
                    style={{
                      backgroundImage: config.image ? `url(${config.image})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!config.image && '1200 × 630 OG Image'}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground uppercase truncate">
                      {getHostname()}
                    </div>
                    <div className="font-semibold truncate">{config.title || 'Page Title'}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {config.description || 'Page description...'}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>

            {/* Code Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Generated Meta Tags</Label>
                <ExportButton code={metaCode} testid="meta-export-button" />
              </div>
              <motion.pre
                className="p-4 rounded-lg bg-secondary text-xs overflow-auto max-h-72"
                key={metaCode.slice(0, 50)}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
              >
                <code>{metaCode}</code>
              </motion.pre>
            </div>
          </div>
        </div>
      </ToolLayout>
    </Layout>
  );
}
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ExportButton } from '@/components/tools/ExportButton';
import { KeyboardHints } from '@/components/tools/KeyboardHints';
import { PresetManager } from '@/components/tools/PresetManager';
import { usePresets } from '@/hooks/use-presets';
import { useToolShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  RotateCcw, Grid3x3, Smartphone, Tablet, Monitor, Eye, EyeOff,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical, AlignHorizontalSpaceAround,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal, AlignVerticalSpaceAround,
  Info, BarChart3, Copy, Image, Type
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { gridPresets, getAllCategories, getPresetsByCategory, type GridPreset } from '@/lib/grid-presets';
import { SEOHead } from '@/components/seo/SEOHead';
import { RelatedTools } from '@/components/tools/RelatedTools';


type AlignItems = 'start' | 'center' | 'end' | 'stretch';
type JustifyItems = 'start' | 'center' | 'end' | 'stretch';
type AlignContent = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
type JustifyContent = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
type Breakpoint = 'mobile' | 'tablet' | 'desktop';
type ContentType = 'none' | 'numbers' | 'text' | 'images';

interface GridItem {
  id: number;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

interface GridConfig {
  columns: number;
  rows: number;
  gap: number;
  rowGap: number;
  columnGap: number;
  rowHeight: number;
  autoFit: boolean;
  minColumnWidth: number;
  alignItems: AlignItems;
  justifyItems: JustifyItems;
  alignContent: AlignContent;
  justifyContent: JustifyContent;
  items: GridItem[];
}

const defaultConfig: GridConfig = {
  columns: 3,
  rows: 2,
  gap: 16,
  rowGap: 16,
  columnGap: 16,
  rowHeight: 0,
  autoFit: false,
  minColumnWidth: 200,
  alignItems: 'stretch',
  justifyItems: 'stretch',
  alignContent: 'start',
  justifyContent: 'start',
  items: [],
};

const breakpointSizes: Record<Breakpoint, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
};

const sampleImages = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
  'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400',
];

const sampleTexts = [
  'Featured Article',
  'Product Showcase',
  'Latest News',
  'Customer Story',
  'Special Offer',
];

export default function GridTool() {
  const [config, setConfig] = useState<GridConfig>(defaultConfig);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'CSS Grid', href: '/grid' },
  ];

  const relatedTools = [
    {
      name: 'Glassmorphism',
      path: '/glass',
      description: 'Create modern frosted glass UI effects',
      icon: '💎'
    },
    {
      name: 'Box Shadow',
      path: '/shadow',
      description: 'Create perfect CSS box shadows',
      icon: '🌚'
    },
    {
      name: 'Gradient Text',
      path: '/gradient-text',
      description: 'Create animated gradient text',
      icon: '🌈'
    }
  ];

  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');
  const [showGridLines, setShowGridLines] = useState(true);
  const [showNumbers, setShowNumbers] = useState(true);
  const [contentType, setContentType] = useState<ContentType>('numbers');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showStats, setShowStats] = useState(false);
  const [useUnifiedGap, setUseUnifiedGap] = useState(true);
  const { toast } = useToast();

  const { presets: savedPresets, savePreset, deletePreset, getShareableUrl, loadFromUrl } = usePresets('grid', config);

  useEffect(() => {
    const urlPreset = loadFromUrl();
    if (urlPreset) {
      setConfig(urlPreset);
      toast({ title: 'Preset loaded from URL' });
    }
  }, []);

  useEffect(() => {
    if (useUnifiedGap) {
      setConfig(prev => ({ ...prev, rowGap: prev.gap, columnGap: prev.gap }));
    }
  }, [config.gap, useUnifiedGap]);

  const categories = useMemo(() => getAllCategories(), []);
  const filteredPresets = useMemo(() => {
    if (selectedCategory === 'all') return gridPresets;
    return getPresetsByCategory(selectedCategory);
  }, [selectedCategory]);

  const totalCells = config.columns * config.rows;

  const handleReset = useCallback(() => {
    setConfig(defaultConfig);
    setSelectedCell(null);
    toast({ title: 'Reset to defaults' });
  }, [toast]);

  const handleCopy = useCallback(() => {
    const code = generateCSS();
    navigator.clipboard.writeText(code);
    toast({ title: 'CSS copied!' });
  }, [config]);

  const handleRandomize = useCallback(() => {
    setConfig({
      ...config,
      columns: Math.floor(Math.random() * 5) + 2,
      rows: Math.floor(Math.random() * 4) + 1,
      gap: Math.floor(Math.random() * 32) + 8,
      rowHeight: Math.random() > 0.5 ? 0 : Math.floor(Math.random() * 150) + 50,
    });
    toast({ title: 'Randomized!' });
  }, [config, toast]);

  const shortcuts = useToolShortcuts({
    onRandomize: handleRandomize,
    onReset: handleReset,
    onCopy: handleCopy,
  });

  const toggleCellSpan = (index: number) => {
    const row = Math.floor(index / config.columns);
    const col = index % config.columns;

    setConfig(prev => {
      const existingItem = prev.items.find(item =>
        item.columnStart === col + 1 && item.rowStart === row + 1
      );

      if (existingItem) {
        return {
          ...prev,
          items: prev.items.filter(item => item.id !== existingItem.id),
        };
      } else {
        const newItem: GridItem = {
          id: Date.now(),
          columnStart: col + 1,
          columnEnd: Math.min(col + 3, config.columns + 1),
          rowStart: row + 1,
          rowEnd: Math.min(row + 3, config.rows + 1),
        };
        return {
          ...prev,
          items: [...prev.items, newItem],
        };
      }
    });
  };

  const applyPreset = (preset: GridPreset) => {
    setConfig({
      columns: preset.columns,
      rows: preset.rows,
      gap: preset.gap,
      rowGap: preset.rowGap || preset.gap,
      columnGap: preset.columnGap || preset.gap,
      rowHeight: preset.rowHeight,
      autoFit: false,
      minColumnWidth: 200,
      alignItems: 'stretch',
      justifyItems: 'stretch',
      alignContent: 'start',
      justifyContent: 'start',
      items: preset.items || [],
    });
    toast({ title: `Applied "${preset.name}" preset` });
  };

  const getItemForCell = (index: number) => {
    const row = Math.floor(index / config.columns) + 1;
    const col = (index % config.columns) + 1;
    return config.items.find(item =>
      item.columnStart === col && item.rowStart === row
    );
  };

  const isCellCovered = (index: number) => {
    const row = Math.floor(index / config.columns) + 1;
    const col = (index % config.columns) + 1;
    return config.items.some(item =>
      col >= item.columnStart && col < item.columnEnd &&
      row >= item.rowStart && row < item.rowEnd &&
      !(col === item.columnStart && row === item.rowStart)
    );
  };

  const generateCSS = () => {
    const rowHeightValue = config.rowHeight === 0 ? '1fr' : `${config.rowHeight}px`;
    const columnValue = config.autoFit
      ? `auto-fit, minmax(${config.minColumnWidth}px, 1fr)`
      : `${config.columns}, 1fr`;

    let css = `display: grid;
`;
    css += `grid-template-columns: repeat(${columnValue});
`;
    css += `grid-template-rows: repeat(${config.rows}, ${rowHeightValue});
`;

    if (useUnifiedGap) {
      css += `gap: ${config.gap}px;
`;
    } else {
      css += `row-gap: ${config.rowGap}px;
`;
      css += `column-gap: ${config.columnGap}px;
`;
    }

    if (config.alignItems !== 'stretch') css += `align-items: ${config.alignItems};
`;
    if (config.justifyItems !== 'stretch') css += `justify-items: ${config.justifyItems};
`;
    if (config.alignContent !== 'start') css += `align-content: ${config.alignContent};
`;
    if (config.justifyContent !== 'start') css += `justify-content: ${config.justifyContent};
`;

    return css;
  };

  const generateElementorCode = () => {
    return `/* Elementor Container Settings */
/* Navigate to: Layout > Container */

Container Type: Grid

/* Grid Settings */
Columns: ${config.columns}
Rows: ${config.rows}

/* Column Width */
${config.autoFit ? `Auto-fit: ON
Min Column Width: ${config.minColumnWidth}px` : 'Column Width: 1fr (equal)'}

/* Row Height */
${config.rowHeight === 0 ? 'Row Height: auto' : `Row Height: ${config.rowHeight}px`}

/* Gap */
${useUnifiedGap ? `Gap: ${config.gap}px` : `Row Gap: ${config.rowGap}px
Column Gap: ${config.columnGap}px`}

/* Alignment */
Align Items: ${config.alignItems}
Justify Items: ${config.justifyItems}
Align Content: ${config.alignContent}
Justify Content: ${config.justifyContent}

/* Additional CSS (if needed) */
selector {
  ${generateCSS().split('\n').join('\n  ')}
}

${config.items.length > 0 ? `
/* Grid Item Positioning */
/* For items that span multiple cells: */
${config.items.map((item, idx) => `
Item ${idx + 1}:
  grid-column: ${item.columnStart} / ${item.columnEnd};
  grid-row: ${item.rowStart} / ${item.rowEnd};`).join('')}
` : ''}`;
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: config.autoFit
      ? `repeat(auto-fit, minmax(${config.minColumnWidth}px, 1fr))`
      : `repeat(${config.columns}, 1fr)`,
    gridTemplateRows: `repeat(${config.rows}, ${config.rowHeight === 0 ? '1fr' : `${config.rowHeight}px`})`,
    gap: useUnifiedGap ? `${config.gap}px` : undefined,
    rowGap: !useUnifiedGap ? `${config.rowGap}px` : undefined,
    columnGap: !useUnifiedGap ? `${config.columnGap}px` : undefined,
    alignItems: config.alignItems,
    justifyItems: config.justifyItems,
    alignContent: config.alignContent,
    justifyContent: config.justifyContent,
  };

  const renderCellContent = (index: number) => {
    switch (contentType) {
      case 'numbers':
        return index + 1;
      case 'text':
        return sampleTexts[index % sampleTexts.length];
      case 'images':
        return (
          <img
            src={sampleImages[index % sampleImages.length]}
            alt={`Cell ${index + 1}`}
            className="w-full h-full object-cover"
          />
        );
      default:
        return null;
    }
  };

  const stats = useMemo(() => ({
    totalCells,
    spannedItems: config.items.length,
    totalColumns: config.columns,
    totalRows: config.rows,
    gapSpace: useUnifiedGap ? config.gap * (config.columns - 1 + config.rows - 1) : config.rowGap * (config.rows - 1) + config.columnGap * (config.columns - 1),
  }), [config, useUnifiedGap, totalCells]);

  const elementorCode = generateElementorCode();

  return (
    <Layout>
      <SEOHead path="/grid" />
      <ToolLayout
        title="Grid Architect"
        description="Professional CSS Grid designer with spanning, alignment, responsive preview, Elementor export, and 25+ presets"
        colorClass="text-grid"
        breadcrumbs={breadcrumbs}
        relatedTools={<RelatedTools tools={relatedTools} />}
        headerActions={
          <>
            <KeyboardHints shortcuts={shortcuts} />
            <Button variant="outline" size="sm" onClick={() => setShowStats(!showStats)}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Stats
            </Button>
            <PresetManager
              presets={savedPresets}
              onSave={savePreset}
              onLoad={(data) => setConfig(data)}
              onDelete={deletePreset}
              onShare={getShareableUrl}
            />
          </>
        }
      >
        <div className="space-y-8">
          {/* Stats Panel */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Cells</p>
                      <p className="text-2xl font-bold text-grid">{stats.totalCells}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Columns</p>
                      <p className="text-2xl font-bold">{stats.totalColumns}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rows</p>
                      <p className="text-2xl font-bold">{stats.totalRows}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Spanning Items</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.spannedItems}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gap Space</p>
                      <p className="text-2xl font-bold text-orange-600">{stats.gapSpace}px</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-secondary/50 rounded-lg">
            {/* Breakpoint Selector */}
            <div className="flex items-center gap-2">
              <Label className="text-sm">View:</Label>
              <div className="flex gap-1">
                <Button
                  variant={breakpoint === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBreakpoint('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
                <Button
                  variant={breakpoint === 'tablet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBreakpoint('tablet')}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={breakpoint === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBreakpoint('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content Type */}
            <div className="flex items-center gap-2">
              <Label className="text-sm">Content:</Label>
              <Select value={contentType} onValueChange={(v: ContentType) => setContentType(v)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="numbers">Numbers</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="images">Images</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Visualization */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={showGridLines} onCheckedChange={setShowGridLines} />
                <Label className="text-sm">Grid Lines</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={showNumbers} onCheckedChange={setShowNumbers} />
                <Label className="text-sm">Numbers</Label>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            {/* Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Preview</h3>
                <Badge variant="outline">{breakpoint}</Badge>
              </div>
              <motion.div
                className="p-6 rounded-xl bg-secondary/50 border border-border overflow-auto"
                style={{ maxWidth: breakpointSizes[breakpoint] }}
                layout
              >
                <div
                  style={gridStyle}
                  className={cn(
                    'min-h-[400px] relative',
                    showGridLines && 'outline outline-2 outline-grid/30'
                  )}
                >
                  {Array.from({ length: totalCells }).map((_, i) => {
                    if (isCellCovered(i)) return null;

                    const item = getItemForCell(i);
                    const isSpanning = !!item;

                    const cellStyle = item ? {
                      gridColumn: `${item.columnStart} / ${item.columnEnd}`,
                      gridRow: `${item.rowStart} / ${item.rowEnd}`,
                    } : {};

                    return (
                      <motion.div
                        key={i}
                        style={cellStyle}
                        className={cn(
                          'flex items-center justify-center rounded-lg cursor-pointer transition-all min-h-[60px] relative',
                          isSpanning ? 'bg-grid/30 border-2 border-grid' : 'bg-grid/20 border border-grid/30',
                          selectedCell === i && 'ring-2 ring-grid',
                          showGridLines && 'outline outline-1 outline-grid/20'
                        )}
                        onClick={() => {
                          setSelectedCell(i);
                          toggleCellSpan(i);
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02, duration: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {showNumbers && (
                          <span className="absolute top-1 left-2 text-xs font-mono text-grid/60">
                            {i + 1}
                          </span>
                        )}
                        <div className="text-grid font-medium text-center p-2">
                          {renderCellContent(i)}
                        </div>
                        {isSpanning && (
                          <Badge className="absolute top-1 right-1 text-[10px]" variant="secondary">
                            Span
                          </Badge>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
              <p className="text-xs text-muted-foreground text-center">
                💡 Click any cell to make it span 2×2 (or remove spanning)
              </p>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <h3 className="font-semibold">Controls</h3>

              {/* Grid Dimensions */}
              <Card className="p-4 space-y-4">
                <h4 className="font-medium text-sm">Grid Dimensions</h4>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm">Columns</Label>
                    <span className="text-sm text-muted-foreground">{config.columns}</span>
                  </div>
                  <Slider
                    value={[config.columns]}
                    onValueChange={([v]) => setConfig({ ...config, columns: v })}
                    min={1}
                    max={12}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm">Rows</Label>
                    <span className="text-sm text-muted-foreground">{config.rows}</span>
                  </div>
                  <Slider
                    value={[config.rows]}
                    onValueChange={([v]) => setConfig({ ...config, rows: v })}
                    min={1}
                    max={12}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm">Row Height</Label>
                    <span className="text-sm text-muted-foreground">
                      {config.rowHeight === 0 ? 'Auto' : `${config.rowHeight}px`}
                    </span>
                  </div>
                  <Slider
                    value={[config.rowHeight]}
                    onValueChange={([v]) => setConfig({ ...config, rowHeight: v })}
                    min={0}
                    max={200}
                    step={10}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    checked={config.autoFit}
                    onCheckedChange={(checked) => setConfig({ ...config, autoFit: checked })}
                  />
                  <Label className="text-sm">Auto-fit columns</Label>
                </div>

                {config.autoFit && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm">Min Column Width</Label>
                      <span className="text-sm text-muted-foreground">{config.minColumnWidth}px</span>
                    </div>
                    <Slider
                      value={[config.minColumnWidth]}
                      onValueChange={([v]) => setConfig({ ...config, minColumnWidth: v })}
                      min={100}
                      max={400}
                      step={50}
                    />
                  </div>
                )}
              </Card>

              {/* Gap Controls */}
              <Card className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Gap</h4>
                  <div className="flex items-center gap-2">
                    <Switch checked={useUnifiedGap} onCheckedChange={setUseUnifiedGap} />
                    <Label className="text-xs">Unified</Label>
                  </div>
                </div>

                {useUnifiedGap ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm">Gap</Label>
                      <span className="text-sm text-muted-foreground">{config.gap}px</span>
                    </div>
                    <Slider
                      value={[config.gap]}
                      onValueChange={([v]) => setConfig({ ...config, gap: v })}
                      min={0}
                      max={48}
                      step={4}
                    />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-sm">Row Gap</Label>
                        <span className="text-sm text-muted-foreground">{config.rowGap}px</span>
                      </div>
                      <Slider
                        value={[config.rowGap]}
                        onValueChange={([v]) => setConfig({ ...config, rowGap: v })}
                        min={0}
                        max={48}
                        step={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-sm">Column Gap</Label>
                        <span className="text-sm text-muted-foreground">{config.columnGap}px</span>
                      </div>
                      <Slider
                        value={[config.columnGap]}
                        onValueChange={([v]) => setConfig({ ...config, columnGap: v })}
                        min={0}
                        max={48}
                        step={4}
                      />
                    </div>
                  </>
                )}
              </Card>

              {/* Alignment Controls */}
              <Card className="p-4 space-y-4">
                <h4 className="font-medium text-sm">Alignment</h4>

                <div className="space-y-2">
                  <Label className="text-sm">Align Items</Label>
                  <Select
                    value={config.alignItems}
                    onValueChange={(v: AlignItems) => setConfig({ ...config, alignItems: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">Start</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="end">End</SelectItem>
                      <SelectItem value="stretch">Stretch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Justify Items</Label>
                  <Select
                    value={config.justifyItems}
                    onValueChange={(v: JustifyItems) => setConfig({ ...config, justifyItems: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">Start</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="end">End</SelectItem>
                      <SelectItem value="stretch">Stretch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              {/* Professional Presets */}
              <Card className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Professional Presets</h4>
                  <Badge variant="secondary">{filteredPresets.length}</Badge>
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Presets ({gridPresets.length})</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label} ({cat.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                  {filteredPresets.map(preset => (
                    <Button
                      key={preset.id}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(preset)}
                      className="text-xs h-auto py-3 flex flex-col items-start gap-1"
                    >
                      <span className="font-semibold">{preset.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {preset.columns}×{preset.rows}
                      </span>
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Export */}
          <Card className="p-6">
            <Tabs defaultValue="css">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                  <TabsTrigger value="react">React</TabsTrigger>
                  <TabsTrigger value="scss">SCSS</TabsTrigger>
                  <TabsTrigger value="elementor">Elementor</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="css">
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-[300px]">
                    <code>{generateCSS()}</code>
                  </pre>
                  <div className="absolute top-2 right-2">
                    <ExportButton code={generateCSS()} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tailwind">
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-[300px]">
                    <code>{`<div class="grid grid-cols-${config.columns} grid-rows-${config.rows} gap-${config.gap / 4}">
  <!-- Grid items -->
</div>`}</code>
                  </pre>
                  <div className="absolute top-2 right-2">
                    <ExportButton code={`grid grid-cols-${config.columns} grid-rows-${config.rows} gap-${config.gap / 4}`} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="react">
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-[300px]">
                    <code>{`const gridStyle = {
${generateCSS().split('\n').map(line => '  ' + line).join('\n')}};

<div style={gridStyle}>
  {items.map((item, i) => <div key={i}>{item}</div>)}
</div>`}</code>
                  </pre>
                  <div className="absolute top-2 right-2">
                    <ExportButton code={`const gridStyle = {\n${generateCSS().split('\n').map(line => '  ' + line).join('\n')}};`} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scss">
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto max-h-[300px]">
                    <code>{`.grid-container {
${generateCSS().split('\n').map(line => '  ' + line).join('\n')}}`}</code>
                  </pre>
                  <div className="absolute top-2 right-2">
                    <ExportButton code={`.grid-container {\n${generateCSS().split('\n').map(line => '  ' + line).join('\n')}}`} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="elementor">
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-secondary text-xs overflow-x-auto max-h-[400px] leading-relaxed">
                    <code>{elementorCode}</code>
                  </pre>
                  <div className="absolute top-2 right-2">
                    <ExportButton code={elementorCode} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </ToolLayout>
    </Layout>
  );
}

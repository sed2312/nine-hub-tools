import { useState, useMemo, useEffect, useCallback } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ExportButton } from '@/components/tools/ExportButton';
import { KeyboardHints } from '@/components/tools/KeyboardHints';
import { PresetManager } from '@/components/tools/PresetManager';
import { usePresets } from '@/hooks/use-presets';
import { useToolShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  RotateCcw, Wand2, Plus, X, BookOpen, AlertCircle,
  CheckCircle, Info, AlertTriangle, Sparkles, TrendingUp,
  Copy, Download, FileJson, Code, Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo/SEOHead';
import { RelatedTools } from '@/components/tools/RelatedTools';

import { promptTemplates, getAllCategories, getTemplateById } from '@/lib/prompt-templates';
import {
  analyzePromptQuality,
  getScoreColor,
  getRatingEmoji,
  estimateTokens,
  getTokenCost
} from '@/lib/prompt-quality';
import { cn } from '@/lib/utils';

const personas = [
  { value: 'generic', label: 'Generic', prefix: 'Act as a highly capable and intelligent AI assistant.' },
  { value: 'coder', label: 'Developer', prefix: 'Act as a Senior Software Architect. Prioritize clean, efficient, and scalable code. Follow SOLID principles.' },
  { value: 'writer', label: 'Copywriter', prefix: 'Act as a Best-Selling Copywriter. Use persuasive, engaging language with active voice.' },
  { value: 'analyst', label: 'Data Analyst', prefix: 'Act as a Lead Data Scientist. Focus on empirical evidence and statistical significance.' },
  { value: 'product', label: 'Product Manager', prefix: 'Act as a Senior Product Manager. Focus on user value and business viability.' },
  { value: 'seo', label: 'SEO Specialist', prefix: 'Act as a Technical SEO Specialist. Focus on search intent and keyword optimization.' },
  { value: 'designer', label: 'Designer', prefix: 'You are a creative UI/UX designer with expertise in modern design systems.' },
];

const tones = [
  { value: 'professional', label: 'Professional', instruction: 'Maintain a formal, objective, and corporate tone.' },
  { value: 'casual', label: 'Casual', instruction: 'Use a friendly, conversational tone.' },
  { value: 'direct', label: 'Direct', instruction: 'Be extremely concise. No filler words.' },
  { value: 'witty', label: 'Witty', instruction: 'Use a humorous, witty tone.' },
  { value: 'eli5', label: 'ELI5', instruction: 'Explain like I am 5 years old.' },
  { value: 'academic', label: 'Academic', instruction: 'Use rigorous academic language.' },
  { value: 'pirate', label: '🏴‍☠️ Pirate', instruction: 'Respond as a swashbuckling pirate would, with nautical expressions and "arrr"s.' },
];

const formats = [
  { value: 'markdown', label: 'Markdown', instruction: 'Format with Markdown.' },
  { value: 'step-by-step', label: 'Step-by-Step', instruction: 'Numbered step-by-step guide.' },
  { value: 'code', label: 'Code Only', instruction: 'Code block only.' },
  { value: 'json', label: 'JSON', instruction: 'Valid JSON output.' },
  { value: 'table', label: 'Table', instruction: 'Markdown table.' },
  { value: 'text', label: 'Plain Text', instruction: 'Plain text without formatting.' },
  { value: 'csv', label: 'CSV', instruction: 'Format data as CSV with headers.' },
];

const defaultState = {
  task: '',
  context: '',
  persona: 'generic',
  tone: 'professional',
  format: 'markdown',
  constraints: '',
  examples: [] as Array<{ input: string; output: string }>,
  useChainOfThought: false,
  variables: {} as Record<string, string>,
};

export default function PromptTool() {
  const [state, setState] = useState(defaultState);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Prompt Engineer', href: '/prompt' },
  ];

  const relatedTools = [
    {
      name: 'Meta Tags',
      path: '/meta',
      description: 'Generate SEO meta tags',
      icon: '🏷️'
    },
    {
      name: 'Contrast Checker',
      path: '/contrast',
      description: 'Check color contrast accessibility',
      icon: '👁️'
    },
    {
      name: 'Gradient Text',
      path: '/gradient-text',
      description: 'Create animated gradient text',
      icon: '🌈'
    }
  ];

  const [showTemplates, setShowTemplates] = useState(false);
  const [exportFormat, setExportFormat] = useState<'text' | 'json' | 'api'>('text');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { presets, savePreset, deletePreset, getShareableUrl, loadFromUrl } = usePresets('prompt', state);

  // Quality analysis
  const qualityAnalysis = useMemo(() => {
    return analyzePromptQuality(state);
  }, [state]);

  // Build optimized prompt
  const optimizedPrompt = useMemo(() => {
    if (!state.task.trim()) return '';

    const persona = personas.find(p => p.value === state.persona);
    const tone = tones.find(t => t.value === state.tone);
    const format = formats.find(f => f.value === state.format);

    let prompt = '### ROLE ###\n';
    prompt += persona?.prefix || '';
    prompt += '\n\n';

    if (state.context.trim()) {
      prompt += '### CONTEXT ###\n';
      prompt += state.context.trim();
      prompt += '\n\n';
    }

    // Add examples (few-shot learning)
    if (state.examples.length > 0) {
      const validExamples = state.examples.filter(ex => ex.input.trim() && ex.output.trim());
      if (validExamples.length > 0) {
        prompt += '### EXAMPLES ###\n';
        validExamples.forEach((ex, idx) => {
          prompt += `Example ${idx + 1}:\n`;
          prompt += `Input: ${ex.input}\n`;
          prompt += `Output: ${ex.output}\n\n`;
        });
      }
    }

    prompt += '### TASK ###\n';
    prompt += state.task.trim();
    prompt += '\n\n';

    prompt += '### CONSTRAINTS & STYLE ###\n';
    prompt += `- Tone: ${tone?.instruction || ''}\n`;
    prompt += `- Format: ${format?.instruction || ''}`;

    if (state.constraints.trim()) {
      prompt += `\n- Additional Constraints: ${state.constraints.trim()}`;
    }

    if (state.useChainOfThought) {
      prompt += '\n\n### REASONING ###\n';
      prompt += 'Think step-by-step before providing your answer. Show your reasoning process.';
    }

    return prompt;
  }, [state]);

  // Token and cost estimation
  const tokenInfo = useMemo(() => {
    const tokens = estimateTokens(optimizedPrompt);
    const costs = getTokenCost(tokens);
    return { tokens, costs };
  }, [optimizedPrompt]);

  // Load preset from URL on mount
  useEffect(() => {
    const urlPreset = loadFromUrl();
    if (urlPreset) {
      setState({ ...defaultState, ...urlPreset });
      toast({ title: 'Preset loaded from URL' });
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (optimizedPrompt) {
      let contentToCopy = optimizedPrompt;

      if (exportFormat === 'json') {
        contentToCopy = JSON.stringify({
          prompt: optimizedPrompt,
          metadata: {
            persona: state.persona,
            tone: state.tone,
            format: state.format,
            hasExamples: state.examples.length > 0,
            useChainOfThought: state.useChainOfThought,
          },
        }, null, 2);
      } else if (exportFormat === 'api') {
        contentToCopy = JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: personas.find(p => p.value === state.persona)?.prefix },
            { role: 'user', content: optimizedPrompt },
          ],
          temperature: 0.7,
        }, null, 2);
      }

      await navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: 'Copied to clipboard!',
        description: `Exported as ${exportFormat.toUpperCase()}`,
      });
    }
  }, [optimizedPrompt, exportFormat, state, toast]);

  // Download prompt as file
  const handleDownload = useCallback(() => {
    if (optimizedPrompt) {
      let content = optimizedPrompt;
      let filename = 'prompt.txt';
      let mimeType = 'text/plain';

      if (exportFormat === 'json') {
        content = JSON.stringify({
          prompt: optimizedPrompt,
          metadata: {
            persona: state.persona,
            tone: state.tone,
            format: state.format,
            hasExamples: state.examples.length > 0,
            useChainOfThought: state.useChainOfThought,
          },
        }, null, 2);
        filename = 'prompt.json';
        mimeType = 'application/json';
      } else if (exportFormat === 'api') {
        content = JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: personas.find(p => p.value === state.persona)?.prefix },
            { role: 'user', content: optimizedPrompt },
          ],
          temperature: 0.7,
        }, null, 2);
        filename = 'api-request.json';
        mimeType = 'application/json';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Downloaded!',
        description: `Saved as ${filename}`,
      });
    }
  }, [optimizedPrompt, exportFormat, state, toast]);

  const handleReset = useCallback(() => {
    setState(defaultState);
    toast({ title: 'Reset to defaults' });
  }, [toast]);

  const handleLoadTemplate = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      setState({
        task: template.task,
        context: template.context,
        persona: template.persona,
        tone: template.tone,
        format: template.format,
        constraints: template.constraints || '',
        examples: template.examples || [],
        useChainOfThought: false,
        variables: {},
      });
      setShowTemplates(false);
      toast({ title: `Loaded: ${template.name}` });
    }
  };

  const addExample = () => {
    setState({
      ...state,
      examples: [...state.examples, { input: '', output: '' }],
    });
  };

  const updateExample = (index: number, field: 'input' | 'output', value: string) => {
    const newExamples = [...state.examples];
    newExamples[index][field] = value;
    setState({ ...state, examples: newExamples });
  };

  const removeExample = (index: number) => {
    setState({
      ...state,
      examples: state.examples.filter((_, i) => i !== index),
    });
  };

  const shortcuts = useToolShortcuts({
    onCopy: handleCopy,
    onReset: handleReset,
  });

  return (
    <Layout>
      <SEOHead path="/prompt" />
      <ToolLayout
        title="Prompt Engineer"
        description="Professional AI prompt optimization with templates, quality analysis, and advanced features"
        colorClass="text-prompt"
        breadcrumbs={breadcrumbs}
        relatedTools={<RelatedTools tools={relatedTools} />}
        headerActions={
          <>
            <KeyboardHints shortcuts={shortcuts} />
            <Button variant="outline" size="sm" onClick={() => setShowTemplates(!showTemplates)}>
              <BookOpen className="h-4 w-4 mr-2" />
              Templates
            </Button>
            <PresetManager
              presets={presets}
              onSave={savePreset}
              onLoad={(data) => setState({ ...defaultState, ...data })}
              onDelete={deletePreset}
              onShare={getShareableUrl}
            />
          </>
        }
      >
        {/* Template Browser */}
        {showTemplates && (
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-prompt" />
                Template Library
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowTemplates(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All ({promptTemplates.length})</TabsTrigger>
                {getAllCategories().map(cat => (
                  <TabsTrigger key={cat.value} value={cat.value}>
                    {cat.label} ({cat.count})
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {promptTemplates.map(template => (
                  <div
                    key={template.id}
                    className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => handleLoadTemplate(template.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                      </div>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                  </div>
                ))}
              </TabsContent>

              {getAllCategories().map(cat => (
                <TabsContent key={cat.value} value={cat.value} className="space-y-3">
                  {promptTemplates
                    .filter(t => t.category === cat.value)
                    .map(template => (
                      <div
                        key={template.id}
                        className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => handleLoadTemplate(template.id)}
                      >
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                      </div>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Side */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-prompt" />
                Build Your Prompt
              </h3>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="space-y-4">
              {/* Core Task */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Core Task *
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </Label>
                <Textarea
                  placeholder="e.g. Write a Python script for web scraping that handles pagination and saves data to CSV..."
                  value={state.task}
                  onChange={(e) => setState({ ...state, task: e.target.value })}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Context */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Context / Background
                  <Badge variant="outline" className="text-xs">Optional</Badge>
                </Label>
                <Textarea
                  placeholder="e.g. This script is for a data analysis project. Target website is an e-commerce site with dynamic content..."
                  value={state.context}
                  onChange={(e) => setState({ ...state, context: e.target.value })}
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* Persona, Tone, Format */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Persona</Label>
                  <Select value={state.persona} onValueChange={(v) => setState({ ...state, persona: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {personas.map((p) => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={state.tone} onValueChange={(v) => setState({ ...state, tone: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Output</Label>
                  <Select value={state.format} onValueChange={(v) => setState({ ...state, format: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((f) => (
                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Constraints */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Constraints
                  <Badge variant="outline" className="text-xs">Optional</Badge>
                </Label>
                <Input
                  placeholder="e.g. Max 500 words, include code comments, use async/await..."
                  value={state.constraints}
                  onChange={(e) => setState({ ...state, constraints: e.target.value })}
                />
              </div>

              {/* Chain of Thought */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cot"
                  checked={state.useChainOfThought}
                  onCheckedChange={(checked) =>
                    setState({ ...state, useChainOfThought: checked as boolean })
                  }
                />
                <label
                  htmlFor="cot"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Enable Chain-of-Thought Reasoning
                </label>
              </div>

              {/* Examples Section */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    Examples (Few-Shot Learning)
                    <Badge variant="secondary" className="text-xs">Boost Quality</Badge>
                  </Label>
                  <Button variant="outline" size="sm" onClick={addExample}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Example
                  </Button>
                </div>

                {state.examples.map((example, idx) => (
                  <Card key={idx} className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Example {idx + 1}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExample(idx)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Input example..."
                        value={example.input}
                        onChange={(e) => updateExample(idx, 'input', e.target.value)}
                      />
                      <Input
                        placeholder="Expected output..."
                        value={example.output}
                        onChange={(e) => updateExample(idx, 'output', e.target.value)}
                      />
                    </div>
                  </Card>
                ))}

                {state.examples.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Add 1-3 examples to significantly improve output quality (few-shot learning)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Output Side */}
          <div className="space-y-4">
            {/* Quality Score */}
            {state.task.trim() && (
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Quality Score
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={cn('text-2xl font-bold', getScoreColor(qualityAnalysis.score))}>
                      {qualityAnalysis.score}
                    </span>
                    <span className="text-xl">{getRatingEmoji(qualityAnalysis.rating)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {qualityAnalysis.checks.map((check, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      {check.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                      {check.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                      {check.type === 'error' && <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />}
                      {check.type === 'info' && <Info className="h-4 w-4 text-blue-500 mt-0.5" />}
                      <div className="flex-1">
                        <p>{check.message}</p>
                        {check.suggestion && (
                          <p className="text-muted-foreground text-xs mt-1">{check.suggestion}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Optimized Prompt */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-prompt" />
                  Optimized Prompt
                </h3>

                {optimizedPrompt && (
                  <div className="flex items-center gap-2">
                    <Select value={exportFormat} onValueChange={(v: any) => setExportFormat(v)}>
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">
                          <div className="flex items-center gap-2">
                            <Copy className="h-3 w-3" />
                            Text
                          </div>
                        </SelectItem>
                        <SelectItem value="json">
                          <div className="flex items-center gap-2">
                            <FileJson className="h-3 w-3" />
                            JSON
                          </div>
                        </SelectItem>
                        <SelectItem value="api">
                          <div className="flex items-center gap-2">
                            <Code className="h-3 w-3" />
                            API
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                      <Button onClick={handleCopy} size="sm" variant="outline">
                        {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </Button>

                      <Button onClick={handleDownload} size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <pre className="p-4 rounded-lg bg-secondary text-sm whitespace-pre-wrap min-h-[400px] max-h-[600px] overflow-auto font-mono">
                  {optimizedPrompt || (
                    <span className="text-muted-foreground">
                      Start typing your task to generate an optimized prompt...
                    </span>
                  )}
                </pre>
              </div>

              {optimizedPrompt && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>{optimizedPrompt.length} characters</span>
                    <span>•</span>
                    <span>~{tokenInfo.tokens} tokens</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span>Cost:</span>
                    <Badge variant="outline">GPT-4: {tokenInfo.costs.gpt4}</Badge>
                    <Badge variant="outline">GPT-3.5: {tokenInfo.costs.gpt35}</Badge>
                    <Badge variant="outline">Claude: {tokenInfo.costs.claude}</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ToolLayout>
    </Layout>
  );
}

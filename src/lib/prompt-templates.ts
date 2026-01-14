// Prompt Templates Library for Prompt Engineer Tool

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  task: string;
  context: string;
  persona: string;
  tone: string;
  format: string;
  examples?: Array<{ input: string; output: string }>;
  constraints?: string;
}

export const promptTemplates: PromptTemplate[] = [
  // CODING TEMPLATES
  {
    id: 'code-review',
    name: 'Code Review',
    category: 'coding',
    description: 'Professional code review with best practices',
    task: 'Review the following code and provide detailed feedback on:\n- Code quality and readability\n- Potential bugs or security issues\n- Performance optimizations\n- Best practices and conventions',
    context: 'Focus on practical improvements that can be implemented immediately. Consider maintainability and scalability.',
    persona: 'coder',
    tone: 'professional',
    format: 'markdown',
    constraints: 'Limit response to top 5 most critical issues. Include code examples for suggested fixes.',
  },
  {
    id: 'debug-helper',
    name: 'Debug Assistant',
    category: 'coding',
    description: 'Step-by-step debugging guidance',
    task: 'Help me debug this error by:\n1. Explaining what the error means\n2. Identifying the root cause\n3. Providing a step-by-step fix\n4. Suggesting how to prevent it in the future',
    context: 'I am working on [describe your project/framework]. The error occurs when [describe scenario].',
    persona: 'coder',
    tone: 'direct',
    format: 'step-by-step',
    constraints: 'Keep explanations concise. Provide working code examples.',
  },
  {
    id: 'api-documentation',
    name: 'API Documentation',
    category: 'coding',
    description: 'Generate comprehensive API docs',
    task: 'Create complete API documentation including:\n- Endpoint description\n- HTTP method and URL\n- Request parameters (query, body, headers)\n- Response format with examples\n- Error codes and handling\n- Usage examples in curl and JavaScript',
    context: 'This API is for [describe purpose]. Target audience: [developers/integrators].',
    persona: 'coder',
    tone: 'professional',
    format: 'markdown',
    constraints: 'Use OpenAPI 3.0 style. Include authentication details.',
  },

  // WRITING TEMPLATES
  {
    id: 'blog-post-outline',
    name: 'Blog Post Outline',
    category: 'writing',
    description: 'SEO-optimized blog structure',
    task: 'Create a comprehensive blog post outline about [TOPIC] including:\n- Catchy title with primary keyword\n- Meta description (150-160 chars)\n- Introduction hook\n- 5-7 main sections with H2/H3 headings\n- Key points under each section\n- Conclusion with CTA\n- FAQ section (5 questions)',
    context: 'Target audience: [define audience]. Keyword: [main keyword]. Intent: [informational/commercial/transactional].',
    persona: 'writer',
    tone: 'professional',
    format: 'markdown',
    constraints: 'Optimize for featured snippets. Keep headings under 60 characters. Include LSI keywords.',
  },
  {
    id: 'marketing-copy',
    name: 'Marketing Copy',
    category: 'writing',
    description: 'Persuasive sales copy',
    task: 'Write compelling marketing copy for [PRODUCT/SERVICE] that:\n- Opens with a powerful hook\n- Highlights 3 key benefits (not features)\n- Addresses pain points\n- Includes social proof\n- Ends with a clear CTA',
    context: 'Product: [name]. Target customer: [persona]. Unique value proposition: [UVP]. Price point: [range].',
    persona: 'writer',
    tone: 'casual',
    format: 'markdown',
    constraints: 'Keep paragraphs under 3 lines. Use power words. AIDA framework.',
    examples: [
      {
        input: 'Fitness app for busy professionals',
        output: '"No time for the gym? Get fit in just 15 minutes a day..."',
      },
    ],
  },
  {
    id: 'email-sequence',
    name: 'Email Sequence',
    category: 'writing',
    description: 'Multi-email campaign',
    task: 'Create a 5-email nurture sequence for [GOAL]:\n- Email 1: Introduction + value proposition\n- Email 2: Educational content\n- Email 3: Social proof + testimonial\n- Email 4: Objection handling\n- Email 5: Strong CTA with urgency',
    context: 'Campaign goal: [conversion/engagement]. List segment: [describe audience]. Sending schedule: [frequency].',
    persona: 'writer',
    tone: 'casual',
    format: 'markdown',
    constraints: 'Each email: 150-200 words. Subject lines under 50 chars. One clear CTA per email.',
  },

  // ANALYSIS TEMPLATES
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'analysis',
    description: 'Structured data insights',
    task: 'Analyze this data and provide:\n- Summary statistics and key metrics\n- Notable patterns and trends\n- Anomalies or outliers\n- Correlations and relationships\n- Actionable insights and recommendations\n- Data visualization suggestions',
    context: 'Dataset: [describe data]. Business context: [explain use case]. Analysis goal: [objective].',
    persona: 'analyst',
    tone: 'professional',
    format: 'markdown',
    constraints: 'Support findings with numbers. Suggest 3-5 actionable next steps. Use statistical terms when appropriate.',
  },

  // BUSINESS TEMPLATES
  {
    id: 'product-requirements',
    name: 'Product Requirements',
    category: 'business',
    description: 'PRD document structure',
    task: 'Create a Product Requirements Document (PRD) for [FEATURE] including:\n- Problem statement\n- Target users and use cases\n- User stories (As a... I want... So that...)\n- Functional requirements\n- Non-functional requirements\n- Success metrics\n- Out of scope\n- Open questions',
    context: 'Product: [name]. Current state: [describe]. Target release: [timeline]. Stakeholders: [list].',
    persona: 'product',
    tone: 'professional',
    format: 'markdown',
    constraints: 'Be specific and measurable. Include acceptance criteria. Prioritize requirements (Must/Should/Could/Won\'t).',
  },
  {
    id: 'meeting-agenda',
    name: 'Meeting Agenda',
    category: 'business',
    description: 'Productive meeting structure',
    task: 'Create a meeting agenda for [MEETING PURPOSE] including:\n- Meeting objective (one sentence)\n- Date, time, duration\n- Attendees and roles\n- Pre-meeting prep (5 min)\n- Main topics with time allocations\n- Decision points\n- Action items template\n- Next steps',
    context: 'Meeting type: [standup/planning/review/brainstorm]. Team size: [number]. Meeting frequency: [one-time/recurring].',
    persona: 'product',
    tone: 'professional',
    format: 'markdown',
    constraints: 'Total meeting time: 30-60 minutes. Time-box each topic. Define clear outcomes.',
  },

  // EDUCATIONAL TEMPLATES
  {
    id: 'eli5-explainer',
    name: 'ELI5 Explainer',
    category: 'education',
    description: 'Simple explanations for complex topics',
    task: 'Explain [COMPLEX TOPIC] in a way a 5-year-old would understand:\n- Start with a simple analogy\n- Break down into 3-5 key concepts\n- Use everyday examples\n- Avoid jargon (or explain it simply)\n- End with "why this matters"',
    context: 'Topic: [technical concept]. Audience: complete beginners. Goal: build foundational understanding.',
    persona: 'generic',
    tone: 'eli5',
    format: 'markdown',
    constraints: 'Use short sentences. One concept per paragraph. Include fun analogies. Max 300 words.',
    examples: [
      {
        input: 'Blockchain technology',
        output: 'Imagine a special notebook that everyone in your class shares. When someone writes in it, everyone gets a copy...',
      },
    ],
  },
];

export const getTemplatesByCategory = (category: string) => {
  return promptTemplates.filter(t => t.category === category);
};

export const getTemplateById = (id: string) => {
  return promptTemplates.find(t => t.id === id);
};

export const getAllCategories = () => {
  const categories = [...new Set(promptTemplates.map(t => t.category))];
  return categories.map(cat => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: promptTemplates.filter(t => t.category === cat).length,
  }));
};

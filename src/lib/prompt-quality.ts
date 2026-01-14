// Prompt Quality Analyzer
// Provides real-time feedback on prompt quality

export interface QualityCheck {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  suggestion?: string;
}

export interface QualityScore {
  score: number; // 0-100
  checks: QualityCheck[];
  rating: 'poor' | 'fair' | 'good' | 'excellent';
}

export const analyzePromptQuality = (state: {
  task: string;
  context: string;
  persona: string;
  tone: string;
  format: string;
  examples?: Array<{ input: string; output: string }>;
  constraints?: string;
  useChainOfThought?: boolean;
}): QualityScore => {
  const checks: QualityCheck[] = [];
  let score = 0;

  // Check 1: Task length and specificity (20 points)
  if (!state.task.trim()) {
    checks.push({
      type: 'error',
      message: 'Task is required',
      suggestion: 'Describe what you want the AI to do',
    });
  } else if (state.task.length < 20) {
    checks.push({
      type: 'warning',
      message: 'Task is too vague',
      suggestion: 'Add more specific details about what you need',
    });
    score += 5;
  } else if (state.task.length > 500) {
    checks.push({
      type: 'warning',
      message: 'Task is very long',
      suggestion: 'Consider breaking it into smaller, focused prompts',
    });
    score += 15;
  } else {
    checks.push({
      type: 'success',
      message: 'Task length is appropriate',
    });
    score += 20;
  }

  // Check 2: Context provided (15 points)
  if (state.context.trim().length > 0) {
    if (state.context.length > 50) {
      checks.push({
        type: 'success',
        message: 'Good context provided',
      });
      score += 15;
    } else {
      checks.push({
        type: 'info',
        message: 'Context is brief',
        suggestion: 'Add more background information for better results',
      });
      score += 10;
    }
  } else {
    checks.push({
      type: 'info',
      message: 'No context provided',
      suggestion: 'Adding context helps the AI understand your needs better',
    });
  }

  // Check 3: Specific action verbs (10 points)
  const actionVerbs = [
    'write', 'create', 'generate', 'analyze', 'explain', 'compare', 
    'summarize', 'translate', 'optimize', 'refactor', 'debug', 'review',
    'design', 'build', 'implement', 'test', 'document', 'evaluate'
  ];
  const hasActionVerb = actionVerbs.some(verb => 
    state.task.toLowerCase().includes(verb)
  );
  
  if (hasActionVerb) {
    checks.push({
      type: 'success',
      message: 'Clear action verb found',
    });
    score += 10;
  } else {
    checks.push({
      type: 'warning',
      message: 'No clear action verb',
      suggestion: 'Start with a verb like "write", "create", "analyze", etc.',
    });
  }

  // Check 4: Constraints specified (15 points)
  if (state.constraints && state.constraints.trim().length > 0) {
    checks.push({
      type: 'success',
      message: 'Constraints defined',
    });
    score += 15;
  } else {
    checks.push({
      type: 'info',
      message: 'No constraints specified',
      suggestion: 'Add length limits, style requirements, or other constraints',
    });
  }

  // Check 5: Examples provided (20 points)
  if (state.examples && state.examples.length > 0) {
    const validExamples = state.examples.filter(
      ex => ex.input.trim() && ex.output.trim()
    );
    
    if (validExamples.length >= 2) {
      checks.push({
        type: 'success',
        message: `${validExamples.length} examples provided (excellent!)`,
      });
      score += 20;
    } else if (validExamples.length === 1) {
      checks.push({
        type: 'success',
        message: '1 example provided',
        suggestion: 'Add 1-2 more examples for better few-shot learning',
      });
      score += 15;
    }
  } else {
    checks.push({
      type: 'info',
      message: 'No examples provided',
      suggestion: 'Examples significantly improve output quality (few-shot learning)',
    });
  }

  // Check 6: Format selection (10 points)
  if (state.format !== 'markdown') {
    checks.push({
      type: 'success',
      message: 'Specific output format selected',
    });
    score += 10;
  } else {
    checks.push({
      type: 'info',
      message: 'Using default format',
    });
    score += 8;
  }

  // Check 7: Chain of thought for complex tasks (10 points)
  const isComplexTask = state.task.toLowerCase().includes('complex') ||
                        state.task.toLowerCase().includes('step') ||
                        state.task.toLowerCase().includes('analyze') ||
                        state.task.length > 200;
  
  if (isComplexTask) {
    if (state.useChainOfThought) {
      checks.push({
        type: 'success',
        message: 'Chain-of-thought enabled for complex task',
      });
      score += 10;
    } else {
      checks.push({
        type: 'info',
        message: 'Consider enabling chain-of-thought reasoning',
        suggestion: 'For complex tasks, reasoning steps improve accuracy',
      });
      score += 5;
    }
  } else {
    score += 10;
  }

  // Determine rating
  let rating: 'poor' | 'fair' | 'good' | 'excellent';
  if (score >= 85) rating = 'excellent';
  else if (score >= 70) rating = 'good';
  else if (score >= 50) rating = 'fair';
  else rating = 'poor';

  return { score, checks, rating };
};

export const getScoreColor = (score: number): string => {
  if (score >= 85) return 'text-green-500';
  if (score >= 70) return 'text-blue-500';
  if (score >= 50) return 'text-yellow-500';
  return 'text-red-500';
};

export const getRatingEmoji = (rating: string): string => {
  switch (rating) {
    case 'excellent': return '🚀';
    case 'good': return '👍';
    case 'fair': return '💡';
    case 'poor': return '⚠️';
    default: return '📝';
  }
};

// Approximate token counter (rough estimate)
export const estimateTokens = (text: string): number => {
  // GPT tokens are roughly 1 token per 4 characters (English)
  // This is a simplified estimate
  const words = text.split(/\s+/).length;
  const chars = text.length;
  
  // Average between word count * 1.3 and char count / 4
  return Math.round((words * 1.3 + chars / 4) / 2);
};

export const getTokenCost = (tokens: number): { gpt4: string; gpt35: string; claude: string } => {
  // Approximate costs (as of 2024)
  const gpt4Cost = (tokens / 1000) * 0.03; // $0.03 per 1K tokens
  const gpt35Cost = (tokens / 1000) * 0.002; // $0.002 per 1K tokens
  const claudeCost = (tokens / 1000) * 0.008; // $0.008 per 1K tokens
  
  return {
    gpt4: gpt4Cost < 0.01 ? '< $0.01' : `$${gpt4Cost.toFixed(3)}`,
    gpt35: gpt35Cost < 0.001 ? '< $0.001' : `$${gpt35Cost.toFixed(4)}`,
    claude: claudeCost < 0.01 ? '< $0.01' : `$${claudeCost.toFixed(3)}`,
  };
};

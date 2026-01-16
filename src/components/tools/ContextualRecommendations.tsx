import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Tool {
    name: string;
    path: string;
    description: string;
    icon: string;
}

interface WorkflowTip {
    title: string;
    description: string;
}

interface ContextualRecommendationsProps {
    toolName: string;
    relatedTools: Tool[];
    workflowTips?: WorkflowTip[];
}

export function ContextualRecommendations({ toolName, relatedTools, workflowTips }: ContextualRecommendationsProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
            {/* Workflow Tips - Contextual help */}
            <div className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-4">Common Workflows</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                    Developers using <strong>{toolName}</strong> often combine it with:
                </p>

                <div className="space-y-4">
                    {relatedTools.map((tool, index) => (
                        <Link
                            key={index}
                            to={tool.path}
                            className="group block p-4 bg-secondary/20 hover:bg-secondary/40 rounded-lg border border-border/50 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">{tool.icon}</span>
                                <span className="font-semibold group-hover:text-primary transition-colors">{tool.name}</span>
                                <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {index === 0 ? `→ Combine with ${toolName} for better UI` : `→ Perfect companion tool`}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Use Cases - Educational Content */}
            <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Popular Use Cases</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Modern Dashboard UI
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            Create sleek admin panels by combining glassmorphism cards with subtle box shadows and responsive grid layouts.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-secondary rounded text-xs">Glassmorphism</span>
                            <span className="px-2 py-1 bg-secondary rounded text-xs">Shadows</span>
                            <span className="px-2 py-1 bg-secondary rounded text-xs">Grid</span>
                        </div>
                    </div>

                    <div className="p-5 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Landing Page Hero
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            Design high-impact hero sections using organic blob shapes, gradient text, and harmonious color palettes.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-secondary rounded text-xs">Blobs</span>
                            <span className="px-2 py-1 bg-secondary rounded text-xs">Gradients</span>
                            <span className="px-2 py-1 bg-secondary rounded text-xs">Palettes</span>
                        </div>
                    </div>
                </div>

                {workflowTips && workflowTips.length > 0 && (
                    <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <h4 className="font-semibold text-primary mb-2 text-sm uppercase tracking-wider">Pro Tip</h4>
                        <ul className="space-y-2">
                            {workflowTips.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{tip.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

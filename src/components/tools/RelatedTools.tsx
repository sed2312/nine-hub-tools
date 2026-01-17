import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { memo } from 'react';

interface Tool {
    name: string;
    path: string;
    description: string;
    icon: string;
}

interface RelatedToolsProps {
    tools: Tool[];
}

export const RelatedTools = memo(function RelatedTools({ tools }: RelatedToolsProps) {
    return (
        <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tools.map((tool) => (
                    <Link
                        key={tool.path}
                        to={tool.path}
                        className="p-4 rounded-lg border border-border hover:border-primary transition-colors group"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{tool.icon}</span>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {tool.description}
                                </p>
                                <span className="text-sm text-primary flex items-center gap-1">
                                    Try it <ArrowRight className="h-3 w-3" />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
});

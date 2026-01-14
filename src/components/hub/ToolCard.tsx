import { LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  colorClass: string;
}

export function ToolCard({ title, description, icon: Icon, path, colorClass }: ToolCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      ref={cardRef}
      to={path}
      onMouseMove={handleMouseMove}
      className="group relative block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
    >
      {/* Free Badge */}
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
        Free
      </div>

      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-lg bg-secondary mb-4`}>
          <Icon className={`h-6 w-6 ${colorClass}`} />
        </div>
        
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        
        <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Open tool
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

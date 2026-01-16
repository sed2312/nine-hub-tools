import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  colorClass: string;
  children: ReactNode;
  headerActions?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function ToolLayout({
  title,
  description,
  colorClass,
  children,
  headerActions,
  breadcrumbs
}: ToolLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen py-8"
    >
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <Button variant="ghost" size="sm" className="mb-4" onClick={() => window.location.href = '/'}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hub
          </Button>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className={`text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                {title}
              </h1>
              <p className="text-muted-foreground text-lg">{description}</p>
            </div>
            {headerActions && (
              <div className="flex gap-2">
                {headerActions}
              </div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

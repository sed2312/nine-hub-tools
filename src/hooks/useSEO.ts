import { useEffect } from 'react';
import { updateMetaTags, SEOMetadata, getToolMetadata } from '@/lib/seo';

/**
 * Custom hook for managing SEO meta tags in React components
 * @param metadata - SEO metadata object or tool key string
 * 
 * Usage:
 * - useSEO({ title: 'Custom Title', description: '...' })
 * - useSEO('glass') // Uses predefined tool metadata
 */
export const useSEO = (metadata: Partial<SEOMetadata> | string) => {
  useEffect(() => {
    const meta = typeof metadata === 'string' 
      ? getToolMetadata(metadata)
      : metadata;
    
    updateMetaTags(meta);
    
    // Cleanup: restore default meta tags when component unmounts
    return () => {
      updateMetaTags({});
    };
  }, [metadata]);
};

export default useSEO;

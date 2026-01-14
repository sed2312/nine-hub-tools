import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toolsConfig, getToolById } from '@/lib/toolsConfig';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  toolId?: string;
}

export const SEOHead = ({ title, description, keywords, ogImage, toolId }: SEOHeadProps) => {
  const location = useLocation();
  const baseUrl = 'https://nineproo.com';
  
  // Get tool config if toolId is provided
  const toolConfig = toolId ? getToolById(toolId) : null;
  
  // Use tool config or fallback to props
  const finalTitle = title || toolConfig?.name || 'Nine Hub Tools';
  const finalDescription = description || toolConfig?.metaDescription || 'Professional design and development tools for modern web creators. Generate CSS, check accessibility, create beautiful designs.';
  const finalKeywords = keywords || toolConfig?.keywords || ['web tools', 'design tools', 'css generator', 'developer tools'];
  const finalOgImage = ogImage || toolConfig?.ogImage || `${baseUrl}/og-image.png`;
  
  const fullTitle = `${finalTitle} | NineProo`;
  const canonicalUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords.join(', '));
    updateMetaTag('author', 'NineProo - PROOF');
    updateMetaTag('robots', 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', finalOgImage, true);
    updateMetaTag('og:site_name', 'NineProo', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalOgImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

  }, [fullTitle, finalDescription, finalKeywords, finalOgImage, canonicalUrl, location.pathname]);

  return null;
};

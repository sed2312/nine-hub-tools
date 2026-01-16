import { useLocation } from 'react-router-dom';
import { SEOHead } from './SEOHead';

/**
 * GlobalSEO component that automatically applies SEO tags based on current route
 * No need to add SEOHead to individual pages - this handles everything!
 */
export function GlobalSEO() {
    const location = useLocation();

    // Get current path
    const path = location.pathname;

    return <SEOHead path={path} />;
}

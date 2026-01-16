import { Helmet } from 'react-helmet-async';
import { seoConfig } from '@/config/seo';

interface SEOHeadProps {
    path: string;
}

export function SEOHead({ path }: SEOHeadProps) {
    const seo = seoConfig[path];

    if (!seo) return null;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords.join(', ')} />
            <link rel="canonical" href={seo.canonical} />

            {/* OpenGraph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={seo.canonical} />
            <meta property="og:image" content={seo.ogImage || 'https://nineproo.com/og-default.png'} />
            <meta property="og:site_name" content="Nine Hub Tools" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.ogImage || 'https://nineproo.com/og-default.png'} />
            <meta name="twitter:site" content="@nine_proo" />

            {/* Schema.org JSON-LD */}
            {seo.schema && (
                Array.isArray(seo.schema) ? (
                    // Multiple schemas
                    seo.schema.map((schema, index) => (
                        <script key={index} type="application/ld+json">
                            {JSON.stringify(schema)}
                        </script>
                    ))
                ) : (
                    // Single schema
                    <script type="application/ld+json">
                        {JSON.stringify(seo.schema)}
                    </script>
                )
            )}
        </Helmet>
    );
}

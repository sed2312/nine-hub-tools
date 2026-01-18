/**
 * Schema Markup Generation Utilities
 * Generates JSON-LD structured data for SEO optimization
 */

interface WebPageSchemaProps {
    name: string;
    description: string;
    url: string;
}

interface SoftwareApplicationSchemaProps {
    name: string;
    description: string;
    url: string;
    applicationCategory: string;
    features: string[];
}

interface HowToStep {
    name: string;
    text: string;
    url?: string;
}

interface HowToSchemaProps {
    name: string;
    description: string;
    steps: HowToStep[];
}

interface FAQItem {
    question: string;
    answer: string;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

export function generateWebPageSchema(props: WebPageSchemaProps) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: props.name,
        description: props.description,
        url: props.url,
        inLanguage: 'en-US',
        isPartOf: {
            '@type': 'WebSite',
            name: 'Nine Hub Tools',
            url: 'https://nineproo.com'
        }
    };
}

export function generateSoftwareApplicationSchema(props: SoftwareApplicationSchemaProps) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: props.name,
        description: props.description,
        url: props.url,
        applicationCategory: props.applicationCategory,
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
        },
        featureList: props.features,
        author: {
            '@type': 'Organization',
            name: 'Nine Hub Tools'
        }
    };
}

export function generateHowToSchema(props: HowToSchemaProps) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: props.name,
        description: props.description,
        step: props.steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
            url: step.url
        }))
    };
}

export function generateFAQPageSchema(faqs: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Nine Hub Tools',
        alternateName: 'NineProo',
        url: 'https://nineproo.com',
        logo: 'https://nineproo.com/logo.png',
        description: 'Free, open-source collection of 9 professional web design tools for developers',
        sameAs: [
            'https://github.com/nineproo'
        ]
    };
}

/**
 * Combines multiple schemas into a single JSON-LD script
 */
export function combineSchemas(...schemas: unknown[]) {
    return schemas;
}

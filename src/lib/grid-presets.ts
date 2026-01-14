// Professional Grid Layout Presets Library

export interface GridPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  columns: number;
  rows: number;
  gap: number;
  rowGap?: number;
  columnGap?: number;
  rowHeight: number;
  columnTemplate?: string;
  rowTemplate?: string;
  areas?: string[];
  items?: Array<{
    id: number;
    columnStart: number;
    columnEnd: number;
    rowStart: number;
    rowEnd: number;
    area?: string;
  }>;
}

export const gridPresets: GridPreset[] = [
  // DASHBOARD LAYOUTS
  {
    id: 'dashboard-classic',
    name: 'Classic Dashboard',
    category: 'dashboard',
    description: 'Header, sidebar, main content, and footer',
    columns: 4,
    rows: 4,
    gap: 16,
    rowHeight: 0,
    areas: [
      'header header header header',
      'sidebar main main main',
      'sidebar main main main',
      'footer footer footer footer',
    ],
  },
  {
    id: 'dashboard-analytics',
    name: 'Analytics Dashboard',
    category: 'dashboard',
    description: 'Multi-widget analytics layout',
    columns: 6,
    rows: 4,
    gap: 16,
    rowHeight: 100,
    items: [
      { id: 1, columnStart: 1, columnEnd: 4, rowStart: 1, rowEnd: 2 }, // Large KPI
      { id: 2, columnStart: 4, columnEnd: 7, rowStart: 1, rowEnd: 2 },
      { id: 3, columnStart: 1, columnEnd: 3, rowStart: 2, rowEnd: 4 }, // Chart
      { id: 4, columnStart: 3, columnEnd: 5, rowStart: 2, rowEnd: 4 },
      { id: 5, columnStart: 5, columnEnd: 7, rowStart: 2, rowEnd: 4 },
      { id: 6, columnStart: 1, columnEnd: 7, rowStart: 4, rowEnd: 5 }, // Footer
    ],
  },
  {
    id: 'dashboard-modern',
    name: 'Modern Dashboard',
    category: 'dashboard',
    description: 'Asymmetric modern layout',
    columns: 12,
    rows: 3,
    gap: 20,
    rowHeight: 120,
    items: [
      { id: 1, columnStart: 1, columnEnd: 9, rowStart: 1, rowEnd: 3 }, // Main chart
      { id: 2, columnStart: 9, columnEnd: 13, rowStart: 1, rowEnd: 2 },
      { id: 3, columnStart: 9, columnEnd: 13, rowStart: 2, rowEnd: 3 },
      { id: 4, columnStart: 1, columnEnd: 4, rowStart: 3, rowEnd: 4 },
      { id: 5, columnStart: 4, columnEnd: 7, rowStart: 3, rowEnd: 4 },
      { id: 6, columnStart: 7, columnEnd: 10, rowStart: 3, rowEnd: 4 },
      { id: 7, columnStart: 10, columnEnd: 13, rowStart: 3, rowEnd: 4 },
    ],
  },

  // BLOG & CONTENT LAYOUTS
  {
    id: 'blog-standard',
    name: 'Standard Blog',
    category: 'blog',
    description: 'Classic blog with sidebar',
    columns: 3,
    rows: 3,
    gap: 24,
    rowHeight: 0,
    areas: [
      'header header header',
      'content content sidebar',
      'footer footer footer',
    ],
  },
  {
    id: 'blog-magazine',
    name: 'Magazine Layout',
    category: 'blog',
    description: 'Featured post with grid articles',
    columns: 4,
    rows: 4,
    gap: 16,
    rowHeight: 120,
    items: [
      { id: 1, columnStart: 1, columnEnd: 3, rowStart: 1, rowEnd: 3 }, // Featured
      { id: 2, columnStart: 3, columnEnd: 5, rowStart: 1, rowEnd: 2 },
      { id: 3, columnStart: 3, columnEnd: 5, rowStart: 2, rowEnd: 3 },
      { id: 4, columnStart: 1, columnEnd: 2, rowStart: 3, rowEnd: 4 },
      { id: 5, columnStart: 2, columnEnd: 3, rowStart: 3, rowEnd: 4 },
      { id: 6, columnStart: 3, columnEnd: 4, rowStart: 3, rowEnd: 4 },
      { id: 7, columnStart: 4, columnEnd: 5, rowStart: 3, rowEnd: 4 },
    ],
  },
  {
    id: 'blog-masonry',
    name: 'Masonry Blog',
    category: 'blog',
    description: 'Pinterest-style masonry layout',
    columns: 4,
    rows: 6,
    gap: 12,
    rowHeight: 80,
    items: [
      { id: 1, columnStart: 1, columnEnd: 2, rowStart: 1, rowEnd: 3 },
      { id: 2, columnStart: 2, columnEnd: 3, rowStart: 1, rowEnd: 2 },
      { id: 3, columnStart: 3, columnEnd: 4, rowStart: 1, rowEnd: 4 },
      { id: 4, columnStart: 4, columnEnd: 5, rowStart: 1, rowEnd: 3 },
      { id: 5, columnStart: 1, columnEnd: 2, rowStart: 3, rowEnd: 5 },
      { id: 6, columnStart: 2, columnEnd: 3, rowStart: 2, rowEnd: 4 },
      { id: 7, columnStart: 4, columnEnd: 5, rowStart: 3, rowEnd: 5 },
    ],
  },

  // PORTFOLIO LAYOUTS
  {
    id: 'portfolio-grid',
    name: 'Portfolio Grid',
    category: 'portfolio',
    description: 'Equal-width portfolio grid',
    columns: 3,
    rows: 3,
    gap: 24,
    rowHeight: 0,
  },
  {
    id: 'portfolio-showcase',
    name: 'Portfolio Showcase',
    category: 'portfolio',
    description: 'Featured work showcase',
    columns: 4,
    rows: 3,
    gap: 20,
    rowHeight: 150,
    items: [
      { id: 1, columnStart: 1, columnEnd: 3, rowStart: 1, rowEnd: 3 }, // Hero
      { id: 2, columnStart: 3, columnEnd: 5, rowStart: 1, rowEnd: 2 },
      { id: 3, columnStart: 3, columnEnd: 5, rowStart: 2, rowEnd: 3 },
      { id: 4, columnStart: 1, columnEnd: 2, rowStart: 3, rowEnd: 4 },
      { id: 5, columnStart: 2, columnEnd: 3, rowStart: 3, rowEnd: 4 },
      { id: 6, columnStart: 3, columnEnd: 5, rowStart: 3, rowEnd: 4 },
    ],
  },
  {
    id: 'portfolio-asymmetric',
    name: 'Asymmetric Portfolio',
    category: 'portfolio',
    description: 'Creative asymmetric layout',
    columns: 6,
    rows: 3,
    gap: 16,
    rowHeight: 120,
    items: [
      { id: 1, columnStart: 1, columnEnd: 4, rowStart: 1, rowEnd: 3 },
      { id: 2, columnStart: 4, columnEnd: 7, rowStart: 1, rowEnd: 2 },
      { id: 3, columnStart: 4, columnEnd: 6, rowStart: 2, rowEnd: 3 },
      { id: 4, columnStart: 6, columnEnd: 7, rowStart: 2, rowEnd: 4 },
      { id: 5, columnStart: 1, columnEnd: 3, rowStart: 3, rowEnd: 4 },
      { id: 6, columnStart: 3, columnEnd: 5, rowStart: 3, rowEnd: 4 },
    ],
  },

  // E-COMMERCE LAYOUTS
  {
    id: 'ecommerce-product-grid',
    name: 'Product Grid',
    category: 'ecommerce',
    description: 'Standard product listing',
    columns: 4,
    rows: 3,
    gap: 20,
    rowHeight: 0,
  },
  {
    id: 'ecommerce-featured',
    name: 'Featured Products',
    category: 'ecommerce',
    description: 'Hero product with grid',
    columns: 4,
    rows: 3,
    gap: 16,
    rowHeight: 140,
    items: [
      { id: 1, columnStart: 1, columnEnd: 3, rowStart: 1, rowEnd: 3 }, // Featured
      { id: 2, columnStart: 3, columnEnd: 4, rowStart: 1, rowEnd: 2 },
      { id: 3, columnStart: 4, columnEnd: 5, rowStart: 1, rowEnd: 2 },
      { id: 4, columnStart: 3, columnEnd: 4, rowStart: 2, rowEnd: 3 },
      { id: 5, columnStart: 4, columnEnd: 5, rowStart: 2, rowEnd: 3 },
      { id: 6, columnStart: 1, columnEnd: 5, rowStart: 3, rowEnd: 4 }, // Banner
    ],
  },
  {
    id: 'ecommerce-checkout',
    name: 'Checkout Layout',
    category: 'ecommerce',
    description: 'Checkout form with summary',
    columns: 3,
    rows: 1,
    gap: 32,
    rowHeight: 0,
    columnTemplate: '2fr 1fr',
  },

  // LANDING PAGE LAYOUTS
  {
    id: 'landing-hero',
    name: 'Hero Section',
    category: 'landing',
    description: 'Classic hero with CTA',
    columns: 2,
    rows: 2,
    gap: 32,
    rowHeight: 200,
  },
  {
    id: 'landing-features',
    name: 'Feature Grid',
    category: 'landing',
    description: '3-column feature showcase',
    columns: 3,
    rows: 2,
    gap: 24,
    rowHeight: 0,
  },
  {
    id: 'landing-pricing',
    name: 'Pricing Cards',
    category: 'landing',
    description: 'Pricing tier comparison',
    columns: 3,
    rows: 1,
    gap: 20,
    rowHeight: 0,
  },
  {
    id: 'landing-testimonials',
    name: 'Testimonials Grid',
    category: 'landing',
    description: 'Customer testimonial layout',
    columns: 3,
    rows: 2,
    gap: 16,
    rowHeight: 120,
  },

  // APP LAYOUTS
  {
    id: 'app-sidebar',
    name: 'App with Sidebar',
    category: 'app',
    description: 'Sidebar navigation layout',
    columns: 5,
    rows: 1,
    gap: 0,
    rowHeight: 0,
    columnTemplate: '240px 1fr',
  },
  {
    id: 'app-split',
    name: 'Split View App',
    category: 'app',
    description: 'Master-detail split view',
    columns: 2,
    rows: 1,
    gap: 0,
    rowHeight: 0,
    columnTemplate: '1fr 2fr',
  },
  {
    id: 'app-admin',
    name: 'Admin Panel',
    category: 'app',
    description: 'Full admin dashboard',
    columns: 12,
    rows: 5,
    gap: 16,
    rowHeight: 80,
    areas: [
      'header header header header header header header header header header header header',
      'sidebar main main main main main main main main main main aside',
      'sidebar main main main main main main main main main main aside',
      'sidebar main main main main main main main main main main aside',
      'sidebar footer footer footer footer footer footer footer footer footer footer footer',
    ],
  },

  // RESPONSIVE LAYOUTS
  {
    id: 'responsive-mobile-first',
    name: 'Mobile First',
    category: 'responsive',
    description: 'Single column mobile layout',
    columns: 1,
    rows: 6,
    gap: 16,
    rowHeight: 0,
  },
  {
    id: 'responsive-tablet',
    name: 'Tablet Grid',
    category: 'responsive',
    description: '2-column tablet layout',
    columns: 2,
    rows: 4,
    gap: 20,
    rowHeight: 0,
  },
  {
    id: 'responsive-desktop',
    name: 'Desktop Grid',
    category: 'responsive',
    description: 'Full-width desktop layout',
    columns: 4,
    rows: 3,
    gap: 24,
    rowHeight: 0,
  },

  // CREATIVE LAYOUTS
  {
    id: 'creative-swiss',
    name: 'Swiss Grid',
    category: 'creative',
    description: 'Swiss design style grid',
    columns: 12,
    rows: 12,
    gap: 8,
    rowHeight: 40,
  },
  {
    id: 'creative-brutalist',
    name: 'Brutalist Layout',
    category: 'creative',
    description: 'Bold asymmetric design',
    columns: 6,
    rows: 5,
    gap: 4,
    rowHeight: 80,
    items: [
      { id: 1, columnStart: 1, columnEnd: 4, rowStart: 1, rowEnd: 4 },
      { id: 2, columnStart: 4, columnEnd: 7, rowStart: 1, rowEnd: 2 },
      { id: 3, columnStart: 4, columnEnd: 6, rowStart: 2, rowEnd: 4 },
      { id: 4, columnStart: 6, columnEnd: 7, rowStart: 2, rowEnd: 5 },
      { id: 5, columnStart: 1, columnEnd: 3, rowStart: 4, rowEnd: 6 },
      { id: 6, columnStart: 3, columnEnd: 5, rowStart: 4, rowEnd: 6 },
    ],
  },
];

export const getPresetsByCategory = (category: string) => {
  return gridPresets.filter(p => p.category === category);
};

export const getPresetById = (id: string) => {
  return gridPresets.find(p => p.id === id);
};

export const getAllCategories = () => {
  const categories = [...new Set(gridPresets.map(p => p.category))];
  return categories.map(cat => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: gridPresets.filter(p => p.category === cat).length,
  }));
};

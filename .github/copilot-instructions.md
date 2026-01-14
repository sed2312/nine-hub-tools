# Nine Hub Tools - AI Coding Guidelines

## Architecture Overview
- **Frontend**: React 18 + TypeScript SPA built with Vite
- **Styling**: Tailwind CSS + shadcn/ui components (Radix UI primitives)
- **Routing**: React Router v6 with individual tool pages under `/src/pages/tools/`
- **State Management**: TanStack Query for server state, React Context for themes/subscriptions
- **Backend**: Supabase for data persistence and auth
- **Build**: Vite with SWC, optimized chunks for vendor libraries

## Key Patterns & Conventions

### Tool Implementation
- Each tool gets a dedicated page in `src/pages/tools/` (e.g., `GlassTool.tsx`)
- Tools use `ToolLayout` component for consistent header/navigation
- Configuration defined in `src/lib/toolsConfig.ts` with metadata, SEO, and features
- SEO handled via `useSEO('toolId')` hook in component (metadata from `src/lib/seo.ts`)

### Component Organization
- `src/components/ui/` - shadcn/ui components (do not modify)
- `src/components/hub/` - homepage sections (Hero, ToolsGrid, etc.)
- `src/components/layout/` - Layout, Navbar, Footer
- `src/components/tools/` - shared tool components (ExportButton, PresetManager)
- `src/components/modals/` - modal dialogs

### Hooks & Utilities
- `usePresets(toolName, currentState)` - manages tool presets in localStorage (`nineproo-presets-${toolName}`)
- `useFavorites()` - manages favorited tools
- `useLocalStorage(key, defaultValue)` - typed localStorage wrapper
- Path alias: `@` resolves to `src/` (configured in `vite.config.ts`)

### Data Flow
- Tools are client-side only; no server-side rendering
- User preferences (favorites, presets) stored in localStorage
- Supabase used for future features (subscriptions, analytics)

## Development Workflow

### Local Development
```bash
npm run dev  # or bun dev - starts dev server on :5173
npm run build  # production build to dist/
npm run lint  # ESLint check
```

### Adding a New Tool
1. Add tool config to `src/lib/toolsConfig.ts`
2. Create tool page in `src/pages/tools/NewTool.tsx` using `ToolLayout`
3. Add route to `src/App.tsx` Routes
4. Add SEO metadata to `src/lib/seo.ts` toolsMetadata
5. Update homepage `ToolsGrid` if needed

### Deployment
- Build command: `npm run build` (outputs to `dist/`)
- Deploy script: `./deploy.sh` (pulls from git, builds, deploys to VPS)
- Nginx config: `nginx-spa.conf` for SPA routing and asset caching

## Code Quality
- TypeScript strict mode enabled
- ESLint with React/TypeScript rules
- Prettier for formatting (via VS Code)
- Component props typed with interfaces
- Custom hooks for reusable logic

## Common Patterns
- Framer Motion for animations (page transitions, hover effects)
- Lucide React icons throughout
- Responsive design with Tailwind breakpoints
- Dark/light theme support via `ThemeProvider`
- Toast notifications via `useToast()` hook
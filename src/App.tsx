import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CommandPalette } from "@/components/CommandPalette";
import { GlobalSEO } from "@/components/seo/GlobalSEO";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazy, Suspense } from "react";

// Eager load critical pages
import Index from "./pages/Index";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";

// Lazy load tool pages (reduces initial bundle size)
const GlassTool = lazy(() => import("./pages/tools/GlassTool"));
const PromptTool = lazy(() => import("./pages/tools/PromptTool"));
const PaletteTool = lazy(() => import("./pages/tools/PaletteTool"));
const GridTool = lazy(() => import("./pages/tools/GridTool"));
const GradientTextTool = lazy(() => import("./pages/tools/GradientTextTool"));
const ShadowTool = lazy(() => import("./pages/tools/ShadowTool"));
const BlobTool = lazy(() => import("./pages/tools/BlobTool"));
const ContrastTool = lazy(() => import("./pages/tools/ContrastTool"));
const MetaTool = lazy(() => import("./pages/tools/MetaTool"));

// Lazy load info/legal pages (rarely visited)
const ToolsOverview = lazy(() => import("./pages/ToolsOverview"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SubscriptionProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                  <GlobalSEO />
                  <CommandPalette />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="/glass" element={<GlassTool />} />
                      <Route path="/prompt" element={<PromptTool />} />
                      <Route path="/palette" element={<PaletteTool />} />
                      <Route path="/grid" element={<GridTool />} />
                      <Route path="/gradient-text" element={<GradientTextTool />} />
                      <Route path="/shadow" element={<ShadowTool />} />
                      <Route path="/blob" element={<BlobTool />} />
                      <Route path="/contrast" element={<ContrastTool />} />
                      <Route path="/meta" element={<MetaTool />} />
                      <Route path="/tools-overview" element={<ToolsOverview />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/sitemap" element={<Sitemap />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/terms-of-service" element={<TermsOfService />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/disclaimer" element={<Disclaimer />} />
                      <Route path="/cookie-policy" element={<CookiePolicy />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;

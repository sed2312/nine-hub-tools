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
import Index from "./pages/Index";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import GlassTool from "./pages/tools/GlassTool";
import PromptTool from "./pages/tools/PromptTool";
import PaletteTool from "./pages/tools/PaletteTool";
import GridTool from "./pages/tools/GridTool";
import GradientTextTool from "./pages/tools/GradientTextTool";
import ShadowTool from "./pages/tools/ShadowTool";
import BlobTool from "./pages/tools/BlobTool";
import ContrastTool from "./pages/tools/ContrastTool";
import MetaTool from "./pages/tools/MetaTool";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
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
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;

import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { ThemeController } from "@/components/ThemeController";


// Lazy loading das páginas
const LandingPage = lazy(() => import("./pages/LandingPage"));
const EbookPage = lazy(() => import("./pages/EbookPage"));
const TripwirePage = lazy(() => import("./pages/TripwirePage"));
const EspelhoAlmaPage = lazy(() => import("./pages/EspelhoAlmaPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-mystical-gradient">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
      <p className="text-yellow-400 font-['Arial_Black'] text-lg">Carregando experiência mística...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (renamed from cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/ebook" element={<EbookPage />} />
              <Route path="/tripwire" element={<TripwirePage />} />
              <Route path="/espelho-da-alma" element={<EspelhoAlmaPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          
          {/* Componentes PWA e Temas */}
          <PWAInstallPrompt />
          <ThemeController />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

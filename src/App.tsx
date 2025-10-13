import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { ThemeController } from "@/components/ThemeController";
import { LanguageBanner } from "@/components/LanguageBanner";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "@/i18n/config";


// Lazy loading das páginas
const LandingPage = lazy(() => import("./pages/LandingPage"));
const EbookPage = lazy(() => import("./pages/EbookPage"));
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

// Language route wrapper
const LanguageRoute = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
};

// Root redirect component
const RootRedirect = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || DEFAULT_LANGUAGE;
  return <Navigate to={`/${currentLang}/`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageBanner />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Root redirect */}
              <Route path="/" element={<RootRedirect />} />
              
              {/* Language routes */}
              <Route path="/:lang" element={<LanguageRoute><LandingPage /></LanguageRoute>} />
              <Route path="/:lang/ebook" element={<LanguageRoute><EbookPage /></LanguageRoute>} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          
          {/* Componentes de Temas */}
          <ThemeController />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

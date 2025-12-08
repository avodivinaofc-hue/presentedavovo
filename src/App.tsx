import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import "./i18n/config";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const EbookPage = lazy(() => import("./pages/EbookPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const RefundPage = lazy(() => import("./pages/RefundPage"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-primary text-xl">Loading...</div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const LanguageRoute = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && ['en', 'pt', 'es'].includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
};

const RootRedirect = () => {
  return <Navigate to="/en/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/:lang/" element={<LanguageRoute><LandingPage /></LanguageRoute>} />
              <Route path="/:lang/terms" element={<LanguageRoute><TermsPage /></LanguageRoute>} />
              <Route path="/:lang/privacy" element={<LanguageRoute><PrivacyPage /></LanguageRoute>} />
              <Route path="/:lang/refund" element={<LanguageRoute><RefundPage /></LanguageRoute>} />
              <Route path="/ebook" element={<EbookPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

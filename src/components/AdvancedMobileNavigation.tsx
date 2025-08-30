import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Zap, 
  Eye, 
  Menu,
  X,
  Settings,
  Download,
  Bell,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { usePWA } from '@/hooks/usePWA';

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { path: '/', label: 'Início', icon: <Home className="w-5 h-5" /> },
  { path: '/ebook', label: 'E-book', icon: <BookOpen className="w-5 h-5" /> },
  { path: '/tripwire', label: 'Oferta', icon: <Zap className="w-5 h-5" /> },
  { path: '/espelho-da-alma', label: 'Premium', icon: <Eye className="w-5 h-5" /> },
];

export const AdvancedMobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { preferences } = useTheme();
  const { canInstall, isInstalled, hasUpdate } = usePWA();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [showPullIndicator, setShowPullIndicator] = useState(false);
  
  const touchStartRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pull to refresh
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (location.pathname === '/') {
      touchStartRef.current = e.touches[0].clientY;
      touchStartYRef.current = e.touches[0].clientY;
    }
  }, [location.pathname]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (location.pathname === '/' && containerRef.current) {
      const touchY = e.touches[0].clientY;
      const distance = touchY - touchStartYRef.current;
      
      if (distance > 0 && window.scrollY === 0) {
        e.preventDefault();
        setPullDistance(Math.min(distance * 0.5, 100));
        setShowPullIndicator(true);
      }
    }
  }, [location.pathname]);

  const handleTouchEnd = useCallback(() => {
    if (pullDistance > 50) {
      // Trigger refresh
      setIsRefreshing(true);
      setPullDistance(0);
      setShowPullIndicator(false);
      
      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false);
        window.location.reload();
      }, 1000);
    } else {
      setPullDistance(0);
      setShowPullIndicator(false);
    }
  }, [pullDistance]);

  // Bottom navigation
  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  }, [navigate]);

  // Infinite scroll simulation
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreContent, setHasMoreContent] = useState(true);

  const loadMoreContent = useCallback(async () => {
    if (isLoadingMore || !hasMoreContent) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading more content
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoadingMore(false);
    // In a real app, you would load actual content here
  }, [isLoadingMore, hasMoreContent]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMoreContent) {
            loadMoreContent();
          }
        });
      },
      { threshold: 0.1 }
    );

    const sentinel = document.querySelector('.scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [loadMoreContent, hasMoreContent]);

  return (
    <>
      {/* Pull to Refresh Indicator */}
      <AnimatePresence>
        {showPullIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/90 text-primary-foreground rounded-full shadow-lg">
              <motion.div
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
                className="w-4 h-4"
              >
                🔄
              </motion.div>
              <span className="text-sm font-medium">
                {isRefreshing ? 'Atualizando...' : 'Puxe para atualizar'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            );
          })}
          
          {/* Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs font-medium">Menu</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h2 className="text-xl font-bold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 p-4 space-y-4">
                {/* PWA Options */}
                {canInstall && !isInstalled && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-primary/10 rounded-lg border border-primary/20"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold text-primary">Instalar App</h3>
                        <p className="text-sm text-muted-foreground">
                          Instale na tela inicial para acesso rápido
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {hasUpdate && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="w-6 h-6 text-yellow-500" />
                      <div>
                        <h3 className="font-semibold text-yellow-600">Nova versão</h3>
                        <p className="text-sm text-muted-foreground">
                          Atualize para obter as últimas melhorias
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick Actions */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Ações Rápidas
                  </h3>
                  
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/ebook');
                    }}
                  >
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>Ler E-book</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/espelho-da-alma');
                    }}
                  >
                    <Eye className="w-5 h-5 text-primary" />
                    <span>Acesso Premium</span>
                  </motion.button>
                </div>

                {/* Settings */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Configurações
                  </h3>
                  
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    <span>Personalizar</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span>Perfil</span>
                  </motion.button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/50">
                <div className="text-center text-sm text-muted-foreground">
                  <p>Avó Divina v1.0.0</p>
                  <p className="text-xs">Sua jornada mística começa aqui</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Sentinel for Infinite Scroll */}
      <div className="scroll-sentinel h-1" />

      {/* Loading Indicator for Infinite Scroll */}
      <AnimatePresence>
        {isLoadingMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm border border-border/50 rounded-full shadow-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">Carregando mais...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

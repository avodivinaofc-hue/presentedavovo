import { useState, useEffect, useCallback } from 'react';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
  isLoading: boolean;
}

export const usePWA = () => {
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOffline: false,
    isOnline: true,
    hasUpdate: false,
    isLoading: true,
  });

  const [installPrompt, setInstallPrompt] = useState<PWAInstallPrompt | null>(null);

  // Verifica se o app pode ser instalado
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as any);
      setState(prev => ({ ...prev, isInstallable: true }));
    };

    const handleAppInstalled = () => {
      setState(prev => ({ ...prev, isInstalled: true, isInstallable: false }));
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Monitora status online/offline
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true, isOffline: false }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false, isOffline: true }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Define estado inicial
    setState(prev => ({
      ...prev,
      isOnline: navigator.onLine,
      isOffline: !navigator.onLine,
      isLoading: false,
    }));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Verifica se o app está instalado
  useEffect(() => {
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setState(prev => ({ ...prev, isInstalled: true }));
      }
    };

    checkIfInstalled();
  }, []);

  // Instala o app
  const installApp = useCallback(async () => {
    if (!installPrompt) {
      console.warn('Prompt de instalação não disponível');
      return false;
    }

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setState(prev => ({ ...prev, isInstalled: true, isInstallable: false }));
        setInstallPrompt(null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao instalar app:', error);
      return false;
    }
  }, [installPrompt]);

  // Registra Service Worker
  const registerSW = useCallback(async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registrado:', registration);

        // Monitora atualizações
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setState(prev => ({ ...prev, hasUpdate: true }));
              }
            });
          }
        });

        return registration;
      } catch (error) {
        console.error('Erro ao registrar Service Worker:', error);
        return null;
      }
    }
    return null;
  }, []);

  // Atualiza o app
  const updateApp = useCallback(async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
        return true;
      } catch (error) {
        console.error('Erro ao atualizar app:', error);
        return false;
      }
    }
    return false;
  }, []);

  // Solicita permissão para notificações
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
        return false;
      }
    }
    return false;
  }, []);

  // Envia notificação
  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, options);
        return true;
      } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        return false;
      }
    }
    return false;
  }, []);

  // Sincroniza em background
  const syncInBackground = useCallback(async (tag: string) => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register(tag);
        return true;
      } catch (error) {
        console.error('Erro ao registrar sincronização:', error);
        return false;
      }
    }
    return false;
  }, []);

  // Verifica se o app pode ser instalado
  const canInstall = useCallback(() => {
    return state.isInstallable && !state.isInstalled;
  }, [state.isInstallable, state.isInstalled]);

  // Verifica se está funcionando offline
  const isOfflineCapable = useCallback(() => {
    return 'serviceWorker' in navigator && state.isOffline;
  }, [state.isOffline]);

  return {
    ...state,
    installApp,
    registerSW,
    updateApp,
    requestNotificationPermission,
    sendNotification,
    syncInBackground,
    canInstall: canInstall(),
    isOfflineCapable: isOfflineCapable(),
  };
};

import React, { useState, useEffect } from 'react';
import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Download, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  RefreshCw,
  Bell,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const {
    canInstall,
    isInstalled,
    isOffline,
    isOnline,
    hasUpdate,
    installApp,
    registerSW,
    updateApp,
    requestNotificationPermission,
    sendNotification
  } = usePWA();

  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [showOfflineNotice, setShowOfflineNotice] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Registra Service Worker na montagem
    registerSW();
    
    // Verifica permissão de notificação
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, [registerSW]);

  useEffect(() => {
    // Mostra prompt de instalação após delay
    if (canInstall && !isInstalled) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [canInstall, isInstalled]);

  useEffect(() => {
    // Mostra prompt de atualização
    if (hasUpdate) {
      setShowUpdatePrompt(true);
    }
  }, [hasUpdate]);

  useEffect(() => {
    // Mostra aviso offline
    if (isOffline) {
      setShowOfflineNotice(true);
    } else {
      setShowOfflineNotice(false);
    }
  }, [isOffline]);

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setShowInstallPrompt(false);
      // Envia notificação de sucesso
      sendNotification('App instalado com sucesso! 🎉', {
        body: 'Avó Divina agora está disponível na sua tela inicial',
        icon: '/favicon.png'
      });
    }
  };

  const handleUpdate = async () => {
    const success = await updateApp();
    if (success) {
      setShowUpdatePrompt(false);
    }
  };

  const handleNotificationPermission = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotificationPermission('granted');
      sendNotification('Notificações ativadas! 🔔', {
        body: 'Você receberá atualizações da Avó Divina',
        icon: '/favicon.png'
      });
    }
  };

  const sendTestNotification = () => {
    sendNotification('Teste da Avó Divina ✨', {
      body: 'Esta é uma notificação de teste para verificar se tudo está funcionando!',
      icon: '/favicon.png',
      badge: '/favicon.png'
    });
  };

  return (
    <>
      {/* Prompt de Instalação */}
      <Dialog open={showInstallPrompt} onOpenChange={setShowInstallPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Instalar Avó Divina
            </DialogTitle>
            <DialogDescription>
              Instale o app na sua tela inicial para acesso rápido e funcionalidade offline
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Smartphone className="w-5 h-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Acesso rápido</p>
                <p className="text-muted-foreground">Como um app nativo</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <WifiOff className="w-5 h-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Funciona offline</p>
                <p className="text-muted-foreground">Acesse sem internet</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleInstall} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Instalar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowInstallPrompt(false)}
            >
              Agora não
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prompt de Atualização */}
      <Dialog open={showUpdatePrompt} onOpenChange={setShowUpdatePrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" />
              Nova versão disponível
            </DialogTitle>
            <DialogDescription>
              Uma nova versão da Avó Divina está disponível com melhorias e correções
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">
                Atualize para obter a melhor experiência possível
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleUpdate} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar agora
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowUpdatePrompt(false)}
            >
              Depois
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Aviso Offline */}
      {showOfflineNotice && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-yellow-900 rounded-lg shadow-lg">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">Modo offline ativo</span>
          </div>
        </div>
      )}

      {/* Botão de Notificações */}
      {notificationPermission !== 'granted' && (
        <div className="fixed bottom-20 right-4 z-50">
          <Button
            onClick={handleNotificationPermission}
            size="sm"
            className="rounded-full w-12 h-12 bg-primary/90 hover:bg-primary shadow-lg"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Botão de Teste de Notificação */}
      {notificationPermission === 'granted' && (
        <div className="fixed bottom-20 right-4 z-50">
          <Button
            onClick={sendTestNotification}
            size="sm"
            variant="outline"
            className="rounded-full w-12 h-12 bg-background/90 hover:bg-background shadow-lg"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
          </Button>
        </div>
      )}

      {/* Status PWA */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {isInstalled && (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-600 rounded-full text-xs">
            <CheckCircle className="w-3 h-3" />
            App instalado
          </div>
        )}
        
        {isOffline && (
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-600 rounded-full text-xs">
            <WifiOff className="w-3 h-3" />
            Offline
          </div>
        )}
        
        {!isOnline && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-600 rounded-full text-xs">
            <XCircle className="w-3 h-3" />
            Sem conexão
          </div>
        )}
      </div>
    </>
  );
};

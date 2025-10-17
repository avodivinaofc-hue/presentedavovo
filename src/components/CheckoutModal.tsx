import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ExternalLink, ChevronDown, Minimize2, Maximize2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  productName: string;
  productPrice: number;
  customerName: string;
  customerEmail: string;
  productImage: string;
}

export const CheckoutModal = ({
  isOpen,
  onClose,
  onPaymentComplete,
  productName,
  productPrice,
  customerName,
  customerEmail,
  productImage
}: CheckoutModalProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Construir URL do Disrupty com email preenchido
  const disruptyUrl = `https://global.disruptybr.com.br/mmbk5?email=${encodeURIComponent(customerEmail)}`;

  // Toast quando modal abre
  useEffect(() => {
    if (isOpen) {
      toast({
        title: "🔮 Checkout Seguro",
        description: "Carregando sua experiência de pagamento...",
        duration: 2000,
      });
    }
  }, [isOpen]);

  // Simular carregamento do iframe
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Detectar quando o pagamento é concluído (você pode integrar com webhooks do Disrupty)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verificar se a mensagem é do Disrupty indicando pagamento concluído
      if (event.origin === "https://global.disruptybr.com.br" && 
          event.data && 
          event.data.type === "payment_completed") {
        
        toast({
          title: "Pagamento realizado com sucesso! 🎉",
          description: "Redirecionando para o e-book...",
        });

        // Redirecionar após 2 segundos
        setTimeout(() => {
          onPaymentComplete();
        }, 2000);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onPaymentComplete]);

  // Abrir checkout em nova aba como fallback
  const openInNewTab = () => {
    window.open(disruptyUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[97vw] h-[97vh] mx-auto bg-mystic-blue/95 border-mystic-purple-light overflow-hidden p-0 max-w-none">
        <DialogHeader className="p-2 sm:p-6 pb-1 sm:pb-4 sticky top-0 bg-mystic-blue/95 z-10 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2">
            <DialogTitle className="text-mystic-gold text-sm sm:text-xl font-['Arial_Black'] flex-1">
              {isMobile ? "🔮 Finalizar Compra" : `🔮 Finalizar Compra - ${productName}`}
            </DialogTitle>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-mystic-cream/60 hover:text-mystic-cream transition-colors p-1 sm:p-2 hover:bg-mystic-purple/20 rounded-full"
                title={isMinimized ? "Expandir" : "Minimizar"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              <button
                onClick={onClose}
                className="text-mystic-cream/60 hover:text-mystic-cream transition-colors p-1 sm:p-2 hover:bg-mystic-purple/20 rounded-full"
              >
                <X className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </DialogHeader>
        
        {!isMinimized && (
          <ScrollArea className="flex-1">
            {/* Resumo do Produto */}
            <div className="px-2 sm:px-6 pb-2 sm:pb-4">
              <div className="flex flex-row items-center gap-2 sm:gap-4 bg-mystic-purple/20 p-2 sm:p-4 rounded-lg">
                <img 
                  src={productImage} 
                  alt={productName}
                  className="hidden sm:block w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg shadow-mystical flex-shrink-0"
                  onError={(e) => {
                    console.error('Erro ao carregar imagem:', productImage);
                    e.currentTarget.src = '/lovable-uploads/vovo-divina-nova.jpeg.png';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-xs sm:text-lg font-bold text-mystic-cream font-['Arial_Black'] mb-1">
                    {productName}
                  </h3>
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="hidden sm:block text-xs sm:text-sm text-mystic-cream/60 line-through font-['Arial_Black']">
                      {t('pricing.from')} R$ 39,90
                    </div>
                    <div className="text-base sm:text-2xl font-bold text-mystic-gold font-['Arial_Black']">
                      R$ {productPrice.toFixed(2).replace(".", ",")}
                    </div>
                    <div className="hidden sm:block text-xs text-green-400 font-bold font-['Arial_Black']">
                      {t('pricing.savings')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Iframe do Checkout */}
            <div className="px-2 sm:px-6 pb-2 sm:pb-6">
              {isLoading ? (
                <div className="text-center space-y-3 py-6 sm:py-12">
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-3/4 mx-auto bg-mystic-purple/20" />
                    <Skeleton className="h-[350px] sm:h-[500px] w-full bg-mystic-purple/20 rounded-lg" />
                    <Skeleton className="h-6 w-1/2 mx-auto bg-mystic-purple/20" />
                  </div>
                  <p className="text-mystic-gold text-xs sm:text-sm font-['Arial_Black'] animate-pulse">
                    🔮 Carregando checkout seguro...
                  </p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-4">
                  <div className="hidden sm:block bg-mystic-purple/10 p-2 sm:p-3 rounded-lg text-center">
                    <p className="text-xs sm:text-sm text-mystic-cream/80">
                      Complete seu pagamento de forma segura abaixo
                    </p>
                  </div>
                  
                  <div className="relative w-full h-[70vh] bg-white rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={disruptyUrl}
                      className="w-full h-full border-0"
                      title="Checkout Disrupty"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                      onLoad={() => {
                        console.log('Iframe do Disrupty carregado');
                      }}
                    />
                  </div>

                  {/* Indicador de Scroll */}
                  <div className="text-center animate-bounce">
                    <ChevronDown className="w-4 h-4 text-mystic-gold/60 mx-auto" />
                    <p className="text-xs text-mystic-cream/40">Role para ver mais</p>
                  </div>

                  {/* Botão de Fallback */}
                  <div className="text-center">
                    <button
                      onClick={openInNewTab}
                      className="inline-flex items-center gap-2 text-mystic-gold hover:text-mystic-cream transition-colors text-xs sm:text-sm underline"
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Abrir checkout em nova aba</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Garantias - Oculto em mobile */}
            <div className="hidden md:block px-2 sm:px-6 pb-2 sm:pb-6">
              <div className="text-center space-y-1 bg-mystic-purple/10 p-2 sm:p-3 rounded-lg">
                <div className="text-xs text-mystic-cream/60 space-y-0.5">
                  <p>✅ {t('guarantees.secure')}</p>
                  <p>✅ {t('guarantees.immediate')}</p>
                  <p>✅ {t('guarantees.satisfaction')}</p>
                  <p>✅ {t('guarantees.support')}</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
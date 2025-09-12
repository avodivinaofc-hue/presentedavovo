import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  const [isLoading, setIsLoading] = useState(true);
  
  // Construir URL do Disrupty com email preenchido
  const disruptyUrl = `https://global.disruptybr.com.br/mmbk5?email=${encodeURIComponent(customerEmail)}`;

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
      <DialogContent className="w-[95vw] sm:w-[90vw] md:max-w-6xl mx-auto bg-mystic-blue/95 border-mystic-purple-light max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="p-3 sm:p-6 pb-2 sm:pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-center text-mystic-gold text-sm sm:text-xl font-['Arial_Black'] flex-1 pr-2">
              🔮 Finalizar Compra - {productName}
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-mystic-cream/60 hover:text-mystic-cream transition-colors p-1 sm:p-2 hover:bg-mystic-purple/20 rounded-full flex-shrink-0"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          {/* Resumo do Produto */}
          <div className="px-3 sm:px-6 pb-2 sm:pb-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 bg-mystic-purple/20 p-3 sm:p-4 rounded-lg">
              <img 
                src={productImage} 
                alt={productName}
                className="w-12 sm:w-16 h-auto rounded-lg shadow-mystical flex-shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-sm sm:text-lg font-bold text-mystic-cream font-['Arial_Black']">
                  {productName}
                </h3>
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm text-mystic-cream/60 line-through font-['Arial_Black']">
                    De R$ 39,90
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-mystic-gold font-['Arial_Black']">
                    Por R$ {productPrice.toFixed(2).replace(".", ",")}
                  </div>
                  <div className="text-xs text-green-400 font-bold font-['Arial_Black']">
                    Economia de R$ 20,00!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Iframe do Checkout */}
          <div className="px-3 sm:px-6 pb-3 sm:pb-6 flex-1 min-h-0">
            {isLoading ? (
              <div className="text-center space-y-4 py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-mystic-gold/30 border-t-mystic-gold rounded-full animate-spin mx-auto"></div>
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-lg font-bold text-mystic-cream font-['Arial_Black']">
                    Carregando Checkout...
                  </h3>
                  <p className="text-mystic-cream/80 text-xs sm:text-sm">
                    Preparando sua experiência de pagamento segura
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-mystic-purple/10 p-2 sm:p-3 rounded-lg text-center">
                  <p className="text-xs sm:text-sm text-mystic-cream/80">
                    Complete seu pagamento de forma segura abaixo
                  </p>
                </div>
                
                <div className="relative w-full h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[500px] bg-white rounded-lg overflow-hidden shadow-lg">
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

                {/* Botão de Fallback */}
                <div className="text-center">
                  <button
                    onClick={openInNewTab}
                    className="inline-flex items-center space-x-2 text-mystic-gold hover:text-mystic-cream transition-colors text-xs sm:text-sm underline"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Abrir checkout em nova aba</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Garantias */}
          <div className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-center space-y-1 sm:space-y-2 bg-mystic-purple/10 p-2 sm:p-3 rounded-lg">
              <div className="text-xs text-mystic-cream/60 space-y-0.5 sm:space-y-1">
                <p className="text-xs">✅ Pagamento 100% seguro e criptografado</p>
                <p className="text-xs">✅ Acesso imediato após confirmação</p>
                <p className="text-xs">✅ Garantia de satisfação de 7 dias</p>
                <p className="text-xs">✅ Suporte especializado</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
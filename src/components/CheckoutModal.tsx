import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MysticalButton } from "@/components/MysticalButton";
import { Loader2, CreditCard, Smartphone, CheckCircle } from "lucide-react";
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
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Redirecionar para o Disrupty
      const disruptyUrl = "https://global.disruptybr.com.br/exycdib4b8";
      
      toast({
        title: "Redirecionando para pagamento...",
        description: "Você será direcionado para finalizar sua compra.",
      });

      // Abrir o Disrupty em nova aba
      window.open(disruptyUrl, '_blank');
      
      // Simular sucesso após um delay
      setTimeout(() => {
        toast({
          title: "Redirecionamento realizado! 🎉",
          description: "Complete o pagamento na nova aba para acessar seu e-book.",
        });
        
        // Chamar callback de sucesso
        onPaymentComplete();
      }, 2000);

    } catch (error) {
      console.error('Erro no redirecionamento:', error);
      toast({
        title: "Erro no redirecionamento",
        description: "Tente novamente ou acesse o link diretamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto bg-mystic-blue/95 border-mystic-purple-light max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-mystic-gold text-xl font-['Arial_Black']">
            🔮 Finalizar Compra
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Resumo do Produto */}
          <div className="text-center space-y-3 bg-mystic-purple/20 p-4 rounded-lg">
            <img 
              src={productImage} 
              alt={productName}
              className="w-20 h-auto mx-auto rounded-lg shadow-mystical"
            />
            <h3 className="text-lg font-bold text-mystic-cream font-['Arial_Black']">
              {productName}
            </h3>
            <div className="space-y-1">
              <div className="text-sm text-mystic-cream/60 line-through font-['Arial_Black']">
                De R$ 30,90
              </div>
              <div className="text-2xl font-bold text-mystic-gold font-['Arial_Black']">
                Por R$ {productPrice.toFixed(2).replace('.', ',')}
              </div>
              <div className="text-xs text-green-400 font-bold font-['Arial_Black']">
                Economia de R$ 11,00!
              </div>
            </div>
          </div>

          {/* Informações do Cliente */}
          <div className="space-y-3">
            <h4 className="text-mystic-gold font-bold text-sm font-['Arial_Black']">
              Dados do Cliente
            </h4>
            <div className="bg-mystic-purple/20 p-3 rounded-lg space-y-2">
              <p className="text-sm text-mystic-cream/90">
                <strong>Nome:</strong> {customerName}
              </p>
              <p className="text-sm text-mystic-cream/90">
                <strong>Email:</strong> {customerEmail}
              </p>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className="space-y-4">
            <h4 className="text-mystic-gold font-bold text-sm font-['Arial_Black']">
              Métodos de Pagamento Disponíveis
            </h4>
            
            <div className="bg-mystic-purple/10 p-4 rounded-lg text-center space-y-3">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-mystic-gold" />
                  <span className="text-mystic-cream font-bold text-sm">PIX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-mystic-gold" />
                  <span className="text-mystic-cream font-bold text-sm">Cartão</span>
                </div>
              </div>
              <div className="text-mystic-cream/90 text-sm">
                Você será redirecionado para finalizar o pagamento
              </div>
              <div className="text-xs text-mystic-cream/60">
                Pagamento 100% seguro • Aprovação instantânea
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <MysticalButton
              variant="gold"
              size="lg"
              className="w-full h-12 text-base font-bold"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Redirecionando...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Ir para Pagamento</span>
                </>
              )}
            </MysticalButton>
            
            <button
              onClick={onClose}
              className="w-full text-center text-mystic-cream/60 hover:text-mystic-cream text-sm underline"
              disabled={isProcessing}
            >
              Cancelar compra
            </button>
          </div>

          {/* Garantias */}
          <div className="text-center space-y-2 bg-mystic-purple/10 p-3 rounded-lg">
            <div className="text-xs text-mystic-cream/60 space-y-1">
              <p>✅ Pagamento 100% seguro e criptografado</p>
              <p>✅ Acesso imediato após confirmação</p>
              <p>✅ Garantia de satisfação de 7 dias</p>
              <p>✅ Suporte especializado</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

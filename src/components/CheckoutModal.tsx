import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MysticalButton } from "@/components/MysticalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, Smartphone, CheckCircle, Copy, QrCode, ArrowLeft } from "lucide-react";
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
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | null>(null);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [pixCode, setPixCode] = useState("");

  // Gerar código PIX simulado
  const generatePixCode = () => {
    const code = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2, 15)}52040000530398654059.905802BR5913AVO DIVINA LTDA6009SAO PAULO62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setPixCode(code);
    return code;
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({
        title: "Selecione um método de pagamento",
        description: "Escolha PIX ou Cartão para continuar.",
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === "card") {
      if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
        toast({
          title: "Dados do cartão incompletos",
          description: "Preencha todos os campos do cartão.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === "pix") {
        // Gerar código PIX
        const code = generatePixCode();
        setPixCode(code);
        
        toast({
          title: "Código PIX gerado! ",
          description: "Copie o código e pague no seu app bancário.",
        });
      } else {
        // Simular processamento de cartão
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        toast({
          title: "Pagamento aprovado! ",
          description: "Sua compra foi processada com sucesso.",
        });
        
        // Chamar callback de sucesso
        onPaymentComplete();
      }

    } catch (error) {
      console.error("Erro no pagamento:", error);
      toast({
        title: "Erro no pagamento",
        description: "Tente novamente ou use outro método de pagamento.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    toast({
      title: "Código PIX copiado! ",
      description: "Cole no seu app bancário para pagar.",
    });
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    return value.replace(/\D/g, "").replace(/(.{2})/, "$1/").substring(0, 5);
  };

  const resetPayment = () => {
    setPaymentMethod(null);
    setCardData({ number: "", expiry: "", cvv: "", name: "" });
    setPixCode("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mx-auto bg-mystic-blue/95 border-mystic-purple-light max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-mystic-gold text-xl font-[
Arial_Black]">
             Finalizar Compra
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
            <h3 className="text-lg font-bold text-mystic-cream font-[Arial_Black]">
              {productName}
            </h3>
            <div className="space-y-1">
              <div className="text-sm text-mystic-cream/60 line-through font-[Arial_Black]">
                De R$ 29,90
              </div>
              <div className="text-2xl font-bold text-mystic-gold font-[Arial_Black]">
                Por R$ {productPrice.toFixed(2).replace(".", ",")}
              </div>
              <div className="text-xs text-green-400 font-bold font-[Arial_Black]">
                Economia de R$ 20,00!
              </div>
            </div>
          </div>

          {/* Informações do Cliente */}
          <div className="space-y-3">
            <h4 className="text-mystic-gold font-bold text-sm font-[Arial_Black]">
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

          {/* Seleção de Método de Pagamento */}
          {!paymentMethod && (
            <div className="space-y-4">
              <h4 className="text-mystic-gold font-bold text-sm font-[Arial_Black]">
                Escolha seu método de pagamento
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MysticalButton
                  variant="ethereal"
                  className="h-16 flex flex-col items-center justify-center space-y-2"
                  onClick={() => setPaymentMethod("pix")}
                >
                  <Smartphone className="w-6 h-6 text-mystic-gold" />
                  <span className="font-bold">PIX</span>
                  <span className="text-xs text-mystic-cream/80">Aprovação instantânea</span>
                </MysticalButton>
                
                <MysticalButton
                  variant="ethereal"
                  className="h-16 flex flex-col items-center justify-center space-y-2"
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="w-6 h-6 text-mystic-gold" />
                  <span className="font-bold">Cartão</span>
                  <span className="text-xs text-mystic-cream/80">Crédito ou Débito</span>
                </MysticalButton>
              </div>
            </div>
          )}

          {/* Formulário PIX */}
          {paymentMethod === "pix" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-mystic-gold font-bold text-sm font-[Arial_Black]">
                  Pagamento via PIX
                </h4>
                <button
                  onClick={resetPayment}
                  className="flex items-center space-x-1 text-mystic-cream/60 hover:text-mystic-cream text-xs"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Voltar</span>
                </button>
              </div>

              {!pixCode ? (
                <div className="bg-mystic-purple/10 p-4 rounded-lg text-center space-y-3">
                  <QrCode className="w-12 h-12 text-mystic-gold mx-auto" />
                  <p className="text-mystic-cream/90 text-sm">
                    Clique em "Gerar PIX" para obter o código de pagamento
                  </p>
                  <MysticalButton
                    variant="gold"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        <span>Gerando PIX...</span>
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4 mr-2" />
                        <span>Gerar Código PIX</span>
                      </>
                    )}
                  </MysticalButton>
                </div>
              ) : (
                <div className="bg-mystic-purple/10 p-4 rounded-lg space-y-4">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-mystic-gold mx-auto mb-2" />
                    <p className="text-mystic-cream font-bold text-sm mb-2">Código PIX Gerado!</p>
                    <p className="text-mystic-cream/80 text-xs mb-4">
                      Copie o código e pague no seu app bancário
                    </p>
                  </div>
                  
                  <div className="bg-mystic-blue/30 p-3 rounded-lg">
                    <p className="text-xs text-mystic-cream/60 mb-1">Código PIX:</p>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs text-mystic-cream font-mono flex-1 break-all">
                        {pixCode}
                      </code>
                      <button
                        onClick={copyPixCode}
                        className="flex items-center space-x-1 bg-mystic-gold text-mystic-purple px-2 py-1 rounded text-xs font-bold hover:bg-mystic-gold/80"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-xs text-mystic-cream/60">
                      Após o pagamento, clique em "Confirmar Pagamento"
                    </p>
                    <MysticalButton
                      variant="gold"
                      onClick={onPaymentComplete}
                      className="w-full"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Confirmar Pagamento</span>
                    </MysticalButton>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formulário do Cartão */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-mystic-gold font-bold text-sm font-[Arial_Black]">
                  Pagamento com Cartão
                </h4>
                <button
                  onClick={resetPayment}
                  className="flex items-center space-x-1 text-mystic-cream/60 hover:text-mystic-cream text-xs"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Voltar</span>
                </button>
              </div>

              <div className="space-y-4 bg-mystic-purple/10 p-4 rounded-lg">
                <div>
                  <Label htmlFor="cardName" className="text-mystic-gold text-sm font-[Arial_Black]">
                    Nome no Cartão
                  </Label>
                  <Input
                    id="cardName"
                    value={cardData.name}
                    onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream h-10 text-sm mt-1"
                    placeholder="Nome como está no cartão"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber" className="text-mystic-gold text-sm font-[Arial_Black]">
                    Número do Cartão
                  </Label>
                  <Input
                    id="cardNumber"
                    value={cardData.number}
                    onChange={(e) => setCardData(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                    className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream h-10 text-sm mt-1"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="cardExpiry" className="text-mystic-gold text-sm font-[Arial_Black]">
                      Validade
                    </Label>
                    <Input
                      id="cardExpiry"
                      value={cardData.expiry}
                      onChange={(e) => setCardData(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                      className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream h-10 text-sm mt-1"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardCvv" className="text-mystic-gold text-sm font-[Arial_Black]">
                      CVV
                    </Label>
                    <Input
                      id="cardCvv"
                      value={cardData.cvv}
                      onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, "").substring(0, 4) }))}
                      className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream h-10 text-sm mt-1"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <MysticalButton
                  variant="gold"
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full h-12"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      <span>Pagar com Cartão</span>
                    </>
                  )}
                </MysticalButton>
              </div>
            </div>
          )}

          {/* Botão Cancelar */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="text-mystic-cream/60 hover:text-mystic-cream text-sm underline"
            >
              Cancelar compra
            </button>
          </div>

          {/* Garantias */}
          <div className="text-center space-y-2 bg-mystic-purple/10 p-3 rounded-lg">
            <div className="text-xs text-mystic-cream/60 space-y-1">
              <p> Pagamento 100% seguro e criptografado</p>
              <p> Acesso imediato após confirmação</p>
              <p> Garantia de satisfação de 7 dias</p>
              <p> Suporte especializado</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

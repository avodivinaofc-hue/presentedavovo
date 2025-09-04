import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticalButton } from "@/components/MysticalButton";
import { MysticalCard } from "@/components/MysticalCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutModal } from "@/components/CheckoutModal";
import { toast } from "@/hooks/use-toast";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e email.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Iniciando processo de compra...");
      console.log("Nome:", name);
      console.log("Email:", email);
      
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sucesso - abrir checkout
      toast({
        title: "Sucesso! ✨",
        description: "Abrindo checkout para finalizar sua compra..."
      });
      
      console.log("Abrindo checkout...");
      setShowCheckout(true);

    } catch (error) {
      console.error('Unexpected error:', error);
      
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    setIsPaymentComplete(true);
    setShowCheckout(false);
    
    toast({
      title: "Pagamento realizado! 🎉",
      description: "Redirecionando para seu e-book..."
    });
    
    // Redirecionar para o e-book após 2 segundos
    setTimeout(() => {
      navigate("/ebook", { state: { name } });
    }, 2000);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background místico original */}
      <div className="absolute inset-0 bg-mystical-gradient opacity-90"></div>
      
      {/* Imagem de fundo hero */}
      <div className="absolute inset-0">
        <img 
          src="/mystical-hand-hero.jpg" 
          alt="Mão mística com cartas de tarô"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      {/* FloatingParticles */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="min-h-screen flex items-center justify-center pt-20 sm:pt-16 md:pt-12 lg:pt-8">
          <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto">
              {/* Layout Mobile-First: Empilhado em mobile, lado a lado em desktop */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
                
                {/* Texto Principal */}
                <div className="text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10 order-2 lg:order-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-normal text-white font-['Arial_Black'] px-2 sm:px-0">
                    <span className="text-yellow-400">Sua intuição</span>
                    <br className="hidden sm:block" />
                    <span className="text-white">está sussurrando.</span>
                    <br className="hidden sm:block" />
                    <span className="text-yellow-400">Aprenda a ouvir</span>
                    <br className="hidden sm:block" />
                    <span className="text-white">com clareza.</span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-200 leading-relaxed px-4 sm:px-0 font-['Arial_Black']">
                    Adquira o guia completo <strong className="text-yellow-400">"O Oráculo Interior"</strong> e descubra como usar o Tarô para iluminar suas decisões e encontrar a direção que você busca.
                  </p>

                  {/* Benefícios */}
                  <div className="space-y-4 sm:space-y-5 lg:space-y-6 text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 px-4 sm:px-0 font-['Arial_Black']">
                    <div className="flex items-start space-x-4">
                      <span className="text-yellow-400 text-xl sm:text-2xl lg:text-3xl xl:text-4xl flex-shrink-0 mt-1">✨</span>
                      <span className="text-left leading-relaxed">Desvende os mitos e descubra o verdadeiro poder do Tarô</span>
                    </div>
                    <div className="flex items-start space-x-4">
                      <span className="text-yellow-400 text-xl sm:text-2xl lg:text-3xl xl:text-4xl flex-shrink-0 mt-1">✨</span>
                      <span className="text-left leading-relaxed">Aprenda uma tiragem simples de 3 cartas que você pode usar hoje mesmo</span>
                    </div>
                    <div className="flex items-start space-x-4">
                      <span className="text-yellow-400 text-xl sm:text-2xl lg:text-3xl xl:text-4xl flex-shrink-0 mt-1">✨</span>
                      <span className="text-left leading-relaxed">Descubra como fazer as perguntas certas para obter respostas claras</span>
                    </div>
                  </div>
                </div>

                {/* Formulário e Capa do E-book */}
                <div className="flex flex-col items-center space-y-8 sm:space-y-10 lg:space-y-12 order-1 lg:order-2 w-full max-w-md sm:max-w-lg lg:max-w-xl">
                  {/* Capa do E-book - Imagem Otimizada */}
                  <div className="animate-bounce">
                    <img 
                      src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png" 
                      alt="Capa do E-book O Oráculo Interior"
                      className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-auto object-contain rounded-lg shadow-2xl"
                    />
                  </div>

                  {/* Formulário */}
                  <MysticalCard className="w-full p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 lg:space-y-8">
                      <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400 mb-3 font-['Arial_Black']">
                          Adquira seu Guia Completo
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 font-['Arial_Black']">
                          E inicie sua jornada de clareza agora mesmo
                        </p>
                        <div className="mt-4 space-y-2">
                          <div className="text-lg sm:text-xl text-gray-400 line-through font-['Arial_Black']">
                            De R$ 29,90
                          </div>
                          <div className="text-2xl sm:text-3xl font-bold text-yellow-400 font-['Arial_Black']">
                            Por apenas R$ 9,90
                          </div>
                          <div className="text-sm text-green-400 font-bold font-['Arial_Black']">
                            Economia de R$ 20,00!
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <Label htmlFor="name" className="text-yellow-400 text-base sm:text-lg font-['Arial_Black']">Seu Nome</Label>
                          <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-14 sm:h-16 text-base sm:text-lg font-['Arial_Black'] mt-2"
                            placeholder="Como posso te chamar?"
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email" className="text-yellow-400 text-base sm:text-lg font-['Arial_Black']">Seu E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-14 sm:h-16 text-base sm:text-lg font-['Arial_Black'] mt-2"
                            placeholder="seu@email.com"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <MysticalButton 
                        type="submit" 
                        variant="gold" 
                        size="lg" 
                        className="w-full h-14 sm:h-16 text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-['Arial_Black'] mt-6 leading-relaxed"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-3"></div>
                            <span className="text-base sm:text-lg">PROCESSANDO...</span>
                          </>
                        ) : (
                          <>
                            🔮 COMPRAR MEU GUIA AGORA!
                          </>
                        )}
                      </MysticalButton>

                      <p className="text-sm text-gray-400 text-center px-4 font-['Arial_Black']">
                        Seus dados estão seguros. Não enviamos spam.
                      </p>
                    </form>
                  </MysticalCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Checkout */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={handleCheckoutClose}
        onPaymentComplete={handlePaymentComplete}
        productName="O Oráculo Interior"
        productPrice={9.90}
        customerName={name}
        customerEmail={email}
        productImage="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png"
      />
    </div>
  );
};

export default LandingPage;
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MysticalButton } from "@/components/MysticalButton";
import { MysticalCard } from "@/components/MysticalCard";
import { CountdownTimer } from "@/components/CountdownTimer";
import { FloatingParticles } from "@/components/FloatingParticles";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Sparkles, Zap, Clock, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TripwirePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || { name: "querida" };
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    // Mostrar a oferta após um breve delay para criar antecipação
    const timer = setTimeout(() => {
      setShowOffer(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePurchase = () => {
    // Redirecionar para o checkout
    window.open("https://avo-divina.netlify.app/", "_blank");
  };

  const skipOffer = () => {
    navigate("/ebook");
  };

  if (!showOffer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FloatingParticles />
        <MobileNavigation />
        <div className="text-center space-y-4 px-4">
          <div className="glow-effect p-6 sm:p-8 rounded-full inline-block">
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
          </div>
          <h2 className="text-xl sm:text-2xl text-mystical-gradient">Preparando sua experiência especial...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <MobileNavigation />
      
      <div className="container mx-auto spacing-section pt-16 md:pt-8">
        {/* Header com Urgência */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-mystical-gradient mb-4">
            ESPERE, {name}! 
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 mb-4 sm:mb-6 px-4">
            Seu Guia está a caminho, mas sua <span className="text-primary font-bold">Clareza pode chegar em 60 segundos...</span>
          </p>
          
          <MysticalCard variant="glowing" className="inline-block p-4 sm:p-6">
            <CountdownTimer />
          </MysticalCard>
        </div>

        {/* Oferta Principal */}
        <div className="max-w-4xl mx-auto px-4">
          <MysticalCard variant="ethereal" className="p-6 sm:p-8 md:p-12 text-center space-y-6 sm:space-y-8">
            
            {/* Gancho Emocional */}
            <div className="space-y-4">
              <div className="inline-block p-3 sm:p-4 bg-primary/20 rounded-full">
                <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mystical-gradient">
                O Espelho da Alma
              </h2>
              <p className="text-base sm:text-xl text-foreground/90 leading-relaxed px-4">
                Por ter confiado na Avó Divina e baixado nosso guia, você desbloqueou um acesso único 
                à ferramenta mais poderosa para <span className="text-primary font-bold">análise instantânea</span> 
                da sua energia atual.
              </p>
            </div>

            {/* Benefícios */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <MysticalCard className="p-4 sm:p-6 text-center">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-3 sm:mb-4" />
                <h4 className="font-bold text-primary mb-2 text-sm sm:text-base">Instantâneo</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Receba sua análise personalizada em segundos</p>
              </MysticalCard>
              
              <MysticalCard className="p-4 sm:p-6 text-center">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-3 sm:mb-4" />
                <h4 className="font-bold text-primary mb-2 text-sm sm:text-base">Personalizado</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Baseado na sua data de nascimento e pergunta específica</p>
              </MysticalCard>
              
              <MysticalCard className="p-4 sm:p-6 text-center sm:col-span-2 md:col-span-1">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-3 sm:mb-4" />
                <h4 className="font-bold text-primary mb-2 text-sm sm:text-base">Preciso</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Análise completa do Passado, Presente e Futuro</p>
              </MysticalCard>
            </div>

            {/* Preço */}
            <div className="space-y-4">
              <div className="text-center px-4">
                <p className="text-muted-foreground line-through text-lg sm:text-xl">De R$ 29,90</p>
                <p className="text-3xl sm:text-4xl md:text-6xl font-bold text-mystical-gradient">
                  por apenas R$ 9,90
                </p>
                <p className="text-primary text-sm sm:text-base">Oferta especial por tempo limitado</p>
              </div>
            </div>

            {/* Urgência */}
            <MysticalCard variant="glowing" className="p-4 sm:p-6 bg-destructive/20 border-destructive/30 mx-4">
              <p className="text-primary font-bold mb-2 text-sm sm:text-base">⚠️ ATENÇÃO:</p>
              <p className="text-foreground/90 text-sm sm:text-base">
                Esta oferta especial é exclusiva para novos leitores e <span className="text-primary font-bold">
                desaparece quando o timer zerar</span>. Não a deixe escapar!
              </p>
            </MysticalCard>

            {/* Call to Actions */}
            <div className="space-y-4 px-4">
              <MysticalButton 
                variant="gold" 
                size="lg" 
                onClick={handlePurchase}
                className="w-full md:w-auto text-lg sm:text-xl font-bold px-8 sm:px-12 py-3 sm:py-4 glow-effect"
              >
                🔮 SIM, QUERO MINHA ANÁLISE INSTANTÂNEA!
              </MysticalButton>
              
              <div className="text-center">
                <button 
                  onClick={skipOffer}
                  className="text-muted-foreground hover:text-foreground transition-colors underline text-sm"
                >
                  Não, obrigada. Apenas quero ler o e-book.
                </button>
              </div>
            </div>

            {/* Garantia */}
            <div className="text-center text-xs sm:text-sm text-muted-foreground px-4">
              <p>✅ Pagamento 100% seguro</p>
              <p>✅ Acesso imediato após a confirmação</p>
              <p>✅ Garantia de satisfação</p>
            </div>
          </MysticalCard>
        </div>

        {/* Depoimentos rápidos */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-12 px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-mystical-gradient text-center mb-6 sm:mb-8">
            O que outras pessoas estão dizendo:
          </h3>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <MysticalCard className="p-4 sm:p-6">
              <p className="text-foreground/90 italic mb-4 text-sm sm:text-base">
                "Incrível como a análise foi certeira! Me ajudou a entender exatamente 
                o que estava acontecendo na minha vida."
              </p>
              <p className="text-primary font-semibold text-sm sm:text-base">- Maria, 34 anos</p>
            </MysticalCard>
            
            <MysticalCard className="p-4 sm:p-6">
              <p className="text-foreground/90 italic mb-4 text-sm sm:text-base">
                "Em 60 segundos eu tinha as respostas que procurava há meses. 
                Valeu cada centavo!"
              </p>
              <p className="text-primary font-semibold text-sm sm:text-base">- Ana, 28 anos</p>
            </MysticalCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripwirePage;
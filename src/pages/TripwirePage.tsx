import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MysticalButton } from "@/components/MysticalButton";
import { MysticalCard } from "@/components/MysticalCard";
import { CountdownTimer } from "@/components/CountdownTimer";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Sparkles, Zap, Clock, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TripwirePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || { name: "querida" };
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    console.log("TripwirePage: Componente montado");
    console.log("TripwirePage: Location state:", location.state);
    console.log("TripwirePage: Nome recebido:", name);
    
    // Mostrar a oferta após um breve delay para criar antecipação
    const timer = setTimeout(() => {
      console.log("TripwirePage: Mostrando oferta");
      setShowOffer(true);
    }, 1000);

    return () => {
      console.log("TripwirePage: Componente desmontando");
      clearTimeout(timer);
    };
  }, [location.state, name]);

  const handlePurchase = () => {
    try {
      console.log("TripwirePage: Tentando abrir checkout...");
      // Redirecionar para o checkout
      window.open("https://avo-divina.netlify.app/", "_blank");
    } catch (error) {
      console.error("Erro ao abrir checkout:", error);
      // Fallback: tentar navegação direta
      window.location.href = "https://avo-divina.netlify.app/";
    }
  };

  const skipOffer = () => {
    try {
      console.log("TripwirePage: Tentando navegar para /ebook...");
      navigate("/ebook");
    } catch (error) {
      console.error("Erro na navegação:", error);
      // Fallback: navegação direta
      window.location.href = "/ebook";
    }
  };

  if (!showOffer) {
    console.log("TripwirePage: Renderizando tela de carregamento");
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <FloatingParticles />
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="glow-effect p-4 sm:p-6 lg:p-8 rounded-full inline-block">
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-primary" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl text-mystical-gradient px-2 font-['Arial_Black']">Preparando sua experiência especial...</h2>
        </div>
      </div>
    );
  }

  console.log("TripwirePage: Renderizando oferta principal");
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 pt-16 sm:pt-12 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Header com Urgência */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-mystical-gradient mb-4 px-2 font-['Arial_Black'] leading-tight">
              ESPERE, {name}! 
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 mb-4 sm:mb-6 px-3 sm:px-4 leading-relaxed font-['Arial_Black']">
              Sua <span className="text-primary font-bold">oferta especial está disponível por tempo limitado...</span>
            </p>
            
            <MysticalCard variant="glowing" className="inline-block p-3 sm:p-4 lg:p-6">
              <CountdownTimer />
            </MysticalCard>
          </div>

          {/* Oferta Principal */}
          <div className="max-w-4xl mx-auto">
            <MysticalCard variant="ethereal" className="p-3 sm:p-4 md:p-6 lg:p-8 text-center space-y-4 sm:space-y-6 lg:space-y-8">
              
              {/* Gancho Emocional */}
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-block p-2 sm:p-3 lg:p-4 bg-primary/20 rounded-full">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-mystical-gradient font-['Arial_Black']">
                  O Espelho da Alma
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed px-2 sm:px-3 md:px-4 font-['Arial_Black']">
                  Por ter confiado na Avó Divina, você desbloqueou um acesso único 
                  à ferramenta mais poderosa para <span className="text-primary font-bold">análise instantânea</span> 
                  da sua energia atual.
                </p>
              </div>

              {/* Benefícios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <MysticalCard className="p-3 sm:p-4 lg:p-6 text-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary mx-auto mb-2 sm:mb-3 lg:mb-4" />
                  <h4 className="font-bold text-primary mb-2 text-xs sm:text-sm lg:text-base font-['Arial_Black']">Instantâneo</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-['Arial_Black'] leading-tight">Receba sua análise personalizada em segundos</p>
                </MysticalCard>
                
                <MysticalCard className="p-3 sm:p-4 lg:p-6 text-center">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary mx-auto mb-2 sm:mb-3 lg:mb-4" />
                  <h4 className="font-bold text-primary mb-2 text-xs sm:text-sm lg:text-base font-['Arial_Black']">Personalizado</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-['Arial_Black'] leading-tight">Baseado na sua data de nascimento e pergunta específica</p>
                </MysticalCard>
                
                <MysticalCard className="p-3 sm:p-4 lg:p-6 text-center sm:col-span-2 lg:col-span-1">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary mx-auto mb-2 sm:mb-3 lg:mb-4" />
                  <h4 className="font-bold text-primary mb-2 text-xs sm:text-sm lg:text-base font-['Arial_Black']">Preciso</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-['Arial_Black'] leading-tight">Análise completa do Passado, Presente e Futuro</p>
                </MysticalCard>
              </div>

              {/* Preço */}
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center px-2 sm:px-3 md:px-4">
                  <p className="text-muted-foreground line-through text-base sm:text-lg lg:text-xl font-['Arial_Black']">De R$ 29,90</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-mystical-gradient font-['Arial_Black'] leading-tight">
                    por apenas R$ 9,90
                  </p>
                  <p className="text-green-400 text-sm sm:text-base font-bold font-['Arial_Black']">Economia de R$ 20,00!</p>
                  <p className="text-primary text-xs sm:text-sm lg:text-base font-['Arial_Black']">Oferta especial por tempo limitado</p>
                </div>
              </div>

              {/* Urgência */}
              <MysticalCard variant="glowing" className="p-3 sm:p-4 lg:p-6 bg-destructive/20 border-destructive/30 mx-2 sm:mx-3 md:mx-4">
                <p className="text-primary font-bold mb-2 text-xs sm:text-sm lg:text-base font-['Arial_Black']">⚠️ ATENÇÃO:</p>
                <p className="text-foreground/90 text-xs sm:text-sm lg:text-base font-['Arial_Black'] leading-tight">
                  Esta oferta especial é exclusiva para novos leitores e <span className="text-primary font-bold">
                  desaparece quando o timer zerar</span>. Não a deixe escapar!
                </p>
              </MysticalCard>

              {/* Call to Actions */}
              <div className="space-y-3 sm:space-y-4 px-2 sm:px-3 md:px-4">
                <MysticalButton 
                  variant="gold" 
                  size="lg" 
                  onClick={handlePurchase}
                  className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg lg:text-xl font-bold px-3 sm:px-6 lg:px-8 py-3 sm:py-4 glow-effect font-['Arial_Black']"
                >
                  🔮 SIM, QUERO MINHA ANÁLISE INSTANTÂNEA!
                </MysticalButton>
                
                <div className="text-center">
                  <button 
                    onClick={skipOffer}
                    className="text-muted-foreground hover:text-foreground transition-colors underline text-xs sm:text-sm px-2 py-2 font-['Arial_Black']"
                  >
                    Não, obrigada. Vou pensar melhor.
                  </button>
                </div>
              </div>

              {/* Garantia */}
              <div className="text-center text-xs sm:text-sm text-muted-foreground px-2 sm:px-3 md:px-4 space-y-1 font-['Arial_Black']">
                <p>✅ Pagamento 100% seguro</p>
                <p>✅ Acesso imediato após a confirmação</p>
                <p>✅ Garantia de satisfação</p>
              </div>
            </MysticalCard>
          </div>

          {/* Depoimentos rápidos */}
          <div className="max-w-4xl mx-auto mt-6 sm:mt-8 lg:mt-12">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-mystical-gradient text-center mb-4 sm:mb-6 lg:mb-8 px-2 font-['Arial_Black']">
              O que outras pessoas estão dizendo:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <MysticalCard className="p-3 sm:p-4 lg:p-6">
                <p className="text-foreground/90 italic mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed font-['Arial_Black']">
                  "Incrível como a análise foi certeira! Me ajudou a entender exatamente 
                  o que estava acontecendo na minha vida."
                </p>
                <p className="text-primary font-semibold text-xs sm:text-sm lg:text-base font-['Arial_Black']">- Maria, 34 anos</p>
              </MysticalCard>
              
              <MysticalCard className="p-3 sm:p-4 lg:p-6">
                <p className="text-foreground/90 italic mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed font-['Arial_Black']">
                  "Em 60 segundos eu tinha as respostas que procurava há meses. 
                  Valeu cada centavo!"
                </p>
                <p className="text-primary font-semibold text-xs sm:text-sm lg:text-base font-['Arial_Black']">- Ana, 28 anos</p>
              </MysticalCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripwirePage;
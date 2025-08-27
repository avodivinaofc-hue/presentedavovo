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
    // Mostrar a oferta após um breve delay para criar antecipação
    const timer = setTimeout(() => {
      setShowOffer(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePurchase = () => {
    // Redirecionar para o checkout da Disrupty
    window.open("https://global.disruptybr.com.br/exycdib4b8", "_blank");
  };

  const skipOffer = () => {
    navigate("/ebook");
  };

  if (!showOffer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FloatingParticles />
        <div className="text-center space-y-4">
          <div className="glow-effect p-8 rounded-full inline-block">
            <Sparkles className="w-16 h-16 text-mystic-gold" />
          </div>
          <h2 className="text-2xl text-mystical-gradient">Preparando sua experiência especial...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header com Urgência */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-mystical-gradient mb-4">
            ESPERE, {name}! 
          </h1>
          <p className="text-xl md:text-2xl text-mystic-cream/90 mb-6">
            Seu Guia está a caminho, mas sua <span className="text-mystic-gold font-bold">Clareza pode chegar em 60 segundos...</span>
          </p>
          
          <MysticalCard variant="glowing" className="inline-block p-6">
            <CountdownTimer />
          </MysticalCard>
        </div>

        {/* Oferta Principal */}
        <div className="max-w-4xl mx-auto">
          <MysticalCard variant="ethereal" className="p-8 md:p-12 text-center space-y-8">
            
            {/* Gancho Emocional */}
            <div className="space-y-4">
              <div className="inline-block p-4 bg-mystic-gold/20 rounded-full">
                <Zap className="w-12 h-12 text-mystic-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-mystical-gradient">
                O Espelho da Alma
              </h2>
              <p className="text-xl text-mystic-cream/90 leading-relaxed">
                Por ter confiado na Avó Divina e baixado nosso guia, você desbloqueou um acesso único 
                à ferramenta mais poderosa para <span className="text-mystic-gold font-bold">análise instantânea</span> 
                da sua energia atual.
              </p>
            </div>

            {/* Benefícios */}
            <div className="grid md:grid-cols-3 gap-6">
              <MysticalCard className="p-6 text-center">
                <Clock className="w-8 h-8 text-mystic-gold mx-auto mb-4" />
                <h4 className="font-bold text-mystic-gold mb-2">Instantâneo</h4>
                <p className="text-sm text-mystic-cream/80">Receba sua análise personalizada em segundos</p>
              </MysticalCard>
              
              <MysticalCard className="p-6 text-center">
                <Star className="w-8 h-8 text-mystic-gold mx-auto mb-4" />
                <h4 className="font-bold text-mystic-gold mb-2">Personalizado</h4>
                <p className="text-sm text-mystic-cream/80">Baseado na sua data de nascimento e pergunta específica</p>
              </MysticalCard>
              
              <MysticalCard className="p-6 text-center">
                <Sparkles className="w-8 h-8 text-mystic-gold mx-auto mb-4" />
                <h4 className="font-bold text-mystic-gold mb-2">Preciso</h4>
                <p className="text-sm text-mystic-cream/80">Análise completa do Passado, Presente e Futuro</p>
              </MysticalCard>
            </div>

            {/* Preço */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-mystic-cream/70 line-through text-xl">De R$ 29,90</p>
                <p className="text-4xl md:text-6xl font-bold text-mystical-gradient">
                  por apenas R$ 9,90
                </p>
                <p className="text-mystic-gold">Oferta especial por tempo limitado</p>
              </div>
            </div>

            {/* Urgência */}
            <MysticalCard variant="glowing" className="p-6 bg-red-900/20 border-red-500/30">
              <p className="text-mystic-gold font-bold mb-2">⚠️ ATENÇÃO:</p>
              <p className="text-mystic-cream/90">
                Esta oferta especial é exclusiva para novos leitores e <span className="text-mystic-gold font-bold">
                desaparece quando o timer zerar</span>. Não a deixe escapar!
              </p>
            </MysticalCard>

            {/* Call to Actions */}
            <div className="space-y-4">
              <MysticalButton 
                variant="gold" 
                size="lg" 
                onClick={handlePurchase}
                className="w-full md:w-auto text-xl font-bold px-12 py-4 glow-effect"
              >
                🔮 SIM, QUERO MINHA ANÁLISE INSTANTÂNEA!
              </MysticalButton>
              
              <div className="text-center">
                <button 
                  onClick={skipOffer}
                  className="text-mystic-cream/60 hover:text-mystic-cream transition-colors underline text-sm"
                >
                  Não, obrigada. Apenas quero ler o e-book.
                </button>
              </div>
            </div>

            {/* Garantia */}
            <div className="text-center text-sm text-mystic-cream/70">
              <p>✅ Pagamento 100% seguro</p>
              <p>✅ Acesso imediato após a confirmação</p>
              <p>✅ Garantia de satisfação</p>
            </div>
          </MysticalCard>
        </div>

        {/* Depoimentos rápidos */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-mystical-gradient text-center mb-8">
            O que outras pessoas estão dizendo:
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <MysticalCard className="p-6">
              <p className="text-mystic-cream/90 italic mb-4">
                "Incrível como a análise foi certeira! Me ajudou a entender exatamente 
                o que estava acontecendo na minha vida."
              </p>
              <p className="text-mystic-gold font-semibold">- Maria, 34 anos</p>
            </MysticalCard>
            
            <MysticalCard className="p-6">
              <p className="text-mystic-cream/90 italic mb-4">
                "Em 60 segundos eu tinha as respostas que procurava há meses. 
                Valeu cada centavo!"
              </p>
              <p className="text-mystic-gold font-semibold">- Ana, 28 anos</p>
            </MysticalCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripwirePage;
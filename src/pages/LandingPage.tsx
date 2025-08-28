import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticalButton } from "@/components/MysticalButton";
import { MysticalCard } from "@/components/MysticalCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import mysticalHandHero from "@/assets/mystical-hand-hero.jpg";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      // Capturar parâmetros UTM da URL
      const urlParams = new URLSearchParams(window.location.search);
      const captureData = {
        email: email.trim(),
        name: name.trim(),
        source: "landing_page",
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign')
      };

      // Chamar edge function para capturar email
      const { data, error } = await supabase.functions.invoke('capture-email', {
        body: captureData
      });

      if (error) {
        console.error('Error capturing email:', error);
        toast({
          title: "Erro ao processar",
          description: "Houve um problema. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      // Sucesso - redirecionar para página tripwire
      toast({
        title: "Sucesso! ✨",
        description: "Redirecionando para sua oferta especial..."
      });
      
      setTimeout(() => {
        navigate("/tripwire", { state: { name } });
      }, 1500);

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${mysticalHandHero})` }}
        >
          <div className="absolute inset-0 bg-mystical-gradient opacity-80"></div>
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Texto Principal */}
              <div className="text-center lg:text-left space-y-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-mystical-gradient">Sua intuição</span>
                  <br />
                  <span className="text-mystic-cream">está sussurrando.</span>
                  <br />
                  <span className="text-mystic-gold-bright">Aprenda a ouvir</span>
                  <br />
                  <span className="text-mystic-cream">com clareza.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-mystic-cream/90 leading-relaxed">
                  Leia o presente guia gratuito <strong className="text-mystic-gold">"O Oráculo Interior"</strong> e descubra como usar o Tarô para iluminar suas decisões e encontrar a direção que você busca.
                </p>

                {/* Benefícios */}
                <div className="space-y-4 text-lg text-mystic-cream/80">
                  <div className="flex items-center space-x-3">
                    <span className="text-mystic-gold text-2xl">✨</span>
                    <span>Desvende os mitos e descubra o verdadeiro poder do Tarô</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-mystic-gold text-2xl">✨</span>
                    <span>Aprenda uma tiragem simples de 3 cartas que você pode usar hoje mesmo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-mystic-gold text-2xl">✨</span>
                    <span>Descubra como fazer as perguntas certas para obter respostas claras</span>
                  </div>
                </div>
              </div>

              {/* Formulário e Capa do E-book */}
              <div className="flex flex-col items-center space-y-8">
                <div className="float-animation">
                  <img 
                    src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png" 
                    alt="Capa do E-book O Oráculo Interior" 
                    className="w-64 md:w-80 shadow-mystical rounded-lg"
                  />
                </div>

                <MysticalCard variant="glowing" className="p-8 w-full max-w-md">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-mystical-gradient mb-2">
                        Receba seu Guia GRATUITO
                      </h3>
                      <p className="text-mystic-cream/80">
                        E inicie sua jornada de clareza agora mesmo
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-mystic-gold">Seu Nome</Label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream placeholder:text-mystic-cream/50"
                          placeholder="Como posso te chamar?"
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-mystic-gold">Seu E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream placeholder:text-mystic-cream/50"
                          placeholder="seu@email.com"
                  disabled={isLoading}
                        />
                      </div>
                    </div>

                    <MysticalButton 
                      type="submit" 
                      variant="gold" 
                      size="lg" 
                      className="w-full text-xl font-bold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          PROCESSANDO...
                        </>
                      ) : (
                        <>
                          🔮 QUERO MEU GUIA GRATUITO!
                        </>
                      )}
                    </MysticalButton>

                    <p className="text-xs text-mystic-cream/60 text-center">
                      Seus dados estão seguros. Não enviamos spam.
                    </p>
                  </form>
                </MysticalCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
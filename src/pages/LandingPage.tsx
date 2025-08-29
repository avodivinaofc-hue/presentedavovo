import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticalButton } from "@/components/MysticalButton";
import { MysticalCard } from "@/components/MysticalCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
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
      console.log("Iniciando processo de captura...");
      console.log("Nome:", name);
      console.log("Email:", email);
      
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sucesso - redirecionar para página tripwire
      toast({
        title: "Sucesso! ✨",
        description: "Redirecionando para sua oferta especial..."
      });
      
      console.log("Redirecionando para /tripwire...");
      
      setTimeout(() => {
        try {
          navigate("/tripwire", { state: { name } });
          console.log("Navegação executada com sucesso");
        } catch (navError) {
          console.error("Erro na navegação:", navError);
          // Fallback: tentar navegação simples
          window.location.href = "/tripwire";
        }
      }, 1500);

    } catch (error) {
      console.error('Unexpected error:', error);
      
      toast({
        title: "Erro inesperado",
        description: "Tentando navegação alternativa...",
      });
      
      // Fallback: navegação direta
      setTimeout(() => {
        try {
          navigate("/tripwire", { state: { name } });
        } catch (navError) {
          console.error("Erro na navegação alternativa:", navError);
          window.location.href = "/tripwire";
        }
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de teste para navegação direta
  const testNavigation = () => {
    console.log("Testando navegação direta...");
    toast({
      title: "Teste de navegação",
      description: "Redirecionando para tripwire...",
    });
    
    setTimeout(() => {
      try {
        navigate("/tripwire", { state: { name: "Teste" } });
        console.log("Teste de navegação executado com sucesso");
      } catch (error) {
        console.error("Erro no teste de navegação:", error);
        window.location.href = "/tripwire";
      }
    }, 1000);
  };

  // Função de teste com window.location
  const testWindowLocation = () => {
    console.log("Testando window.location...");
    toast({
      title: "Teste window.location",
      description: "Redirecionando...",
    });
    
    setTimeout(() => {
      window.location.href = "/tripwire";
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center pt-20 sm:pt-16 md:pt-0"
          style={{ backgroundImage: `url(${mysticalHandHero})` }}
        >
          <div className="absolute inset-0 bg-mystical-gradient opacity-80"></div>
          <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto">
              {/* Layout Mobile-First: Empilhado em mobile, lado a lado em desktop */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
                
                {/* Texto Principal - Centralizado em mobile, alinhado à esquerda em desktop */}
                <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
                    <span className="text-mystical-gradient">Sua intuição</span>
                    <br className="hidden sm:block" />
                    <span className="text-foreground">está sussurrando.</span>
                    <br className="hidden sm:block" />
                    <span className="text-primary">Aprenda a ouvir</span>
                    <br className="hidden sm:block" />
                    <span className="text-foreground">com clareza.</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed px-2 sm:px-0">
                    Leia o presente guia gratuito <strong className="text-primary">"O Oráculo Interior"</strong> e descubra como usar o Tarô para iluminar suas decisões e encontrar a direção que você busca.
                  </p>

                  {/* Benefícios - Melhor espaçamento em mobile */}
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-foreground/80 px-4 sm:px-0">
                    <div className="flex items-start space-x-3">
                      <span className="text-primary text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-left">Desvende os mitos e descubra o verdadeiro poder do Tarô</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-left">Aprenda uma tiragem simples de 3 cartas que você pode usar hoje mesmo</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-left">Descubra como fazer as perguntas certas para obter respostas claras</span>
                    </div>
                  </div>

                  {/* Botões de teste para navegação */}
                  <div className="pt-4 space-y-2">
                    <MysticalButton 
                      onClick={testNavigation}
                      variant="mystical" 
                      size="sm"
                      className="text-xs mr-2"
                    >
                      🧪 Testar useNavigate
                    </MysticalButton>
                    
                    <MysticalButton 
                      onClick={testWindowLocation}
                      variant="mystical" 
                      size="sm"
                      className="text-xs"
                    >
                      🌐 Testar window.location
                    </MysticalButton>
                  </div>
                </div>

                {/* Formulário e Capa do E-book - Primeiro em mobile, segundo em desktop */}
                <div className="flex flex-col items-center space-y-6 sm:space-y-8 lg:space-y-10 order-1 lg:order-2 w-full max-w-sm sm:max-w-md lg:max-w-lg">
                  {/* Capa do E-book - Tamanhos responsivos */}
                  <div className="float-animation">
                    <img 
                      src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png" 
                      alt="Capa do E-book O Oráculo Interior" 
                      className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-auto shadow-mystical rounded-lg"
                    />
                  </div>

                  {/* Formulário - Melhor padding e espaçamento em mobile */}
                  <MysticalCard variant="glowing" className="w-full p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                      <div className="text-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-mystical-gradient mb-2">
                          Receba seu Guia GRATUITO
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                          E inicie sua jornada de clareza agora mesmo
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-primary text-sm sm:text-base">Seu Nome</Label>
                          <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground h-12 sm:h-14 text-sm sm:text-base"
                            placeholder="Como posso te chamar?"
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email" className="text-primary text-sm sm:text-base">Seu E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground h-12 sm:h-14 text-sm sm:text-base"
                            placeholder="seu@email.com"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <MysticalButton 
                        type="submit" 
                        variant="gold" 
                        size="lg" 
                        className="w-full h-12 sm:h-14 text-base sm:text-lg lg:text-xl font-bold"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                            <span className="text-sm sm:text-base">PROCESSANDO...</span>
                          </>
                        ) : (
                          <>
                            🔮 QUERO MEU GUIA GRATUITO!
                          </>
                        )}
                      </MysticalButton>

                      <p className="text-xs text-muted-foreground text-center px-2">
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
    </div>
  );
};

export default LandingPage;
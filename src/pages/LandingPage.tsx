import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticalButton } from "@/components/MysticalButton";
import { MysticalCard } from "@/components/MysticalCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background místico original */}
      <div className="absolute inset-0 bg-mystical-gradient opacity-90"></div>
      
      {/* Imagem de fundo hero */}
      <div className="absolute inset-0">
        <img 
          src="/src/assets/mystical-hand-hero.jpg" 
          alt="Mão mística com cartas de tarô"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      {/* FloatingParticles */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="min-h-screen flex items-center justify-center pt-16 sm:pt-12 md:pt-8">
          <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
            <div className="max-w-6xl mx-auto">
              {/* Layout Mobile-First: Empilhado em mobile, lado a lado em desktop */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
                
                {/* Texto Principal */}
                <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-white font-['Arial_Black']">
                    <span className="text-yellow-400">Sua intuição</span>
                    <br className="hidden sm:block" />
                    <span className="text-white">está sussurrando.</span>
                    <br className="hidden sm:block" />
                    <span className="text-yellow-400">Aprenda a ouvir</span>
                    <br className="hidden sm:block" />
                    <span className="text-white">com clareza.</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed px-2 sm:px-0 font-['Arial_Black']">
                    Leia o presente guia gratuito <strong className="text-yellow-400">"O Oráculo Interior"</strong> e descubra como usar o Tarô para iluminar suas decisões e encontrar a direção que você busca.
                  </p>

                  {/* Benefícios */}
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-gray-300 px-3 sm:px-0 font-['Arial_Black']">
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-400 text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-left leading-tight">Desvende os mitos e descubra o verdadeiro poder do Tarô</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-400 text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-left leading-tight">Aprenda uma tiragem simples de 3 cartas que você pode usar hoje mesmo</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-400 text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-left leading-tight">Descubra como fazer as perguntas certas para obter respostas claras</span>
                    </div>
                  </div>
                </div>

                {/* Formulário e Capa do E-book */}
                <div className="flex flex-col items-center space-y-6 sm:space-y-8 lg:space-y-10 order-1 lg:order-2 w-full max-w-sm sm:max-w-md lg:max-w-lg">
                  {/* Capa do E-book */}
                  <div className="animate-bounce">
                    <img 
                      src="/src/assets/ebook-cover.jpg" 
                      alt="Capa do E-book O Oráculo Interior"
                      className="w-36 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-44 sm:h-48 md:h-52 lg:h-56 object-cover rounded-lg shadow-2xl"
                    />
                  </div>

                  {/* Formulário */}
                  <MysticalCard className="w-full p-3 sm:p-4 md:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                      <div className="text-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-400 mb-2 font-['Arial_Black']">
                          Receba seu Guia GRATUITO
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-400 font-['Arial_Black']">
                          E inicie sua jornada de clareza agora mesmo
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-yellow-400 text-sm sm:text-base font-['Arial_Black']">Seu Nome</Label>
                          <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-12 sm:h-14 text-sm sm:text-base font-['Arial_Black']"
                            placeholder="Como posso te chamar?"
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email" className="text-yellow-400 text-sm sm:text-base font-['Arial_Black']">Seu E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-12 sm:h-14 text-sm sm:text-base font-['Arial_Black']"
                            placeholder="seu@email.com"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <MysticalButton 
                        type="submit" 
                        variant="gold" 
                        size="lg" 
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg lg:text-xl font-bold font-['Arial_Black']"
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

                      <p className="text-xs text-gray-400 text-center px-2 font-['Arial_Black']">
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
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
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, digite seu nome.",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: "Email obrigatório", 
        description: "Por favor, digite seu email.",
        variant: "destructive",
      });
      return;
    }

    if (!emailRegex.test(email.trim())) {
      toast({
        title: "Email inválido",
        description: "Por favor, digite um email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("🚀 Starting form submission...");
      
      // Capture UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content')
      };
      
      // Call capture-email function
      const response = await fetch('https://eywqybkwinmbpxkmdfkj.supabase.co/functions/v1/capture-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d3F5Ymt3aW5tYnB4a21kZmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNzA3MTQsImV4cCI6MjA2Njc0NjcxNH0.IzloGBQNXbb1bjvaarF8OcT9QKmpt-m9GXFoIS4rez0`
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          source: 'landing_page',
          ...utmData
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log("✅ Email captured successfully");
        
        toast({
          title: "Sucesso! ✨",
          description: "Redirecionando para sua oferta especial...",
        });
        
        // Navigate to tripwire page
        console.log("🧭 Navigating to /tripwire...");
        
        setTimeout(() => {
          try {
            navigate('/tripwire', { 
              state: { name: name.trim() },
              replace: true 
            });
            console.log("✅ Navigation successful");
          } catch (navError) {
            console.error("❌ Navigation failed, trying fallback:", navError);
            window.location.href = '/tripwire';
          }
        }, 1500);
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
      
    } catch (error) {
      console.error("❌ Error during submission:", error);
      
      // Show error but still redirect (offline mode)
      toast({
        title: "Processando...",
        description: "Redirecionando você para a próxima etapa.",
      });
      
      // Navigate anyway to not block user flow
      setTimeout(() => {
        try {
          navigate('/tripwire', { 
            state: { name: name.trim() },
            replace: true 
          });
        } catch (navError) {
          window.location.href = '/tripwire';
        }
      }, 1500);
      
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
          src="src/assets/mystical-hand-hero.jpg" 
          alt="Mão mística com cartas de tarô"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      {/* FloatingParticles */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="min-h-screen flex items-center justify-center pt-20 sm:pt-16 md:pt-0">
          <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto">
              {/* Layout Mobile-First: Empilhado em mobile, lado a lado em desktop */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
                
                {/* Texto Principal */}
                <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-white">
                    <span className="text-yellow-400">Sua intuição</span>
                    <br className="hidden sm:block" />
                    <span className="text-white">está sussurrando.</span>
                    <br className="hidden sm:block" />
                    <span className="text-yellow-400">Aprenda a ouvir</span>
                    <br className="hidden sm:block" />
                    <span className="text-white">com clareza.</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed px-2 sm:px-0">
                    Leia o presente guia gratuito <strong className="text-yellow-400">"O Oráculo Interior"</strong> e descubra como usar o Tarô para iluminar suas decisões e encontrar a direção que você busca.
                  </p>

                  {/* Benefícios */}
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-gray-300 px-4 sm:px-0">
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-400 text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-left">Desvende os mitos e descubra o verdadeiro poder do Tarô</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-400 text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-left">Aprenda uma tiragem simples de 3 cartas que você pode usar hoje mesmo</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-400 text-lg sm:text-xl lg:text-2xl flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-left">Descubra como fazer as perguntas certas para obter respostas claras</span>
                    </div>
                  </div>
                </div>

                {/* Formulário e Capa do E-book */}
                <div className="flex flex-col items-center space-y-6 sm:space-y-8 lg:space-y-10 order-1 lg:order-2 w-full max-w-sm sm:max-w-md lg:max-w-lg">
                  {/* Capa do E-book */}
                  <div className="animate-bounce">
                    <img 
                      src="/lovable-uploads/a005281f-af52-4503-b064-f3249ed27e88.png" 
                      alt="Capa do E-book O Oráculo Interior"
                      className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-auto object-cover rounded-lg shadow-2xl"
                    />
                  </div>

                  {/* Formulário */}
                  <MysticalCard className="w-full p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                      <div className="text-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-400 mb-2">
                          Receba seu Guia GRATUITO
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-400">
                          E inicie sua jornada de clareza agora mesmo
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-yellow-400 text-sm sm:text-base">Seu Nome</Label>
                          <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-12 sm:h-14 text-sm sm:text-base"
                            placeholder="Como posso te chamar?"
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email" className="text-yellow-400 text-sm sm:text-base">Seu E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-12 sm:h-14 text-sm sm:text-base"
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

                      <p className="text-xs text-gray-400 text-center px-2">
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
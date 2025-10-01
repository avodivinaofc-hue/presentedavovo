import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticalButton } from "@/components/MysticalButton";
import { MysticalCard } from "@/components/MysticalCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutModal } from "@/components/CheckoutModal";
import { UrgencyCountdown } from "@/components/UrgencyCountdown";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { Star, CheckCircle, Gift, Heart, Sparkles, Users, BookOpen, Gem, Shield, Zap } from "lucide-react";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [orderBump, setOrderBump] = useState(false);
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
        title: "Sucesso! ",
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
      title: "Pagamento realizado! ",
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* FloatingParticles */}
      <FloatingParticles />
      
      {/* 1. SEÇÃO PRINCIPAL (HERO SECTION) - OTIMIZADA PARA MOBILE */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Layout Mobile-First: Empilhado verticalmente */}
          <div className="flex flex-col items-center space-y-8">
            
            {/* Imagem Principal - Primeiro no mobile */}
            <div className="flex justify-center w-full">
              <div className="relative">
                <img 
                  src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png" 
                  alt="Capa do E-book O Presente da Vovó Divina"
                  className="w-64 h-auto object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full font-bold text-lg animate-pulse">
                  R$ 9,90
                </div>
                <div className="absolute -bottom-3 -left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm animate-bounce">
                  -75%
                </div>
              </div>
            </div>

            {/* Texto Principal - Segundo no mobile */}
            <div className="text-center space-y-6 w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white font-['Playfair_Display'] px-4">
                Pare de andar no escuro.{" "}
                <span className="text-yellow-400">Descubra seu destino</span>{" "}
                e tenha clareza nas decisões com o guia completo da{" "}
                <span className="text-pink-300">Vovó Divina</span>.
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-['Poppins'] px-6">
                O e-book que já ajudou mais de{" "}
                <span className="text-yellow-400 font-bold">29 mil pessoas</span>{" "}
                a desvendarem os segredos do tarot e a encontrarem o próprio caminho.
              </p>

              {/* Botão CTA Principal - Verde pulsante com mais espaçamento */}
              <div className="pt-6 px-6 w-full">
                <MysticalButton 
                  onClick={() => {
                    const form = document.getElementById('main-form');
                    if (form) form.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="green-pulse" 
                  size="lg" 
                  className="w-full text-base sm:text-lg font-bold py-6 px-6 font-['Poppins'] min-h-[90px] mx-auto max-w-lg"
                >
                  <div className="text-center">
                    <div>QUERO MEU PRESENTE AGORA!</div>
                    <div className="text-sm sm:text-base">(R$ 9,90 - 75% OFF)</div>
                  </div>
                </MysticalButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DE PROBLEMA E SOLUÇÃO - OTIMIZADA PARA MOBILE */}
      <section className="py-12 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-['Playfair_Display'] px-4">
              Você se sente perdido(a), sem saber qual caminho seguir?
            </h2>
          </div>

          <div className="space-y-8">
            {/* Problemas - Stack vertical no mobile */}
            <div className="space-y-6 px-4">
              <div className="flex items-start space-x-4">
                <Heart className="text-pink-400 text-2xl mt-1 flex-shrink-0" />
                <p className="text-base sm:text-lg text-gray-300 font-['Poppins']">
                  Você já se sentiu sem rumo, com dúvidas sobre trabalho, amor ou finanças?
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="text-blue-400 text-2xl mt-1 flex-shrink-0" />
                <p className="text-base sm:text-lg text-gray-300 font-['Poppins']">
                  Já desejou ter um guia confiável para tomar as melhores decisões?
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <Sparkles className="text-purple-400 text-2xl mt-1 flex-shrink-0" />
                <p className="text-base sm:text-lg text-gray-300 font-['Poppins']">
                  Acha que a vida é mais do que apenas o que vemos, e quer se conectar com sua intuição?
                </p>
              </div>
            </div>

            {/* Solução */}
            <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 p-6 mx-4 rounded-2xl border border-purple-400/20">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 font-['Playfair_Display']">
                A Solução Está Aqui
              </h3>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-['Poppins']">
                O e-book <strong className="text-pink-300">"O Presente da Vovó Divina"</strong> é a resposta. 
                Criado a partir de um conhecimento ancestral, ele te dá as ferramentas para ler os sinais 
                do universo e encontrar o seu próprio caminho com confiança e sabedoria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO "O QUE VOCÊ VAI APRENDER" - OTIMIZADA PARA MOBILE */}
      <section className="py-12 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-['Playfair_Display'] px-4">
              O que você vai encontrar no seu E-book:
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-purple-400/20 hover:border-yellow-400/50 transition-all duration-300">
              <BookOpen className="text-yellow-400 text-3xl mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-['Poppins']">
                O Básico do Tarot
              </h3>
              <p className="text-sm sm:text-base text-gray-300 font-['Poppins']">
                Aprenda a decifrar cada carta, mesmo que você seja um(a) completo(a) iniciante.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-purple-400/20 hover:border-yellow-400/50 transition-all duration-300">
              <Zap className="text-pink-400 text-3xl mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-['Poppins']">
                Leituras Práticas
              </h3>
              <p className="text-sm sm:text-base text-gray-300 font-['Poppins']">
                Descubra como fazer suas próprias tiragens para obter respostas imediatas sobre amor, carreira e dinheiro.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-purple-400/20 hover:border-yellow-400/50 transition-all duration-300">
              <Heart className="text-purple-400 text-3xl mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-['Poppins']">
                Conexão Espiritual
              </h3>
              <p className="text-sm sm:text-base text-gray-300 font-['Poppins']">
                Guia para se conectar com sua intuição e a energia das cartas.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-purple-400/20 hover:border-yellow-400/50 transition-all duration-300">
              <Shield className="text-blue-400 text-3xl mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-['Poppins']">
                Mitos e Verdades
              </h3>
              <p className="text-sm sm:text-base text-gray-300 font-['Poppins']">
                Separe o que é real do que é crença popular para ter leituras mais assertivas.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-purple-400/20 hover:border-yellow-400/50 transition-all duration-300 sm:col-span-2">
              <Gem className="text-green-400 text-3xl mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-['Poppins']">
                Bônus Especial
              </h3>
              <p className="text-sm sm:text-base text-gray-300 font-['Poppins']">
                Um guia sobre os 7 cristais mais poderosos para a sua jornada espiritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO DE PROVA SOCIAL - OTIMIZADA PARA MOBILE */}
      <section className="py-12 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-['Playfair_Display'] px-4">
              Mais de 6.000 pessoas já transformaram suas vidas!
            </h2>
          </div>

          <div className="space-y-6 px-4">
            <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 p-6 rounded-xl border border-purple-400/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-purple-900 font-bold text-lg">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold font-['Poppins']">Ana, 29 anos</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-200 italic font-['Poppins'] text-sm sm:text-base">
                "Eu estava completamente perdida depois de um término. O e-book da Vovó Divina me ajudou a entender o que estava acontecendo e me deu forças para recomeçar. As tiragens são muito precisas!"
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 p-6 rounded-xl border border-purple-400/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-purple-900 font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold font-['Poppins']">Marcos, 35 anos</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-200 italic font-['Poppins'] text-sm sm:text-base">
                "Sempre tive curiosidade sobre tarot, mas achava muito complicado. O guia da Vovó é simples e didático. Já estou fazendo leituras para meus amigos!"
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 p-6 rounded-xl border border-purple-400/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-purple-900 font-bold text-lg">
                  C
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold font-['Poppins']">Carla, 42 anos</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-200 italic font-['Poppins'] text-sm sm:text-base">
                "O e-book mudou minha vida! Agora tenho clareza nas minhas decisões e me sinto mais conectada com minha intuição. Recomendo para todos!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO DE AUTORIDADE - OTIMIZADA PARA MOBILE */}
      <section className="py-12 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-['Playfair_Display'] px-4">
              Quem é a Vovó Divina?
            </h2>
          </div>

          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/vovo-divina-nova.jpeg.png" 
                  alt="Vovó Divina - Guardiã do conhecimento milenar"
                  className="w-48 h-48 object-cover rounded-full border-4 border-yellow-400 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full font-bold text-sm">
                   Mestra
                </div>
              </div>
            </div>

            <div className="space-y-6 text-center px-4">
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-['Poppins']">
                A <strong className="text-pink-300">Vovó Divina</strong> é a guardiã de um conhecimento milenar sobre o tarot. 
                Por décadas, ela usou sua sabedoria para guiar pessoas através das encruzilhadas da vida. 
                Agora, ela compartilha seus segredos neste guia para que você também possa encontrar o seu caminho.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <CheckCircle className="text-yellow-400 text-2xl" />
                  <span className="text-gray-200 font-['Poppins'] text-sm sm:text-base">Mais de 30 anos de experiência</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <Users className="text-yellow-400 text-2xl" />
                  <span className="text-gray-200 font-['Poppins'] text-sm sm:text-base">Mais de 29 mil vidas transformadas</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <Heart className="text-yellow-400 text-2xl" />
                  <span className="text-gray-200 font-['Poppins'] text-sm sm:text-base">Conhecimento ancestral autêntico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO DE FINALIZAÇÃO COM FORMULÁRIO - OTIMIZADA PARA MOBILE */}
      <section id="main-form" className="py-12 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-['Playfair_Display'] px-4">
              Garante seu Presente da Vovó Divina
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 font-['Poppins'] px-6">
              Comece sua jornada de autoconhecimento hoje mesmo
            </p>
          </div>

          <div className="space-y-8">
            {/* Capa do E-book */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png" 
                  alt="Capa do E-book O Presente da Vovó Divina"
                  className="w-56 h-auto object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full font-bold text-lg animate-pulse">
                  R$ 9,90
                </div>
                <div className="absolute -bottom-3 -left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm animate-bounce">
                  -75%
                </div>
              </div>
            </div>

            {/* Formulário */}
            <MysticalCard className="p-6 mx-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 font-['Playfair_Display']">
                    Adquira seu Guia Completo
                  </h3>
                  <div className="space-y-2">
                    <div className="text-base sm:text-lg text-gray-400 line-through font-['Poppins']">
                      De R$ 39,90
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-400 font-['Poppins']">
                      Por apenas R$ 9,90
                    </div>
                    <div className="text-sm sm:text-base text-green-400 font-bold font-['Poppins']">
                      Economia de R$ 30,00! (75% OFF)
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-yellow-400 text-base sm:text-lg font-['Poppins']">Seu Nome</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-12 sm:h-14 text-base font-['Poppins'] mt-2"
                      placeholder="Como posso te chamar?"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-yellow-400 text-base sm:text-lg font-['Poppins']">Seu E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-12 sm:h-14 text-base font-['Poppins'] mt-2"
                      placeholder="seu@email.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Order Bump - Otimizado para mobile */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-pink-400/20 p-4 rounded-lg border border-yellow-400/30">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="order-bump"
                      checked={orderBump}
                      onChange={(e) => setOrderBump(e.target.checked)}
                      className="mt-1 w-5 h-5 text-yellow-400"
                    />
                    <div className="flex-1">
                      <label htmlFor="order-bump" className="text-white font-bold text-base sm:text-lg font-['Poppins'] cursor-pointer">
                        Oferta Especial: Não vá embora sem isso!
                      </label>
                      <p className="text-gray-300 text-sm mt-1 font-['Poppins']">
                        Adicione a Plataforma de Tiragens Exclusiva e receba 10 consultas personalizadas com o time de especialistas da Vovó Divina.
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-gray-400 line-through text-sm">De R$ 69,90</span>
                        <span className="text-yellow-400 font-bold text-sm sm:text-base">por apenas R$ 34,53</span>
                        <span className="text-red-400 font-bold text-xs bg-red-500/20 px-2 py-1 rounded">-51% OFF</span>
                      </div>
                    </div>
                  </div>
                </div>

                <MysticalButton 
                  type="submit" 
                  variant="green-pulse" 
                  size="lg" 
                  className="w-full text-base sm:text-lg font-bold font-['Poppins'] mt-6 py-6 px-6 min-h-[90px]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      PROCESSANDO...
                    </>
                  ) : (
                    <div className="text-center">
                      <div>QUERO MEU PRESENTE AGORA!</div>
                      <div className="text-sm sm:text-base">(R$ 9,90 - 75% OFF)</div>
                    </div>
                  )}
                </MysticalButton>

                <p className="text-xs sm:text-sm text-gray-400 text-center font-['Poppins']">
                  Seus dados estão seguros. Não enviamos spam.
                </p>
              </form>
            </MysticalCard>
          </div>
        </div>
      </section>

      {/* Modal de Checkout */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={handleCheckoutClose}
        onPaymentComplete={handlePaymentComplete}
        productName="O Presente da Vovó Divina"
        productPrice={9.90}
        customerName={name}
        customerEmail={email}
        productImage="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png"
      />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

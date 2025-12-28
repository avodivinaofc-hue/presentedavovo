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
import { Star, CheckCircle, Gift, Heart, Sparkles, Users, BookOpen, Gem, Shield, Zap, Lock } from "lucide-react";

const LandingPagePT = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 overflow-x-hidden">
      {/* FloatingParticles */}
      <FloatingParticles />

      {/* 1. SEÇÃO PRINCIPAL (HERO SECTION) - OTIMIZADA PARA MOBILE */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-12 sm:py-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[80px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Layout Mobile-First: Empilhado verticalmente */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

            {/* Texto Principal - Primeiro no mobile para hierarquia visual */}
            <div className="flex-1 text-center lg:text-left space-y-6 order-2 lg:order-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-2">
                <span className="text-yellow-400 text-sm font-semibold tracking-wide uppercase">Revelação Mística</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white font-['Playfair_Display'] tracking-tight drop-shadow-lg">
                Pare de andar no escuro.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
                  Descubra seu destino
                </span>
                {" "}e tenha clareza nas decisões.
              </h1>

              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-['Poppins'] max-w-2xl mx-auto lg:mx-0 hyphens-auto text-justify sm:text-left">
                O guia completo da <span className="text-pink-300 font-semibold">Vovó Divina</span> que já ajudou mais de{" "}
                <span className="text-yellow-400 font-bold border-b border-yellow-400/50">29 mil pessoas</span>{" "}
                a desvendarem os segredos do tarot.
              </p>

              {/* Botão CTA Principal */}
              <div className="pt-4 flex flex-col items-center lg:items-start w-full">
                <MysticalButton
                  onClick={() => {
                    const form = document.getElementById('main-form');
                    if (form) form.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="green-pulse"
                  size="lg"
                  className="w-full sm:w-auto text-lg font-bold py-8 px-10 shadow-[0_0_40px_-10px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_-10px_rgba(34,197,94,0.8)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-center flex flex-col items-center">
                    <span className="tracking-wide">QUERO MEU PRESENTE AGORA!</span>
                    <span className="text-sm font-normal opacity-90 mt-1">Oferta por tempo limitado</span>
                  </div>
                </MysticalButton>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Compra 100% Segura e Garantida</span>
                </div>
              </div>
            </div>

            {/* Imagem Principal */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[320px] sm:max-w-md lg:max-w-none order-1 lg:order-2">
              {/* Texto de Desconto - Pedido do Usuário */}
              <div className="mb-4 text-center">
                <p className="text-red-500 font-bold text-lg sm:text-xl uppercase tracking-wider drop-shadow-sm animate-pulse">
                  Desconto apenas para os meus seguidores fiéis
                </p>
              </div>

              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <img
                  src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png"
                  alt="Capa do E-book O Presente da Vovó Divina"
                  className="relative w-full h-auto object-contain rounded-xl shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] border border-white/10"
                />

                {/* Badges Flutuantes */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 px-4 py-2 rounded-full font-bold text-lg shadow-lg animate-bounce-slow z-20">
                  R$ 9,90
                </div>
                <div className="absolute -bottom-4 -left-4 bg-red-600 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg border border-red-400 z-20">
                  -75% OFF
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DE PROBLEMA E SOLUÇÃO */}
      <section className="py-16 sm:py-20 bg-black/20 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-['Playfair_Display'] leading-tight">
              Você se sente perdido(a), sem saber qual caminho seguir?
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Problemas */}
            <div className="space-y-8">
              {[
                { icon: Heart, color: "text-pink-400", text: "Você já se sentiu sem rumo, com dúvidas sobre trabalho, amor ou finanças?" },
                { icon: Shield, color: "text-blue-400", text: "Já desejou ter um guia confiável para tomar as melhores decisões?" },
                { icon: Sparkles, color: "text-purple-400", text: "Acha que a vida é mais do que apenas o que vemos, e quer se conectar com sua intuição?" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                  <div className={`p-3 rounded-full bg-white/5 ${item.color} shadow-inner`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="text-lg text-gray-200 font-['Poppins'] leading-relaxed pt-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Solução */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-20" />
              <div className="relative bg-gradient-to-br from-gray-900 to-purple-950 p-8 sm:p-10 rounded-2xl border border-purple-500/30 shadow-2xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 font-['Playfair_Display']">
                  A Solução Está Aqui
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed font-['Poppins'] mb-6">
                  O e-book <strong className="text-white">"O Presente da Vovó Divina"</strong> é a chave que você procurava.
                </p>
                <p className="text-gray-300 leading-relaxed font-['Poppins']">
                  Criado a partir de um conhecimento ancestral, ele te entrega as ferramentas exatas para ler os sinais
                  do universo e encontrar o seu próprio caminho com <span className="text-yellow-400 font-semibold">confiança e sabedoria</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO "O QUE VOCÊ VAI APRENDER" */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900/20" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-['Playfair_Display']">
              O que você vai encontrar
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Um conteúdo preparado com carinho para transformar sua visão de mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {[
              { icon: BookOpen, color: "text-yellow-400", title: "O Básico do Tarot", desc: "Aprenda a decifrar cada carta de forma simples e direta." },
              { icon: Zap, color: "text-pink-400", title: "Leituras Práticas", desc: "Faça suas próprias tiragens para obter respostas imediatas." },
              { icon: Heart, color: "text-purple-400", title: "Conexão Espiritual", desc: "Guia para se conectar com sua intuição profunda." },
              { icon: Shield, color: "text-blue-400", title: "Mitos e Verdades", desc: "Separe o real do imaginário para leituras assertivas." }
            ].map((item, i) => (
              <div key={i} className="group bg-white/5 hover:bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                <item.icon className={`${item.color} w-10 h-10 mb-6 transform group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-bold text-white mb-3 font-['Poppins']">
                  {item.title}
                </h3>
                <p className="text-gray-300 font-['Poppins'] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

            <div className="sm:col-span-2 bg-gradient-to-r from-green-900/40 to-emerald-900/40 backdrop-blur-md p-8 rounded-2xl border border-green-500/30 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="p-4 bg-green-500/20 rounded-full">
                <Gem className="text-green-400 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Poppins']">
                  Bônus Exclusivo
                </h3>
                <p className="text-gray-300 font-['Poppins']">
                  Um guia completo sobre os <span className="text-green-300 font-semibold">7 cristais mais poderosos</span> para potencializar sua jornada espiritual e proteção energética.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO DE PROVA SOCIAL */}
      <section className="py-16 bg-black/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-['Playfair_Display']">
              Histórias Reais
            </h2>
            <p className="text-purple-200 text-lg">
              Junte-se a mais de 6.000 pessoas transformadas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ana", age: "29", initial: "A", quote: "Eu estava completamente perdida depois de um término. O e-book me deu forças para recomeçar." },
              { name: "Marcos", age: "35", initial: "M", quote: "Sempre tive curiosidade, mas achava complicado. O guia é simples e muito didático." },
              { name: "Carla", age: "42", initial: "C", quote: "Mudou minha vida! Agora tenho clareza nas decisões e me sinto conectada com minha intuição." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5 relative">
                <div className="text-yellow-400 text-4xl leading-none font-serif absolute top-6 left-6 opacity-20">"</div>
                <div className="flex items-center mb-6 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.initial}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-bold font-['Poppins']">{testimonial.name}, {testimonial.age} anos</h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic font-['Poppins'] text-sm leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO DE AUTORIDADE */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-indigo-950 to-purple-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-20" />
            <img
              src="/lovable-uploads/vovo-divina-nova.jpeg.png"
              alt="Vovó Divina"
              className="relative w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-yellow-400 shadow-2xl mx-auto"
            />
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-purple-950 px-4 py-1 rounded-full font-bold text-sm shadow-lg whitespace-nowrap">
              Mestra do Tarot
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-['Playfair_Display']">
            Vovó Divina
          </h2>

          <p className="text-lg text-gray-200 leading-relaxed font-['Poppins'] mb-10 max-w-2xl mx-auto">
            Guardiã de um conhecimento milenar. Por décadas, ela usou sua sabedoria para guiar pessoas através das encruzilhadas da vida.
            Agora, seus segredos estão disponíveis para você.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 p-4 rounded-xl">
              <span className="block text-3xl font-bold text-yellow-400 mb-1">30+</span>
              <span className="text-gray-400 text-sm">Anos de Experiência</span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <span className="block text-3xl font-bold text-yellow-400 mb-1">29k+</span>
              <span className="text-gray-400 text-sm">Vidas Impactadas</span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <span className="block text-3xl font-bold text-yellow-400 mb-1">100%</span>
              <span className="text-gray-400 text-sm">Autêntico</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO DE FINALIZAÇÃO COM FORMULÁRIO */}
      <section id="main-form" className="py-16 sm:py-24 bg-gradient-to-t from-black to-purple-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Playfair_Display']">
              Seu Destino Espera
            </h2>
            <p className="text-lg text-gray-300 font-['Poppins']">
              Comece sua jornada de autoconhecimento hoje mesmo
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* Lado Esquerdo - Info do Produto */}
              <div className="text-center md:text-left space-y-6">
                <div className="relative w-48 mx-auto md:mx-0">
                  <img
                    src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png"
                    alt="Capa E-book"
                    className="w-full rounded-lg shadow-2xl transform rotate-[-5deg]"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-purple-900 font-bold px-3 py-1 rounded-full text-sm">
                    Versão Digital
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-gray-400 line-through text-lg">De R$ 39,90</div>
                  <div className="text-4xl font-bold text-white">R$ 9,90</div>
                  <div className="text-green-400 text-sm font-semibold bg-green-900/30 inline-block px-3 py-1 rounded-full">
                    Economia de 75%
                  </div>
                </div>
              </div>

              {/* Lado Direito - Formulário */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-200 text-base font-medium ml-1">Seu Nome</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-black/40 border-white/10 text-white placeholder:text-gray-500 h-12 text-lg focus:border-yellow-400/50 transition-colors"
                      placeholder="Digite seu nome..."
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-200 text-base font-medium ml-1">Seu Melhor E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/40 border-white/10 text-white placeholder:text-gray-500 h-12 text-lg focus:border-yellow-400/50 transition-colors"
                      placeholder="exemplo@email.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Order Bump Moderno */}
                <div className="bg-amber-900/20 p-4 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-colors cursor-pointer" onClick={() => setOrderBump(!orderBump)}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <input
                        type="checkbox"
                        id="order-bump"
                        checked={orderBump}
                        onChange={(e) => setOrderBump(e.target.checked)}
                        className="w-5 h-5 accent-yellow-400 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div>
                      <label htmlFor="order-bump" className="text-white font-bold text-base cursor-pointer block mb-1">
                        Quero acesso à Plataforma de Tiragens
                      </label>
                      <p className="text-gray-400 text-sm leading-snug">
                        Receba +10 consultas personalizadas com nosso time.
                      </p>
                      <div className="mt-2 text-sm font-semibold">
                        <span className="text-yellow-400">Por apenas +R$ 24,90</span>
                      </div>
                    </div>
                  </div>
                </div>

                <MysticalButton
                  type="submit"
                  variant="green-pulse"
                  size="lg"
                  className="w-full text-lg font-bold py-6 shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processando...' : 'COMPRAR AGORA'}
                </MysticalButton>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  Seus dados estão protegidos por criptografia de ponta a ponta.
                </div>
              </form>
            </div>
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

export default LandingPagePT;

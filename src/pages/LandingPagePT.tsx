import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckoutModal } from "@/components/CheckoutModal";
import Footer from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { 
  Shield, 
  Zap, 
  CheckCircle2, 
  Star, 
  Heart,
  BookOpen,
  Sparkles,
  Clock,
  MessageCircle,
  ChevronDown,
  Lock,
  Mail,
  Phone
} from "lucide-react";
import { AnimatedPage } from "@/components/AnimatedPage";
import testimonial1 from "@/assets/testimonial-pt-1.jpg";
import testimonial2 from "@/assets/testimonial-pt-2.jpg";
import testimonial3 from "@/assets/testimonial-pt-3.jpg";
import testimonial4 from "@/assets/testimonial-pt-4.jpg";
import ebookCover from "@/assets/ebook-cover-pt.png";
import avoDivinaImg from "@/assets/avo-divina-nova.jpg";

const LandingPagePT = () => {
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName] = useState("Cliente");
  const [customerEmail] = useState("cliente@email.com");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const productPrice = 9.90;
  const productName = 'O Oráculo Interior - Guia Completo';

  const handleCtaClick = () => {
    setShowCheckout(true);
  };
  
  const handlePaymentComplete = () => {
    setShowCheckout(false);
    navigate("/ebook");
  };

  const benefits = [
    {
      icon: Heart,
      title: "Autoconhecimento Profundo",
      description: "Descubra respostas claras para suas dúvidas emocionais e existenciais através da sabedoria ancestral do tarô."
    },
    {
      icon: BookOpen,
      title: "Método Simples e Acessível",
      description: "Aprenda um método fácil de interpretar as cartas — mesmo que você nunca tenha mexido com tarô antes."
    },
    {
      icon: Sparkles,
      title: "Paz Interior e Clareza",
      description: "Ganhe segurança nas suas decisões, equilíbrio emocional e uma conexão mais profunda consigo mesma."
    },
    {
      icon: Clock,
      title: "Estude no Seu Ritmo",
      description: "Material completo em PDF para você acessar quando quiser, sem pressa, do seu jeito."
    }
  ];

  const testimonials = [
    { 
      name: "Maria S.", 
      location: "São Paulo, SP",
      text: "Sempre tive receio de mexer com cartas — mas com o método da Avó Divina tudo fez sentido. Hoje uso o tarô com consciência e paz.", 
      photo: testimonial1,
      rating: 5 
    },
    { 
      name: "Ana C.", 
      location: "Rio de Janeiro, RJ",
      text: "Esse guia mudou minha forma de ver a vida. Agora consigo entender melhor minhas emoções e tomar decisões com mais clareza.", 
      photo: testimonial2,
      rating: 5 
    },
    { 
      name: "Juliana M.", 
      location: "Belo Horizonte, MG",
      text: "Nunca imaginei que seria capaz de fazer leituras tão profundas. O conteúdo é rico, acessível e cheio de carinho.", 
      photo: testimonial3,
      rating: 5 
    },
    { 
      name: "Carla R.", 
      location: "Porto Alegre, RS",
      text: "A Avó Divina tem um dom especial de ensinar. Me sinto mais conectada comigo mesma do que nunca!", 
      photo: testimonial4,
      rating: 5 
    },
  ];

  const productFeatures = [
    "Web-book completo Online",
    "Guia passo-a-passo para iniciantes",
    "Significado detalhado de todas as cartas",
    "Técnicas de meditação e conexão espiritual",
    "Exercícios práticos de autoconhecimento",
    "Acesso vitalício ao material"
  ];

  const faqs = [
    {
      question: "Funciona mesmo se eu nunca estudei tarô?",
      answer: "Sim! O método foi criado especialmente para iniciantes. Você vai aprender do zero, passo a passo, de forma simples e acolhedora."
    },
    {
      question: "Quando recebo o material?",
      answer: "Imediatamente após a confirmação do pagamento, você recebe o link de acesso direto no seu e-mail."
    },
    {
      question: "Posso acessar de qualquer lugar?",
      answer: "Sim! O material é em PDF, então você pode ler no celular, tablet ou computador, quando e onde quiser."
    },
    {
      question: "O pagamento é seguro?",
      answer: "Totalmente seguro. Utilizamos checkout criptografado com as principais bandeiras de cartão e PIX. Seus dados estão protegidos."
    },
    {
      question: "Tem garantia?",
      answer: "Sim! Você tem 7 dias de garantia. Se não ficar satisfeita(o), devolvemos 100% do seu dinheiro, sem perguntas."
    }
  ];

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl md:text-2xl font-display font-bold text-primary">
              Avó Divina
            </div>
            <LanguageSelector />
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 pb-16 bg-gradient-cream">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Text Content */}
              <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-block bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/20">
                  ✨ Método exclusivo da Avó Divina
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-foreground">
                  Transforme sua vida com <span className="text-gradient-primary">sabedoria ancestral</span> e tarô guiado
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Aprenda a interpretar cartas com calma e clareza — método simples, direto e acessível para você que busca autoconhecimento e paz interior.
                </p>

                {/* Price */}
                <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
                  <span className="text-lg text-muted-foreground line-through">De R$ 29,90</span>
                  <span className="text-3xl md:text-4xl font-display font-bold text-primary">R$ 9,90</span>
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">67% OFF</span>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleCtaClick}
                    size="lg"
                    className="w-full sm:w-auto text-lg font-display font-bold px-8 py-6 rounded-xl bg-gradient-gold hover:opacity-90 transition-all duration-300 shadow-lg text-charcoal"
                  >
                    Eu Quero Acessar Agora
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 justify-center lg:justify-start flex-wrap pt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-success" />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Acesso Imediato</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Garantia 7 dias</span>
                  </div>
                </div>
              </div>

              {/* Book Image */}
              <div className="flex justify-center order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src={ebookCover} 
                    alt="O Oráculo Interior - E-book da Avó Divina" 
                    className="w-64 md:w-80 lg:w-96 rounded-lg shadow-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-bold shadow-lg text-sm text-center max-w-[180px]">
                    Experiência de clarificação premium da sua vida
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                O Que Você Vai Conquistar
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Mais do que um simples guia, este é um caminho de transformação pessoal
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="professional-card p-6 text-center space-y-4"
                >
                  <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="flex justify-center">
                <img 
                  src={avoDivinaImg} 
                  alt="Avó Divina" 
                  className="w-64 md:w-80 rounded-2xl shadow-lg border-4 border-background"
                />
              </div>
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground">
                  Quem é a Avó Divina?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Olá, minha querida! Sou a Avó Divina. Há mais de 30 anos estudo e pratico a sabedoria ancestral do tarô e das artes divinatórias.
                  </p>
                  <p>
                    Ao longo dessa jornada, já ajudei milhares de pessoas a encontrarem clareza, equilíbrio e paz interior através das cartas.
                  </p>
                  <p>
                    Com este guia, quero levar esse conhecimento para você — de forma séria, amorosa e acessível. Não importa se você é iniciante: vou te guiar passo a passo nessa jornada de autoconhecimento.
                  </p>
                </div>
                <div className="flex items-center gap-4 justify-center lg:justify-start text-sm">
                  <div className="flex items-center gap-2 text-primary">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-medium">+30 anos de experiência</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">+10.000 vidas transformadas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                O Que Dizem Nossas Alunas
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Histórias reais de transformação e autoconhecimento
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="professional-card p-6 space-y-4"
                >
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground/90 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-display font-bold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                  O Que Está Incluso
                </h2>
                <p className="text-muted-foreground text-lg">
                  Tudo que você precisa para começar sua jornada
                </p>
              </div>

              <div className="gold-card p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    {productFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center space-y-6">
                    <div>
                      <p className="text-muted-foreground line-through">De R$ 29,90</p>
                      <p className="text-4xl md:text-5xl font-display font-bold text-primary">R$ 9,90</p>
                      <p className="text-sm text-muted-foreground mt-2">Pagamento único • Acesso vitalício</p>
                    </div>
                    <Button
                      onClick={handleCtaClick}
                      size="lg"
                      className="w-full text-lg font-display font-bold px-8 py-6 rounded-xl bg-gradient-gold hover:opacity-90 transition-all duration-300 shadow-lg text-charcoal"
                    >
                      Garantir Meu Acesso
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Garantia Incondicional de 7 Dias
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Se por qualquer motivo você não ficar satisfeita(o) com o material, basta nos enviar um e-mail em até 7 dias e devolvemos <strong>100% do seu dinheiro</strong>, sem perguntas. 
                Você não tem nada a perder — o risco é todo nosso.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
                  <Lock className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium">Checkout Seguro</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
                  <svg className="w-10 h-6" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="25" rx="4" fill="#635BFF"/>
                    <text x="30" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">stripe</text>
                  </svg>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
                  <svg className="w-10 h-6" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="25" rx="4" fill="#003087"/>
                    <text x="30" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">PayPal</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                  Perguntas Frequentes
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="professional-card overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-5 flex items-center justify-between text-left"
                    >
                      <span className="font-display font-bold text-foreground pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                          openFaq === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold">
                Comece Hoje Sua Jornada de Autoconhecimento
              </h2>
              <p className="text-lg opacity-90 leading-relaxed">
                Não deixe para depois. Este é o momento de dar o primeiro passo rumo a uma vida mais consciente, equilibrada e cheia de clareza.
              </p>
              
              <div className="flex items-center gap-4 justify-center flex-wrap">
                <span className="text-lg opacity-80 line-through">De R$ 29,90</span>
                <span className="text-4xl md:text-5xl font-display font-bold">R$ 9,90</span>
              </div>

              <Button
                onClick={handleCtaClick}
                size="lg"
                className="text-lg font-display font-bold px-10 py-7 rounded-xl bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-xl"
              >
                Quero Transformar Minha Vida Agora
              </Button>

              <p className="text-sm opacity-80">
                Acesso imediato • Garantia de 7 dias • Pagamento 100% seguro
              </p>
            </div>
          </div>
        </section>

        {/* Contact & Support */}
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>suporte@avodivina.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: (11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Atendimento: Seg-Sex, 9h-18h</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />

        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          onPaymentComplete={handlePaymentComplete}
          productName={productName}
          productPrice={productPrice}
          customerName={customerName}
          customerEmail={customerEmail}
          productImage={avoDivinaImg}
        />
      </div>
    </AnimatedPage>
  );
};

export default LandingPagePT;

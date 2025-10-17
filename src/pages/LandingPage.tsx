import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckoutModal } from "@/components/CheckoutModal";
import Footer from "@/components/Footer";
import { LanguageBanner } from "@/components/LanguageBanner";
import { LanguageSelector } from "@/components/LanguageSelector";
import { UrgencyCountdown } from "@/components/UrgencyCountdown";
import { Star, Shield, Zap, Clock, CheckCircle2 } from "lucide-react";
import { AnimatedPage } from "@/components/AnimatedPage";
import { MysticalBook3D } from "@/components/MysticalBook3D";
import heroCartomante from "@/assets/hero-cartomante.jpg";

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName] = useState("Cliente");
  const [customerEmail] = useState("cliente@email.com");

  const handleCtaClick = () => {
    setShowCheckout(true);
  };
  
  const handlePaymentComplete = () => {
    setShowCheckout(false);
    navigate("/ebook");
  };

  const testimonials = [
    {
      name: t("testimonials.testimonial1.name"),
      text: t("testimonials.testimonial1.text"),
      rating: 5
    },
    {
      name: t("testimonials.testimonial2.name"),
      text: t("testimonials.testimonial2.text"),
      rating: 5
    },
    {
      name: t("testimonials.testimonial3.name"),
      text: t("testimonials.testimonial3.text"),
      rating: 5
    },
    {
      name: t("testimonials.testimonial4.name"),
      text: t("testimonials.testimonial4.text"),
      rating: 5
    }
  ];

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-mystic-dark text-foreground">
        <LanguageBanner />
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-mystic-dark/80 backdrop-blur-lg border-b border-primary/30">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-display font-black text-gradient-primary">
              AVÓ DIVINA
            </div>
            <LanguageSelector />
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: `url(${heroCartomante})` }}
          />
          <div className="absolute inset-0 bg-mystic-dark/80" />
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-primary opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,255,0.3),transparent_50%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Urgency Banner */}
              <div className="inline-block space-y-2">
                <div className="bg-gradient-fire px-6 py-3 rounded-full animate-pulse glow-red">
                  <p className="text-xl md:text-2xl font-display font-black uppercase">
                    {t("hero.urgency")}
                  </p>
                </div>
                <p className="text-sm md:text-base font-body font-semibold text-yellow-500 text-center uppercase">
                  {t("hero.exclusive")}
                </p>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-none">
                <span className="text-gradient-primary block mb-4">
                  {t("hero.title")}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-2xl md:text-3xl lg:text-4xl font-body font-bold text-foreground/90">
                {t("hero.subtitle")}
              </p>

              {/* 3D Book */}
              <MysticalBook3D />

              {/* Price */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <span className="text-2xl md:text-3xl font-body line-through text-red-500">
                    {t("hero.price.from")}
                  </span>
                  <span className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-gradient-intense">
                    {t("hero.price.for")}
                  </span>
                </div>
                <div className="inline-block bg-secondary px-6 py-2 rounded-full glow-red">
                  <span className="text-2xl md:text-3xl font-display font-black">
                    {t("hero.price.discount")}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6 px-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="w-full max-w-md mx-auto text-base sm:text-lg md:text-xl lg:text-2xl font-display font-black px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 min-h-[60px] sm:min-h-[70px] md:min-h-[80px] rounded-full bg-gradient-intense hover:scale-105 transition-all duration-300 glow-magenta uppercase shadow-2xl whitespace-normal leading-tight text-white"
                >
                  {t("hero.cta")}
                </Button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Shield className="w-8 h-8 text-primary" />
                  <span className="text-xs md:text-sm font-body font-semibold">
                    {t("guarantees.secure")}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  <span className="text-xs md:text-sm font-body font-semibold">
                    {t("guarantees.immediate")}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <CheckCircle2 className="w-8 h-8 text-yellow-500" />
                  <span className="text-xs md:text-sm font-body font-semibold">
                    {t("guarantees.satisfaction")}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Star className="w-8 h-8 text-primary" />
                  <span className="text-xs md:text-sm font-body font-semibold">
                    {t("guarantees.support")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Urgency Section with Countdown */}
        <section className="py-16 md:py-24 bg-mystic-darker border-y border-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <div className="inline-block bg-secondary/20 border-2 border-secondary px-6 py-3 rounded-lg mb-6">
                  <p className="text-xl md:text-2xl font-display font-black text-gray-300 uppercase">
                    {t("urgency.warning")}
                  </p>
                </div>
              </div>
              <UrgencyCountdown initialHours={2} />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,0,0,0.2),transparent_50%)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-center mb-16 text-gradient-primary uppercase">
              {t("howItWorks.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
              {/* Step 1 */}
              <div className="vibrant-card p-6 md:p-8 text-center space-y-4 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-intense rounded-full flex items-center justify-center text-3xl md:text-4xl font-display font-black glow-purple">
                  1
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-gradient-intense">
                  {t("howItWorks.step1.title")}
                </h3>
                <p className="text-sm md:text-base font-body text-foreground/80">
                  {t("howItWorks.step1.description")}
                </p>
              </div>

              {/* Step 2 */}
              <div className="vibrant-card p-6 md:p-8 text-center space-y-4 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-fire rounded-full flex items-center justify-center text-3xl md:text-4xl font-display font-black glow-red">
                  2
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-gradient-primary">
                  {t("howItWorks.step2.title")}
                </h3>
                <p className="text-sm md:text-base font-body text-foreground/80">
                  {t("howItWorks.step2.description")}
                </p>
              </div>

              {/* Step 3 */}
              <div className="vibrant-card p-6 md:p-8 text-center space-y-4 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center text-3xl md:text-4xl font-display font-black glow-magenta">
                  3
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-gradient-intense">
                  {t("howItWorks.step3.title")}
                </h3>
                <p className="text-sm md:text-base font-body text-foreground/80">
                  {t("howItWorks.step3.description")}
                </p>
              </div>

              {/* Step 4 */}
              <div className="vibrant-card p-6 md:p-8 text-center space-y-4 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-fire rounded-full flex items-center justify-center text-3xl md:text-4xl font-display font-black glow-red">
                  4
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-gradient-primary">
                  {t("howItWorks.step4.title")}
                </h3>
                <p className="text-sm md:text-base font-body text-foreground/80">
                  {t("howItWorks.step4.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-mystic-darker border-y border-primary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-center mb-16 text-gradient-intense uppercase">
              {t("testimonials.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="vibrant-card p-6 md:p-8 space-y-4 hover:scale-105 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-base md:text-lg font-body text-center text-foreground/90 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Name */}
                  <p className="text-lg md:text-xl font-display font-black text-center text-gradient-primary">
                    - {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.3),transparent_60%)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-block bg-gradient-fire px-6 py-3 rounded-full animate-pulse glow-red mb-6">
                <p className="text-xl md:text-2xl font-display font-black uppercase flex items-center gap-2 justify-center">
                  <Clock className="w-6 h-6" />
                  {t("urgency.warning")}
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-gradient-intense uppercase">
                NÃO PERCA ESTA OPORTUNIDADE!
              </h2>

              <div className="px-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="w-full max-w-md mx-auto text-base sm:text-lg md:text-xl lg:text-2xl font-display font-black px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 min-h-[60px] sm:min-h-[70px] md:min-h-[80px] rounded-full bg-gradient-intense hover:scale-110 transition-all duration-300 glow-magenta uppercase shadow-2xl whitespace-normal leading-tight text-white"
                >
                  {t("hero.cta")}
                </Button>
              </div>

              <p className="text-lg md:text-xl font-body text-white font-bold">
                {t("urgency.alert")}
              </p>
            </div>
          </div>
        </section>

        <Footer />

        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          onPaymentComplete={handlePaymentComplete}
          productName="E-book Tarô Ancestral"
          productPrice={9.90}
          customerName={customerName}
          customerEmail={customerEmail}
          productImage="/lovable-uploads/vovo-divina-nova.jpeg.png"
        />
      </div>
    </AnimatedPage>
  );
};

export default LandingPage;

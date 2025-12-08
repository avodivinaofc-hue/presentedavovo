import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckoutModal } from "@/components/CheckoutModal";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SubtleCountdown } from "@/components/SubtleCountdown";
import { 
  Star, 
  Shield, 
  Zap, 
  CheckCircle2, 
  BookOpen,
  Headphones,
  FileText,
  Mail,
  ChevronDown,
  Lock,
  RefreshCw
} from "lucide-react";
import { AnimatedPage } from "@/components/AnimatedPage";
import avoPortrait from "@/assets/avo-divina-portrait.jpg";
import ebookCover from "@/assets/ebook-cover.jpg";

const LandingPageEN = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const productPrice = 19;
  const productName = 'Inner Oracle E-book';

  const handleCtaClick = () => {
    setShowCheckout(true);
  };
  
  const handlePaymentComplete = () => {
    setShowCheckout(false);
    navigate("/ebook");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    { name: t("testimonials.testimonial1.name"), location: t("testimonials.testimonial1.location"), text: t("testimonials.testimonial1.text"), rating: 5 },
    { name: t("testimonials.testimonial2.name"), location: t("testimonials.testimonial2.location"), text: t("testimonials.testimonial2.text"), rating: 5 },
    { name: t("testimonials.testimonial3.name"), location: t("testimonials.testimonial3.location"), text: t("testimonials.testimonial3.text"), rating: 5 },
    { name: t("testimonials.testimonial4.name"), location: t("testimonials.testimonial4.location"), text: t("testimonials.testimonial4.text"), rating: 5 },
  ];

  const faqs = [
    { question: t("faq.q1.question"), answer: t("faq.q1.answer") },
    { question: t("faq.q2.question"), answer: t("faq.q2.answer") },
    { question: t("faq.q3.question"), answer: t("faq.q3.answer") },
    { question: t("faq.q4.question"), answer: t("faq.q4.answer") },
  ];

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-cream text-foreground">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-display font-bold text-primary">
              Divine Grandma
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scrollToSection('preview')}
                className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Preview
              </button>
              <LanguageSelector />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-cream">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left Content */}
              <div className="space-y-6 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  {t("hero.badge")}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
                  {t("hero.title")}
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {t("hero.subtitle")}
                </p>

                {/* Value Bullets */}
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{t("valueBullets.delivery")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{t("valueBullets.method")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{t("valueBullets.results")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{t("valueBullets.guarantee")}</span>
                  </li>
                </ul>

                {/* Price & CTA */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <span className="text-2xl text-muted-foreground line-through">
                      {t("hero.price.original")}
                    </span>
                    <span className="text-4xl md:text-5xl font-display font-bold text-primary">
                      {t("hero.price.current")}
                    </span>
                    <span className="bg-gold text-charcoal px-3 py-1 rounded-full text-sm font-semibold">
                      {t("hero.price.discount")}
                    </span>
                  </div>

                  <Button
                    onClick={handleCtaClick}
                    size="lg"
                    className="w-full md:w-auto bg-gold hover:bg-gold-dark text-charcoal font-semibold text-lg px-8 py-6 rounded-lg shadow-gold hover:shadow-gold-lg transition-all duration-300"
                    aria-label="Purchase Inner Oracle e-book"
                  >
                    {t("hero.cta")}
                  </Button>

                  <button 
                    onClick={() => scrollToSection('preview')}
                    className="block text-primary hover:text-primary-light underline text-sm font-medium mx-auto lg:mx-0"
                  >
                    {t("hero.ctaSecondary")}
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>{t("guarantees.secure")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>{t("guarantees.satisfaction")}</span>
                  </div>
                </div>
              </div>

              {/* Right - Book Cover */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  <img 
                    src={ebookCover} 
                    alt="Inner Oracle e-book cover — purple and gold design"
                    className="w-full max-w-sm rounded-lg shadow-xl"
                    loading="eager"
                  />
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Countdown */}
        <SubtleCountdown />

        {/* What You Get Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-foreground">
                {t("whatYouGet.title")}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="professional-card p-6 flex items-start gap-4">
                  <BookOpen className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Complete E-book</h3>
                    <p className="text-muted-foreground text-sm">{t("whatYouGet.item1")}</p>
                  </div>
                </div>

                <div className="professional-card p-6 flex items-start gap-4">
                  <Star className="w-8 h-8 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Major Arcana Guide</h3>
                    <p className="text-muted-foreground text-sm">{t("whatYouGet.item2")}</p>
                  </div>
                </div>

                <div className="professional-card p-6 flex items-start gap-4">
                  <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Cheat Sheet</h3>
                    <p className="text-muted-foreground text-sm">{t("whatYouGet.item4")}</p>
                  </div>
                </div>

                <div className="professional-card p-6 flex items-start gap-4">
                  <Headphones className="w-8 h-8 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Audio Guides</h3>
                    <p className="text-muted-foreground text-sm">{t("whatYouGet.item5")}</p>
                  </div>
                </div>

                <div className="professional-card p-6 flex items-start gap-4 md:col-span-2">
                  <Mail className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Lifetime Access + Support</h3>
                    <p className="text-muted-foreground text-sm">{t("whatYouGet.item6")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 section-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img 
                    src={avoPortrait} 
                    alt="Divine Grandma portrait — smiling elderly woman with warm expression"
                    className="w-full max-w-md mx-auto rounded-lg shadow-xl"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-cream">
                    {t("about.title")}
                  </h2>
                  <p className="text-cream/80 leading-relaxed">
                    {t("about.bio")}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-cream/90">
                      <CheckCircle2 className="w-5 h-5 text-gold" />
                      {t("about.credentials1")}
                    </li>
                    <li className="flex items-center gap-3 text-cream/90">
                      <CheckCircle2 className="w-5 h-5 text-gold" />
                      {t("about.credentials2")}
                    </li>
                    <li className="flex items-center gap-3 text-cream/90">
                      <CheckCircle2 className="w-5 h-5 text-gold" />
                      {t("about.credentials3")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-foreground">
              {t("testimonials.title")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="professional-card p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-foreground italic">"{testimonial.text}"</p>
                  <p className="text-sm text-muted-foreground">
                    — {testimonial.name}, {testimonial.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section id="preview" className="py-16 md:py-24 bg-cream-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-foreground">
                Preview the Book
              </h2>
              <div className="professional-card p-8">
                <blockquote className="text-xl md:text-2xl italic text-foreground mb-4">
                  "{t("ebook.quote.text")}"
                </blockquote>
                <p className="text-muted-foreground">{t("ebook.quote.author")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-card p-8 md:p-12">
                <Shield className="w-16 h-16 text-gold mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-foreground">
                  {t("guarantee.title")}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("guarantee.text")}
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span>{t("guarantee.secure")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-cream-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-foreground">
                {t("faq.title")}
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="professional-card overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4"
                      aria-expanded={expandedFaq === index}
                    >
                      <span className="font-semibold text-foreground">{faq.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground transition-transform ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6 text-muted-foreground animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 section-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-cream">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-cream/80">
                Get instant access to the Inner Oracle and begin your path to clarity.
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-charcoal font-semibold text-lg px-12 py-6 rounded-lg shadow-gold hover:shadow-gold-lg transition-all duration-300"
                  aria-label="Purchase Inner Oracle e-book"
                >
                  {t("hero.cta")}
                </Button>
                
                <div className="flex items-center gap-6 text-sm text-cream/70">
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Secure Checkout
                  </span>
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    7-Day Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-charcoal text-cream py-12 border-t border-charcoal-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="font-display font-bold text-lg mb-4">{t("footer.company")}</h3>
                  <p className="text-cream/70 text-sm">{t("footer.tagline")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Legal</h3>
                  <ul className="space-y-2 text-sm text-cream/70">
                    <li><a href="/en/terms" className="hover:text-cream transition-colors">{t("footer.links.terms")}</a></li>
                    <li><a href="/en/privacy" className="hover:text-cream transition-colors">{t("footer.links.privacy")}</a></li>
                    <li><a href="/en/refund" className="hover:text-cream transition-colors">{t("footer.links.refund")}</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Contact</h3>
                  <p className="text-sm text-cream/70">{t("footer.contact")}</p>
                </div>
              </div>
              <div className="border-t border-cream/20 pt-8 text-center text-sm text-cream/60">
                <p>© 2024 {t("footer.company")}. {t("footer.rights")}</p>
              </div>
            </div>
          </div>
        </footer>

        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          onPaymentComplete={handlePaymentComplete}
          productName={productName}
          productPrice={productPrice}
          customerName="Customer"
          customerEmail="customer@email.com"
          productImage="/lovable-uploads/oraculo-interior-cover.png"
        />
      </div>
    </AnimatedPage>
  );
};

export default LandingPageEN;
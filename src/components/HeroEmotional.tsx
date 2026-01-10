
import { useEffect, useRef } from "react";
import { Sparkles, Moon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
    onOpenCheckout: () => void;
}

export default function HeroEmotional({ onOpenCheckout }: HeroProps) {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const scrolled = window.scrollY;
                heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background text-center px-4 pt-20 pb-10">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(157,78,221,0.15),transparent_70%)]" />
                <div className="absolute top-[20%] right-[10%] w-2 h-2 bg-secondary rounded-full animate-pulse-glow" style={{ animationDelay: "0s" }} />
                <div className="absolute top-[40%] left-[15%] w-1.5 h-1.5 bg-secondary/80 rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }} />
                <div className="absolute bottom-[30%] right-[25%] w-1 h-1 bg-secondary/60 rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                {/* Mystic Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/5 backdrop-blur-sm mx-auto">
                    <Moon className="w-4 h-4 text-secondary" />
                    <span className="text-secondary text-sm font-medium tracking-wider uppercase">Mensagem do Universo</span>
                    <Star className="w-4 h-4 text-secondary" />
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight text-white drop-shadow-lg">
                    Sinto que você tem buscado <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-[#F5E6CA] to-secondary">
                        uma resposta...
                    </span>
                </h1>

                {/* Subheadline (Emotional Mirroring) */}
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                    Há momentos em que o silêncio pesa e o caminho parece incerto.
                    Seu coração pede um sinal, um guia, algo que vá além do óbvio.
                    Você não chegou aqui por acaso.
                </p>

                {/* Action */}
                <div className="pt-8 pb-12">
                    <Button
                        onClick={onOpenCheckout}
                        className="btn-primary-mystic text-lg md:text-xl h-auto px-10 py-6"
                    >
                        <Sparkles className="w-5 h-5 mr-3 animate-pulse" />
                        Receber minha resposta agora
                    </Button>
                    <p className="mt-4 text-sm text-muted-foreground/60 tracking-wider uppercase">
                        Acesso imediato • Leitura Intuitiva
                    </p>
                </div>
            </div>

            {/* Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
        </section>
    );
}

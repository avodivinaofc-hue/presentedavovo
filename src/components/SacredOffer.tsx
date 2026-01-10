
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OfferProps {
    onOpenCheckout: () => void;
}

export default function SacredOffer({ onOpenCheckout }: OfferProps) {
    return (
        <section className="relative py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-black" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-10">

                {/* Headline */}
                <h2 className="text-4xl md:text-5xl font-serif text-white">
                    Sua mensagem está <br />
                    <span className="text-secondary italic">esperando por você</span>
                </h2>

                {/* Offer Box */}
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-secondary/50 via-transparent to-secondary/20">
                    <div className="bg-card/90 backdrop-blur-xl rounded-xl p-8 md:p-12 border border-white/5 shadow-2xl">

                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                            Oferta Especial
                        </div>

                        <div className="space-y-6">
                            <p className="text-muted-foreground text-lg">
                                Receba agora sua leitura completa do <br />
                                <strong className="text-white">Oráculo Interior</strong>
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <span className="text-muted-foreground line-through text-lg">R$ 47,90</span>
                                <span className="text-4xl md:text-5xl font-serif text-white font-bold">
                                    R$ 9<span className="text-2xl text-secondary">,90</span>
                                </span>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={onOpenCheckout}
                                    className="w-full btn-primary-mystic text-lg h-auto py-5 shadow-xl animate-pulse-glow"
                                >
                                    <span className="flex items-center gap-2">
                                        Abrir minha leitura <ArrowRight className="w-5 h-5" />
                                    </span>
                                </Button>
                            </div>

                            <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">
                                Acesso imediato e seguro
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="flex items-center justify-center gap-2 text-muted-foreground/50 text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Feito com energia e intenção</span>
                    <Sparkles className="w-4 h-4" />
                </div>

            </div>
        </section>
    );
}


import { Scroll, Sparkles, Lock } from "lucide-react";

export default function OracleExplanation() {
    return (
        <section className="relative py-24 px-4 bg-background">
            <div className="max-w-4xl mx-auto text-center space-y-12">

                {/* Header */}
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-serif text-white">
                        O Oráculo Interior
                    </h2>
                    <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto italic">
                        "Não são apenas cartas. É um espelho da sua alma."
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 gap-6 text-left">
                    {/* Item 1 */}
                    <div className="p-6 rounded-xl border border-white/5 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                        <Scroll className="w-8 h-8 text-primary mb-4" />
                        <h3 className="text-xl font-serif text-white mb-2">Leitura Intuitiva Única</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Cada tiragem é única, sintonizada com a sua energia no momento presente.
                            As cartas revelam o que sua intuição já sabe, mas sua mente tenta esconder.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="p-6 rounded-xl border border-white/5 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                        <Lock className="w-8 h-8 text-primary mb-4" />
                        <h3 className="text-xl font-serif text-white mb-2">Sagrado e Privado</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Este é um espaço seguro. Sua pergunta e sua resposta pertencem apenas a você
                            e ao universo. Nenhum julgamento, apenas clareza.
                        </p>
                    </div>
                </div>

                {/* Mystic Divider */}
                <div className="flex items-center justify-center gap-4 opacity-50">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary" />
                    <Sparkles className="w-4 h-4 text-primary" />
                    <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary" />
                </div>

                <p className="text-lg md:text-xl font-light text-white leading-relaxed max-w-2xl mx-auto">
                    Ao abrir sua leitura, você receberá revelações sobre seu momento atual,
                    os desafios que enfrenta e o caminho de luz que se abre à sua frente.
                </p>

            </div>
        </section>
    );
}

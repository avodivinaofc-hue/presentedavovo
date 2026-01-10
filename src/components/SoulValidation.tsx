
import { Eye, CloudFog, Compass } from "lucide-react";

export default function SoulValidation() {
    const cards = [
        {
            icon: <CloudFog className="w-8 h-8 text-secondary" />,
            title: "A Dúvida Silenciosa",
            text: "Aquela sensação de que algo está prestes a mudar, mas você não consegue enxergar a direção exata."
        },
        {
            icon: <Eye className="w-8 h-8 text-secondary" />,
            title: "Padrões que se Repetem",
            text: "Você percebe ciclos retornando em sua vida e sente que precisa de uma nova perspectiva para quebrá-los."
        },
        {
            icon: <Compass className="w-8 h-8 text-secondary" />,
            title: "Busca por Propósito",
            text: "Um chamado interno por algo maior, uma conexão que faça seu coração vibrar novamente."
        }
    ];

    return (
        <section className="relative py-24 px-4 bg-background overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-white">
                        O universo fala através de <span className="text-secondary italic">sinais</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Muitas vezes, a resposta que procuramos já está sussurrando em nosso interior.
                        Nós apenas precisamos da chave certa para ouvi-la.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl bg-card/40 border border-white/5 hover:border-secondary/20 transition-all duration-500 hover:bg-card/60"
                        >
                            <div className="mb-6 p-4 bg-black/40 rounded-full w-fit group-hover:scale-110 transition-transform duration-500 border border-white/5">
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-serif text-white mb-3 group-hover:text-secondary transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {card.text}
                            </p>

                            {/* Card Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

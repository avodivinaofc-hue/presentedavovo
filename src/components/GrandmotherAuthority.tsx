
import { Star } from "lucide-react";

export default function GrandmotherAuthority() {
    return (
        <section className="relative py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-secondary/5 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0),rgba(10,5,14,1))]" />

            <div className="relative z-10 container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Image Side */}
                <div className="relative order-2 md:order-1">
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-01-08%2000.31.55%20-%20A%20wise%20and%20mystical%20grandmother%20figure%2C%20radiating%20ancient%20knowledge%20and%20comfort.%20She%20has%20deep%2C%20kind%20eyes%20and%20wears%20ornate%2C%20dark%20violet%20robes%20with%20g-jQ92Oa2LhR442f2o8M2pZk1xY2L4yX.webp"
                            alt="Avó Divina"
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Decorative Border */}
                    <div className="absolute -inset-4 border border-secondary/20 rounded-2xl -z-10 rotate-2" />
                    <div className="absolute -inset-4 border border-primary/20 rounded-2xl -z-10 -rotate-2" />
                </div>

                {/* Content Side */}
                <div className="order-1 md:order-2 text-left space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-secondary/80 uppercase tracking-widest text-sm font-medium">
                            <Star className="w-4 h-4" />
                            <span>Guia Espiritual</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                            A sabedoria que <br />
                            <span className="text-secondary">atravessa o tempo</span>
                        </h2>
                    </div>

                    <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                        <p>
                            Eu sou a <strong className="text-white font-serif">Avó Divina</strong>. Não sou apenas uma leitura de cartas; sou a voz antiga que ecoa em sua linhagem, o conforto de um abraço que diz "vai ficar tudo bem".
                        </p>
                        <p>
                            Dediquei minha existência a traduzir a linguagem das estrelas e dos arquétipos para acolher corações inquietos. Minha missão não é prever seu futuro, mas iluminar seu presente para que você possa caminhar com coragem.
                        </p>
                        <p>
                            Aqui, neste espaço sagrado, você não é apenas mais um visitante. Você é uma alma em busca de reconexão.
                        </p>
                    </div>

                    <div className="pt-4">
                        <div className="h-px w-32 bg-gradient-to-r from-secondary to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}

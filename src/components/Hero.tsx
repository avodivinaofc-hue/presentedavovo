import { Moon } from 'lucide-react'

interface HeroProps {
    onOpenCheckout: () => void
}

export default function Hero({ onOpenCheckout }: HeroProps) {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">

            {/* Cinematic Lighting Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[50vh] bg-authentic-purple/20 blur-[120px] pointer-events-none -z-10" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-12 fade-in">

                {/* Symbol */}
                <div className="flex justify-center opacity-80">
                    <Moon className="w-8 h-8 text-authentic-gold stroke-1" />
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-authentic-text tracking-normal">
                    Se você chegou até aqui,<br />
                    <span className="italic text-authentic-gold/90">não foi por acaso.</span>
                </h1>

                {/* Subheadline with high breathing room */}
                <p className="text-lg md:text-xl text-authentic-gray font-light leading-loose max-w-xl mx-auto">
                    Um guia espiritual para te ajudar a tomar decisões, fortalecer sua fé e enxergar caminhos com mais clareza.
                </p>

                {/* Image - Abstract/Atmospheric */}
                <div className="relative w-full max-w-md mx-auto aspect-[4/5] overflow-hidden rounded-sm border border-authentic-gold/10 opacity-90 grayscale-[20%] sepia-[10%]">
                    <div className="absolute inset-0 bg-gradient-to-t from-authentic-black via-transparent to-transparent z-10" />
                    <img
                        src="/authentic_hero_hands.png"
                        alt="Mãos antigas sobre o altar"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Deep Emotional Text */}
                <div className="space-y-6 pt-8">
                    <p className="text-xl font-serif text-authentic-text/90 italic">
                        "Quando o coração está inquieto, o oráculo traz luz."
                    </p>

                    <div className="w-16 h-[1px] bg-authentic-gold/30 mx-auto" />

                    <p className="text-authentic-gray text-sm tracking-widest uppercase">
                        Eu sou a Avó Divina
                    </p>
                </div>

                {/* CTA - Minimalist */}
                <div className="pt-8">
                    <button
                        onClick={onOpenCheckout}
                        className="btn-authentic"
                    >
                        Acessar meu guia
                    </button>
                </div>
            </div>
        </section>
    )
}

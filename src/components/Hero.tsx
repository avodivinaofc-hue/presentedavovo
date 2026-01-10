import { Sparkles } from 'lucide-react'

interface HeroProps {
    onOpenCheckout: () => void
}

export default function Hero({ onOpenCheckout }: HeroProps) {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-mystic/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-gold text-sm tracking-widest uppercase">Mensagem do Universo</span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
                    Se você chegou até aqui,<br />
                    <span className="text-gold">não foi por acaso.</span>
                </h1>

                <p className="text-xl md:text-2xl text-parchment/90 font-light">
                    Algo dentro de você está pedindo uma resposta agora.
                </p>

                {/* Divider */}
                <div className="mystic-divider" />

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-parchment/70 max-w-2xl mx-auto leading-relaxed">
                    Quando o coração está inquieto, quando o amor confunde, quando a mente não encontra paz…<br />
                    <em className="text-gold/80">o Oráculo Interior se manifesta.</em>
                </p>

                {/* Emotional Text */}
                <div className="pt-4 space-y-2">
                    <p className="text-lg text-parchment/80">
                        Eu sou a <strong className="text-gold font-serif">Avó Divina</strong>.
                    </p>
                    <p className="text-parchment/60">
                        Não apareço para todos — apenas para quem realmente precisa ouvir a verdade.
                    </p>
                </div>

                {/* CTA */}
                <div className="pt-8">
                    <button
                        onClick={onOpenCheckout}
                        className="btn-sacred animate-pulse-glow"
                    >
                        Avó, eu preciso da minha resposta agora
                    </button>
                </div>
            </div>
        </section>
    )
}

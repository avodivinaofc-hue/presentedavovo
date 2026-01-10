import { ArrowRight } from 'lucide-react'

interface MainCTAProps {
    onOpenCheckout: () => void
}

export default function MainCTA({ onOpenCheckout }: MainCTAProps) {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-void to-void-light/30">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Text */}
                <p className="text-xl md:text-2xl text-parchment/80 leading-relaxed">
                    Se algo dentro de você está pedindo resposta,<br />
                    <strong className="text-gold">não ignore.</strong>
                </p>

                {/* Button */}
                <button
                    onClick={onOpenCheckout}
                    className="btn-sacred animate-pulse-glow text-lg md:text-xl"
                >
                    <span>Receber minha leitura agora</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                </button>
            </div>
        </section>
    )
}

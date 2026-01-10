import { ArrowRight } from 'lucide-react'

interface MainCTAProps {
    onOpenCheckout: () => void
}

export default function MainCTA({ onOpenCheckout }: MainCTAProps) {
    return (
        <section className="py-32 px-6 bg-gradient-to-b from-authentic-black to-authentic-purple/20">
            <div className="max-w-xl mx-auto text-center space-y-12">

                <p className="text-xl md:text-2xl font-serif text-authentic-text/90 italic">
                    "Se algo dentro de você está pedindo resposta, não ignore."
                </p>

                <button
                    onClick={onOpenCheckout}
                    className="btn-authentic w-full md:w-auto min-w-[300px] group"
                >
                    <span className="mr-4">Receber minha leitura agora</span>
                    <ArrowRight className="w-4 h-4 text-authentic-gold/50 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-authentic-gray/40 text-xs tracking-[0.2em] uppercase">
                    Acesso imediato • Leitura Secreta
                </p>
            </div>
        </section>
    )
}

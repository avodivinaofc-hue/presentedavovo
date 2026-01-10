import { Heart } from 'lucide-react'

export default function EmotionalValidation() {
    return (
        <section className="py-20 px-6 bg-void-light/30">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                <Heart className="w-8 h-8 text-gold/60 mx-auto animate-float" />

                <div className="space-y-6 text-lg md:text-xl text-parchment/80 leading-relaxed">
                    <p>
                        Você pode estar tentando ser forte.<br />
                        Pode estar fingindo que está tudo bem.
                    </p>

                    <p className="text-gold/90 font-medium">
                        Mas eu sinto quando o coração está cansado de esperar sinais.
                    </p>

                    <p>
                        Há perguntas que não se resolvem com lógica.<br />
                        <em>Elas pedem orientação.</em>
                    </p>
                </div>

                <div className="mystic-divider" />
            </div>
        </section>
    )
}

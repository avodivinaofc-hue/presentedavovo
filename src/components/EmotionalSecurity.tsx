import { Sparkles, Lock, HeartHandshake } from 'lucide-react'

export default function EmotionalSecurity() {
    return (
        <section className="py-20 px-6 border-t border-white/5">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Items */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-parchment/60">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-gold/60" />
                        <span>Acesso imediato após confirmação</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-gold/60" />
                        <span>Leitura pessoal e privada</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <HeartHandshake className="w-5 h-5 text-gold/60" />
                        <span>Você pode sair a qualquer momento</span>
                    </div>
                </div>

                {/* Closing */}
                <p className="text-parchment/40 text-sm italic pt-4">
                    Confie apenas no que ressoar com você.
                </p>
            </div>
        </section>
    )
}

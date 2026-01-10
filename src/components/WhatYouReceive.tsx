import { BookOpen, Key, Flame } from 'lucide-react'

export default function WhatYouReceive() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-3xl mx-auto text-center space-y-12">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-serif">
                    O que você <span className="text-gold">receberá</span>
                </h2>

                {/* Items */}
                <div className="space-y-6 max-w-xl mx-auto text-left">
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-void-light/40 border border-white/5">
                        <BookOpen className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                        <p className="text-lg text-parchment/90">
                            O acesso ao <strong className="text-gold">Oráculo Interior</strong>
                        </p>
                    </div>

                    <div className="flex items-start gap-4 p-5 rounded-xl bg-void-light/40 border border-white/5">
                        <Key className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                        <p className="text-lg text-parchment/90">
                            Uma <strong className="text-gold">leitura guiada</strong> para interpretar sua situação atual
                        </p>
                    </div>

                    <div className="flex items-start gap-4 p-5 rounded-xl bg-void-light/40 border border-white/5">
                        <Flame className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                        <p className="text-lg text-parchment/90">
                            <strong className="text-gold">Orientação clara</strong> sobre seu próximo passo emocional
                        </p>
                    </div>
                </div>

                {/* Note */}
                <p className="text-parchment/50 text-sm italic">
                    Valor simbólico apenas para manter o acesso consciente.
                </p>

                {/* Price */}
                <div className="pt-4">
                    <p className="text-5xl md:text-6xl font-serif text-gold">
                        R$ 9,90
                    </p>
                </div>
            </div>
        </section>
    )
}

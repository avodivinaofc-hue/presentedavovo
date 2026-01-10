import { Eye, Lock, Compass } from 'lucide-react'

export default function WhatIsOracle() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-3xl mx-auto text-center space-y-12">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-serif">
                    O Oráculo Interior não prevê.<br />
                    <span className="text-gold">Ele revela.</span>
                </h2>

                {/* Text */}
                <div className="space-y-6 text-lg text-parchment/70 leading-relaxed max-w-2xl mx-auto">
                    <p>
                        Este não é um jogo de cartas.<br />
                        Não é superstição.
                    </p>

                    <p>
                        É um método de leitura espiritual que revela:
                    </p>
                </div>

                {/* Reveals */}
                <div className="grid md:grid-cols-3 gap-6 pt-4">
                    <div className="p-6 rounded-2xl bg-void-light/50 border border-white/5 hover:border-gold/20 transition-all duration-300">
                        <Lock className="w-8 h-8 text-mystic mx-auto mb-4" />
                        <p className="text-parchment/90">O que está <strong className="text-gold">bloqueando</strong> seu caminho</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-void-light/50 border border-white/5 hover:border-gold/20 transition-all duration-300">
                        <Compass className="w-8 h-8 text-mystic mx-auto mb-4" />
                        <p className="text-parchment/90">O que precisa ser <strong className="text-gold">feito agora</strong></p>
                    </div>

                    <div className="p-6 rounded-2xl bg-void-light/50 border border-white/5 hover:border-gold/20 transition-all duration-300">
                        <Eye className="w-8 h-8 text-mystic mx-auto mb-4" />
                        <p className="text-parchment/90">O que o destino está tentando <strong className="text-gold">te mostrar</strong></p>
                    </div>
                </div>

                {/* Closing */}
                <p className="text-lg text-parchment/60 italic pt-4">
                    Muitas pessoas chegam aqui perdidas.<br />
                    Saem com clareza.
                </p>
            </div>
        </section>
    )
}

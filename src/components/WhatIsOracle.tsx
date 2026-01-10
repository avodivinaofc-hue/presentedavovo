import { Eye, Key, Compass } from 'lucide-react'

export default function WhatIsOracle() {
    return (
        <section className="py-24 px-6 bg-authentic-purple/5">
            <div className="max-w-2xl mx-auto space-y-16">

                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl text-authentic-text">
                        O Oráculo Interior não prevê.<br />
                        <span className="italic text-authentic-gold">Ele revela.</span>
                    </h2>

                    <p className="text-authentic-gray font-light max-w-md mx-auto">
                        Este não é um jogo de cartas. Não é superstição.
                    </p>
                </div>

                <div className="space-y-12 pl-4 border-l border-authentic-gold/10">

                    <div className="relative pl-8 group">
                        <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-authentic-black border border-authentic-gold/50 group-hover:bg-authentic-gold transition-colors duration-500" />
                        <h3 className="text-xl font-serif text-authentic-text mb-2">O que bloqueia seu caminho</h3>
                        <p className="text-authentic-gray font-light">
                            Padrões invisíveis que repetem ciclos de dor.
                        </p>
                    </div>

                    <div className="relative pl-8 group">
                        <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-authentic-black border border-authentic-gold/50 group-hover:bg-authentic-gold transition-colors duration-500" />
                        <h3 className="text-xl font-serif text-authentic-text mb-2">O que precisa ser feito agora</h3>
                        <p className="text-authentic-gray font-light">
                            Uma ação concreta para destrancar sua energia.
                        </p>
                    </div>

                    <div className="relative pl-8 group">
                        <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-authentic-black border border-authentic-gold/50 group-hover:bg-authentic-gold transition-colors duration-500" />
                        <h3 className="text-xl font-serif text-authentic-text mb-2">O que o destino tenta mostrar</h3>
                        <p className="text-authentic-gray font-light">
                            Mensagens que sua intuição grita mas você ignora.
                        </p>
                    </div>

                </div>

                <p className="text-center text-authentic-text/60 italic font-serif pt-8">
                    "Muitas pessoas chegam aqui perdidas. Saem com clareza."
                </p>
            </div>
        </section>
    )
}

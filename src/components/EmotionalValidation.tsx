export default function EmotionalValidation() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-xl mx-auto text-center space-y-12">

                {/* Minimalist Divider - Silence */}
                <div className="w-1 h-12 bg-gradient-to-b from-authentic-gold/0 via-authentic-gold/40 to-authentic-gold/0 mx-auto" />

                <div className="space-y-8 text-lg md:text-xl font-light text-authentic-text/80 leading-relaxed font-sans">
                    <p>
                        Você pode estar tentando ser forte.<br />
                        Pode estar fingindo que está tudo bem.
                    </p>

                    <p className="text-authentic-gold italic font-serif text-2xl py-4">
                        "Mas eu sinto quando o coração está cansado de esperar sinais."
                    </p>

                    <p>
                        Há perguntas que não se resolvem com lógica.<br />
                        Elas pedem <span className="border-b border-authentic-gold/30 pb-0.5">orientação</span>.
                    </p>
                </div>
            </div>
        </section>
    )
}

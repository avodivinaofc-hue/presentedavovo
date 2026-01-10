import { Star } from 'lucide-react'

export default function AuthenticSocialProof() {
    const testimonials = [
        {
            text: "Eu não estava procurando nada. Mas essa leitura disse exatamente o que eu estava vivendo.",
            author: "M."
        },
        {
            text: "Não ouvi o que eu queria. Ouvi o que eu precisava.",
            author: "A."
        },
        {
            text: "Fez silêncio dentro de mim. E isso já foi uma resposta.",
            author: "L."
        }
    ]

    return (
        <section className="py-32 px-6 border-t border-authentic-gold/5 bg-authentic-black/80">
            <div className="max-w-2xl mx-auto space-y-20">
                <div className="text-center">
                    <Star className="w-4 h-4 text-authentic-gold/40 mx-auto mb-4" />
                    <h3 className="text-authentic-gray text-sm uppercase tracking-widest">Confidências</h3>
                </div>

                <div className="space-y-16">
                    {testimonials.map((t, i) => (
                        <div key={i} className="text-center space-y-6">
                            <p className="font-serif text-2xl md:text-3xl text-authentic-text/80 italic leading-relaxed">
                                "{t.text}"
                            </p>
                            <p className="text-authentic-gold/60 font-serif">— {t.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

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
        <section className="py-32 px-6 border-t border-authentic-gold/5 bg-authentic-black/80 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/authentic_texture_background.png')] bg-repeat mix-blend-overlay" />

            <div className="max-w-6xl mx-auto space-y-20 relative z-10">
                <div className="text-center">
                    <Star className="w-4 h-4 text-authentic-gold/40 mx-auto mb-4" />
                    <h3 className="text-authentic-gray text-sm uppercase tracking-widest">Confidências</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {testimonials.map((t, i) => (
                        <div key={i} className="card-authentic flex flex-col justify-between min-h-[280px] group hover:border-authentic-gold/20 transition-colors duration-500">
                            <div>
                                <div className="text-5xl text-authentic-gold/10 font-serif leading-none mb-6 group-hover:text-authentic-gold/20 transition-colors">"</div>
                                <p className="quote-authentic text-lg md:text-xl">
                                    {t.text}
                                </p>
                            </div>
                            <p className="text-right text-authentic-gold/50 mt-8 font-serif tracking-widest text-sm">— {t.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

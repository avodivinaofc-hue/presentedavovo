import { Star } from 'lucide-react'

export default function WhoIsGrandmother() {
    return (
        <section className="py-24 px-6 bg-void-light/20">
            <div className="max-w-3xl mx-auto text-center space-y-10">
                {/* Image */}
                <div className="relative w-40 h-40 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-mystic/20 rounded-full blur-xl" />
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-01-08%2000.31.55%20-%20A%20wise%20and%20mystical%20grandmother%20figure%2C%20radiating%20ancient%20knowledge%20and%20comfort.%20She%20has%20deep%2C%20kind%20eyes%20and%20wears%20ornate%2C%20dark%20violet%20robes%20with%20g-jQ92Oa2LhR442f2o8M2pZk1xY2L4yX.webp"
                        alt="Avó Divina"
                        className="relative w-full h-full object-cover rounded-full border-2 border-gold/30"
                    />
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 text-gold/70 text-sm tracking-widest uppercase">
                    <Star className="w-4 h-4" />
                    <span>Guia Espiritual</span>
                    <Star className="w-4 h-4" />
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-serif">
                    Há anos eu escuto o que muitos ignoram.
                </h2>

                {/* List */}
                <div className="space-y-4 text-lg text-parchment/70 max-w-xl mx-auto">
                    <p>Mulheres chegam até mim quando:</p>
                    <ul className="space-y-2 text-parchment/80">
                        <li>💔 o amor dói</li>
                        <li>🤫 o silêncio machuca</li>
                        <li>⏳ a espera cansa</li>
                        <li>✨ a intuição grita</li>
                    </ul>
                </div>

                {/* Promise */}
                <div className="pt-6 space-y-2">
                    <p className="text-lg text-parchment/60">
                        Eu não prometo milagres.
                    </p>
                    <p className="text-xl text-gold font-serif">
                        Prometo verdade.
                    </p>
                </div>
            </div>
        </section>
    )
}

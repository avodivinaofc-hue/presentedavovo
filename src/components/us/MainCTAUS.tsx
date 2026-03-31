import { ArrowRight } from 'lucide-react'

const CHECKOUT_URL = "https://buy.stripe.com/cNifZgfSA8bmezPfUE9fW05"

export default function MainCTAUS() {
    const handleCheckout = () => {
        window.open(CHECKOUT_URL, '_blank')
    }

    return (
        <section className="py-32 px-6 bg-gradient-to-b from-authentic-black to-authentic-purple/20">
            <div className="max-w-xl mx-auto text-center space-y-12">

                <p className="text-xl md:text-2xl font-serif text-authentic-text/90 italic">
                    "If something within you is asking for an answer, do not ignore it."
                </p>

                <button
                    onClick={handleCheckout}
                    className="btn-authentic w-full md:w-auto min-w-[300px] group"
                >
                    <span className="mr-4">Access my guide</span>
                    <ArrowRight className="w-4 h-4 text-authentic-gold/50 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-authentic-gray/40 text-xs tracking-[0.2em] uppercase">
                    Instant access • Spiritual Guide
                </p>
            </div>
        </section>
    )
}

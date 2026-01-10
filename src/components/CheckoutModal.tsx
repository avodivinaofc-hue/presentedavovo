import { X, Sparkles } from 'lucide-react'

interface CheckoutModalProps {
    onClose: () => void
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
    // Substitua este link pelo seu link de checkout real
    const CHECKOUT_URL = "https://pay.kirvano.com/c939b46e-a635-499c-b875-f268a489cc49"

    const handleCheckout = () => {
        window.open(CHECKOUT_URL, '_blank')
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-parchment/40 hover:text-parchment transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="space-y-6">
                    <Sparkles className="w-10 h-10 text-gold mx-auto" />

                    <h3 className="text-2xl md:text-3xl font-serif text-parchment">
                        Sua leitura está <span className="text-gold">pronta</span>
                    </h3>

                    <p className="text-parchment/70">
                        Ao confirmar, você terá acesso imediato ao Oráculo Interior e sua leitura personalizada.
                    </p>

                    {/* Price */}
                    <div className="py-4">
                        <p className="text-4xl font-serif text-gold">R$ 9,90</p>
                        <p className="text-sm text-parchment/50 mt-1">Valor único • Acesso vitalício</p>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        className="btn-sacred w-full"
                    >
                        Abrir minha leitura
                    </button>

                    <p className="text-xs text-parchment/40">
                        Pagamento 100% seguro • Acesso imediato
                    </p>
                </div>
            </div>
        </div>
    )
}

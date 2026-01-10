import { X, Sparkles } from 'lucide-react'

interface CheckoutModalProps {
    onClose: () => void
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
    const CHECKOUT_URL = "https://pay.kirvano.com/c939b46e-a635-499c-b875-f268a489cc49"

    const handleCheckout = () => {
        window.open(CHECKOUT_URL, '_blank')
    }

    return (
        <div
            className="fixed inset-0 bg-authentic-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-authentic-purple/20 border border-authentic-gold/20 rounded-sm p-8 max-w-md w-full text-center backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-authentic-gray/40 hover:text-authentic-text transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="space-y-6">
                    <Sparkles className="w-10 h-10 text-authentic-gold mx-auto" />

                    <h3 className="text-2xl md:text-3xl font-serif text-authentic-text">
                        Seu guia espiritual está <span className="italic text-authentic-gold">pronto</span>
                    </h3>

                    <p className="text-authentic-gray">
                        Ao confirmar, você terá acesso imediato ao Oráculo Interior e seu conteúdo espiritual guiado.
                    </p>

                    {/* Price */}
                    <div className="py-4">
                        <p className="text-4xl font-serif text-authentic-gold">R$ 9,90</p>
                        <p className="text-sm text-authentic-gray/50 mt-1">Valor único • Acesso vitalício</p>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        className="btn-authentic w-full"
                    >
                        Acessar meu guia
                    </button>

                    <p className="text-xs text-authentic-gray/40">
                        Pagamento 100% seguro • Acesso imediato
                    </p>
                </div>
            </div>
        </div>
    )
}

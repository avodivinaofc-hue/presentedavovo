import { X, Sparkles } from 'lucide-react'

interface CheckoutModalUSProps {
    onClose: () => void
}

export default function CheckoutModalUS({ onClose }: CheckoutModalUSProps) {
    const CHECKOUT_URL = "https://buy.stripe.com/cNifZgfSA8bmezPfUE9fW05"

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
                        Your spiritual guide is <span className="italic text-authentic-gold">ready</span>
                    </h3>

                    <p className="text-authentic-gray">
                        Upon confirmation, you will have immediate access to the Inner Oracle and its guided spiritual content.
                    </p>

                    {/* Price - USD $5 */}
                    <div className="py-4">
                        <p className="text-4xl font-serif text-authentic-gold">$5.00</p>
                        <p className="text-sm text-authentic-gray/50 mt-1">One-time payment • Lifetime access</p>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        className="btn-authentic w-full"
                    >
                        Access my guide
                    </button>

                    <p className="text-xs text-authentic-gray/40">
                        100% secure payment • Instant access
                    </p>
                </div>
            </div>
        </div>
    )
}

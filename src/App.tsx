import { useState } from 'react'
import Hero from './components/Hero'
import EmotionalValidation from './components/EmotionalValidation'
import WhatIsOracle from './components/WhatIsOracle'
import AuthenticSocialProof from './components/AuthenticSocialProof'
import MainCTA from './components/MainCTA'
import CheckoutModal from './components/CheckoutModal'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openCheckout = () => setIsModalOpen(true)
    const closeCheckout = () => setIsModalOpen(false)

    return (
        <div className="min-h-screen bg-authentic-black selection:bg-authentic-purple selection:text-authentic-gold">
            <Hero onOpenCheckout={openCheckout} />
            <EmotionalValidation />
            <WhatIsOracle />
            <AuthenticSocialProof />
            <MainCTA onOpenCheckout={openCheckout} />

            <footer className="py-12 text-center border-t border-white/5 mx-6">
                <p className="text-authentic-gray/30 text-xs tracking-widest uppercase font-serif">
                    © {new Date().getFullYear()} Avó Divina • Oráculo Interior
                </p>
            </footer>

            {isModalOpen && <CheckoutModal onClose={closeCheckout} />}
        </div>
    )
}

export default App

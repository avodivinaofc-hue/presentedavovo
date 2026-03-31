import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Brazilian Components
import Hero from './components/Hero'
import EmotionalValidation from './components/EmotionalValidation'
import WhatIsOracle from './components/WhatIsOracle'
import AuthenticSocialProof from './components/AuthenticSocialProof'
import MainCTA from './components/MainCTA'
import CheckoutModal from './components/CheckoutModal'

// US Components
import HeroUS from './components/us/HeroUS'
import EmotionalValidationUS from './components/us/EmotionalValidationUS'
import WhatIsOracleUS from './components/us/WhatIsOracleUS'
import AuthenticSocialProofUS from './components/us/AuthenticSocialProofUS'
import MainCTAUS from './components/us/MainCTAUS'
import CheckoutModalUS from './components/us/CheckoutModalUS'
import CongratulationsUS from './components/us/CongratulationsUS'

// Brazilian Version
function BrazilianVersion() {
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

// US Version
function USVersion() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openCheckout = () => setIsModalOpen(true)
    const closeCheckout = () => setIsModalOpen(false)

    return (
        <div className="min-h-screen bg-authentic-black selection:bg-authentic-purple selection:text-authentic-gold">
            <HeroUS onOpenCheckout={openCheckout} />
            <EmotionalValidationUS />
            <WhatIsOracleUS />
            <AuthenticSocialProofUS />
            <MainCTAUS onOpenCheckout={openCheckout} />

            <footer className="py-12 text-center border-t border-white/5 mx-6">
                <p className="text-authentic-gray/30 text-xs tracking-widest uppercase font-serif">
                    © {new Date().getFullYear()} Divine Grandmother • Inner Oracle
                </p>
            </footer>

            {isModalOpen && <CheckoutModalUS onClose={closeCheckout} />}
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BrazilianVersion />} />
                <Route path="/us" element={<USVersion />} />
                <Route path="/us/congratulations" element={<CongratulationsUS />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

import { useState } from 'react'
import Hero from './components/Hero'
import EmotionalValidation from './components/EmotionalValidation'
import WhatIsOracle from './components/WhatIsOracle'
import WhoIsGrandmother from './components/WhoIsGrandmother'
import WhatYouReceive from './components/WhatYouReceive'
import MainCTA from './components/MainCTA'
import EmotionalSecurity from './components/EmotionalSecurity'
import CheckoutModal from './components/CheckoutModal'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openCheckout = () => setIsModalOpen(true)
    const closeCheckout = () => setIsModalOpen(false)

    return (
        <div className="min-h-screen bg-void">
            <Hero onOpenCheckout={openCheckout} />
            <EmotionalValidation />
            <WhatIsOracle />
            <WhoIsGrandmother />
            <WhatYouReceive />
            <MainCTA onOpenCheckout={openCheckout} />
            <EmotionalSecurity />

            <footer className="py-8 text-center text-parchment/40 text-sm border-t border-white/5">
                <p>© {new Date().getFullYear()} Avó Divina. Todos os direitos reservados.</p>
            </footer>

            {isModalOpen && <CheckoutModal onClose={closeCheckout} />}
        </div>
    )
}

export default App

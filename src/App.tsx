
import { useState } from "react";
import HeroEmotional from "./components/HeroEmotional";
import SoulValidation from "./components/SoulValidation";
import GrandmotherAuthority from "./components/GrandmotherAuthority";
import OracleExplanation from "./components/OracleExplanation";
import SacredOffer from "./components/SacredOffer";
import { CheckoutModal } from "./components/CheckoutModal";

function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary/30">

      <main className="relative">
        <HeroEmotional onOpenCheckout={handleOpenCheckout} />
        <SoulValidation />
        <GrandmotherAuthority />
        <OracleExplanation />
        <SacredOffer onOpenCheckout={handleOpenCheckout} />
      </main>

      <footer className="py-8 text-center text-muted-foreground/40 text-xs border-t border-white/5 bg-black">
        <p>© {new Date().getFullYear()} Avó Divina. Todos os direitos reservados.</p>
      </footer>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

export default App;

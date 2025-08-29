import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="mobile-nav-container md:hidden">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-bold text-mystical-gradient">Avó Divina</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="mobile-menu-toggle text-foreground hover:text-primary"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
            <nav className="space-y-6">
              <a 
                href="/" 
                className="block text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Início
              </a>
              <a 
                href="/ebook" 
                className="block text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                E-book Gratuito
              </a>
              <a 
                href="/tripwire" 
                className="block text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Análise Premium
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
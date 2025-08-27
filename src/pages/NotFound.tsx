import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MysticalCard } from "@/components/MysticalCard";
import { MysticalButton } from "@/components/MysticalButton";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <FloatingParticles />
      <MysticalCard variant="glowing" className="p-8 text-center max-w-md">
        <div className="space-y-6">
          <div className="text-6xl">🔮</div>
          <h1 className="text-4xl font-bold text-mystical-gradient">404</h1>
          <p className="text-xl text-mystic-cream/90">
            O Oráculo não conseguiu encontrar esta página...
          </p>
          <p className="text-mystic-cream/70">
            Parece que você se perdeu nas névoas místicas. Que tal retornar ao caminho da luz?
          </p>
          
          <div className="space-y-3">
            <MysticalButton 
              variant="gold" 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Retornar ao Início
            </MysticalButton>
            
            <MysticalButton 
              variant="ethereal"
              onClick={() => window.history.back()}
              className="w-full"
            >
              <Search className="w-4 h-4 mr-2" />
              Voltar à Página Anterior
            </MysticalButton>
          </div>
        </div>
      </MysticalCard>
    </div>
  );
};

export default NotFound;

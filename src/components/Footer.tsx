import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-sm border-t border-purple-400/20 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4">
          {/* Logo/Identidade */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="text-pink-400 w-6 h-6" />
            <span className="text-xl font-bold text-white font-['Playfair_Display']">
              Avó Divina
            </span>
          </div>
          
          {/* CNPJ */}
          <div className="text-center">
            <p className="text-gray-300 text-sm font-['Poppins']">
              CNPJ: 60.050.992/0001-93
            </p>
          </div>
          
          {/* Direitos autorais */}
          <div className="text-center pt-4 border-t border-purple-400/20">
            <p className="text-gray-400 text-xs font-['Poppins']">
              © 2024 Avó Divina. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-xs font-['Poppins'] mt-1">
              Conectando você com a sabedoria ancestral do tarô.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

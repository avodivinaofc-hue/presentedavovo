import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface UrgencyCountdownProps {
  initialHours?: number;
}

export const UrgencyCountdown = ({ initialHours = 2 }: UrgencyCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialHours * 60 * 60); // Converter horas para segundos

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center space-y-4">
      {/* Cronômetro */}
      <div className="vibrant-card p-6 sm:p-8 glow-red">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
          <span className="text-lg sm:text-xl md:text-2xl font-display font-black text-gradient-fire uppercase">
            Oferta Termina em:
          </span>
        </div>
        
        <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {/* Dias */}
          <div className="bg-gradient-fire rounded-xl p-3 sm:p-4 glow-red">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black">
              {String(days).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm md:text-base font-body font-bold mt-2 uppercase">
              {days === 1 ? 'Dia' : 'Dias'}
            </div>
          </div>
          
          {/* Horas */}
          <div className="bg-gradient-intense rounded-xl p-3 sm:p-4 glow-magenta">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black">
              {String(hours).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm md:text-base font-body font-bold mt-2 uppercase">
              {hours === 1 ? 'Hora' : 'Horas'}
            </div>
          </div>
          
          {/* Minutos */}
          <div className="bg-gradient-fire rounded-xl p-3 sm:p-4 glow-red">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black">
              {String(minutes).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm md:text-base font-body font-bold mt-2 uppercase">
              Min
            </div>
          </div>
          
          {/* Segundos */}
          <div className="bg-gradient-intense rounded-xl p-3 sm:p-4 glow-purple">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black">
              {String(seconds).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm md:text-base font-body font-bold mt-2 uppercase">
              Seg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

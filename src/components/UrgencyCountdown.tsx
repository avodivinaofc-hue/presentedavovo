import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface UrgencyCountdownProps {
  initialDays?: number;
}

export const UrgencyCountdown = ({ initialDays = 6 }: UrgencyCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialDays * 24 * 60 * 60); // Converter dias para segundos

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
    <div className="text-center space-y-3">
      {/* Texto de Urgência */}
      <div className="bg-red-600 text-white px-4 py-2 rounded-full inline-block animate-pulse">
        <span className="text-sm sm:text-base md:text-lg font-bold font-['Arial_Black']">
          🔥 PREÇO DE LANÇAMENTO POR TEMPO LIMITADO! 🔥
        </span>
      </div>
      
      {/* Cronômetro */}
      <div className="bg-red-600/20 border-2 border-red-500 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
          <span className="text-red-500 text-sm sm:text-base font-bold font-['Arial_Black']">
            OFERTA TERMINA EM:
          </span>
        </div>
        
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {/* Dias */}
          <div className="bg-red-600 text-white rounded-lg p-2 sm:p-3">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold font-['Arial_Black']">
              {String(days).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm font-bold">
              {days === 1 ? 'DIA' : 'DIAS'}
            </div>
          </div>
          
          {/* Horas */}
          <div className="bg-red-600 text-white rounded-lg p-2 sm:p-3">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold font-['Arial_Black']">
              {String(hours).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm font-bold">
              {hours === 1 ? 'HORA' : 'HORAS'}
            </div>
          </div>
          
          {/* Minutos */}
          <div className="bg-red-600 text-white rounded-lg p-2 sm:p-3">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold font-['Arial_Black']">
              {String(minutes).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm font-bold">
              {minutes === 1 ? 'MIN' : 'MINS'}
            </div>
          </div>
          
          {/* Segundos */}
          <div className="bg-red-600 text-white rounded-lg p-2 sm:p-3">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold font-['Arial_Black']">
              {String(seconds).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm font-bold">
              {seconds === 1 ? 'SEG' : 'SEGS'}
            </div>
          </div>
        </div>
        
        <div className="mt-3 text-red-500 text-xs sm:text-sm font-bold font-['Arial_Black']">
          ⚠️ Após este período, o preço volta ao valor normal de R$ 29,90
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialMinutes?: number;
}

export const CountdownTimer = ({ initialMinutes = 15 }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-mystical-gradient mb-2">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <p className="text-mystic-gold text-sm">Esta oferta especial desaparece em:</p>
    </div>
  );
};
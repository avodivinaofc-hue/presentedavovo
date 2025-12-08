import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SubtleCountdown = () => {
  const { t, i18n } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  const isEnglish = i18n.language === 'en';

  return (
    <section className={`py-6 border-y ${isEnglish ? 'bg-muted border-border' : 'bg-mystic-darker border-mystic-red/30'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span className="font-medium">{t("urgency.title")}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`px-3 py-2 rounded-md font-mono text-lg font-bold ${
              isEnglish 
                ? 'bg-primary/10 text-primary' 
                : 'bg-gradient-fire text-white'
            }`}>
              {String(hours).padStart(2, '0')}
              <span className="text-xs font-normal ml-1">
                {isEnglish ? 'hr' : 'h'}
              </span>
            </div>
            <span className="text-xl font-bold text-muted-foreground">:</span>
            <div className={`px-3 py-2 rounded-md font-mono text-lg font-bold ${
              isEnglish 
                ? 'bg-primary/10 text-primary' 
                : 'bg-gradient-intense text-white'
            }`}>
              {String(minutes).padStart(2, '0')}
              <span className="text-xs font-normal ml-1">
                {isEnglish ? 'min' : 'min'}
              </span>
            </div>
            <span className="text-xl font-bold text-muted-foreground">:</span>
            <div className={`px-3 py-2 rounded-md font-mono text-lg font-bold ${
              isEnglish 
                ? 'bg-primary/10 text-primary' 
                : 'bg-gradient-fire text-white'
            }`}>
              {String(seconds).padStart(2, '0')}
              <span className="text-xs font-normal ml-1">
                {isEnglish ? 'sec' : 'seg'}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {t("urgency.alert")}
          </p>
        </div>
      </div>
    </section>
  );
};
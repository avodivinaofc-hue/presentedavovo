import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BANNER_DISMISSED_KEY = 'languageBannerDismissed';

const languageNames = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
};

export const LanguageBanner = () => {
  const { i18n, t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if banner was already dismissed
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    if (dismissed) return;

    // Check if language was manually selected (cookie exists)
    const cookieLanguage = document.cookie
      .split('; ')
      .find(row => row.startsWith('i18nextLng='))
      ?.split('=')[1];
    
    if (cookieLanguage) return;

    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['pt', 'en', 'es'];
    
    // Only show banner if browser language is different from current and is supported
    if (supportedLangs.includes(browserLang) && browserLang !== i18n.language) {
      setSuggestedLanguage(browserLang);
      setShowBanner(true);
    }
  }, [i18n.language]);

  const handleAccept = () => {
    if (suggestedLanguage) {
      i18n.changeLanguage(suggestedLanguage);
      const currentPath = window.location.pathname;
      const pathWithoutLang = currentPath.replace(/^\/(pt|en|es)/, '');
      const newPath = `/${suggestedLanguage}${pathWithoutLang || '/'}`;
      window.history.pushState({}, '', newPath);
    }
    setShowBanner(false);
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
  };

  if (!showBanner || !suggestedLanguage) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-mystic-purple to-mystic-blue border-b border-mystic-gold/30 shadow-lg animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-mystic-cream text-sm sm:text-base font-['Poppins']">
            {t('languageBanner.title', { language: languageNames[suggestedLanguage as keyof typeof languageNames] })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleAccept}
            size="sm"
            className="bg-mystic-gold hover:bg-mystic-gold/90 text-mystic-blue font-['Poppins'] font-bold"
          >
            {t('languageBanner.confirm')}
          </Button>
          <Button
            onClick={handleDismiss}
            size="sm"
            variant="ghost"
            className="text-mystic-cream/80 hover:text-mystic-cream hover:bg-mystic-purple/30"
          >
            {t('languageBanner.dismiss')}
          </Button>
          <button
            onClick={handleDismiss}
            className="text-mystic-cream/60 hover:text-mystic-cream transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

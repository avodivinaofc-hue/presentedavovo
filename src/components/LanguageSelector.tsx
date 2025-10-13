import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = {
  pt: { name: 'Português', flag: '🇧🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
};

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update URL with language prefix
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(pt|en|es)/, '');
    const newPath = `/${lng}${pathWithoutLang || '/'}`;
    window.history.pushState({}, '', newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-mystic-purple/20 hover:bg-mystic-purple/30 transition-colors border border-mystic-purple-light/20">
        <Globe className="w-4 h-4 text-mystic-gold" />
        <span className="text-sm text-mystic-cream font-['Poppins']">
          {languages[i18n.language as keyof typeof languages]?.flag || '🌐'}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-mystic-blue/95 border-mystic-purple-light/30 backdrop-blur-sm">
        {Object.entries(languages).map(([code, { name, flag }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className="text-mystic-cream hover:bg-mystic-purple/30 cursor-pointer"
          >
            <span className="mr-2">{flag}</span>
            <span className="font-['Poppins']">{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

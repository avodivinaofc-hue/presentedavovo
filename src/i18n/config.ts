import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

const COOKIE_NAME = 'i18nextLng';
const SUPPORTED_LANGUAGES = ['pt', 'en', 'es'];
const DEFAULT_LANGUAGE = 'pt';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['cookie', 'navigator', 'htmlTag'],
      caches: ['cookie'],
      cookieMinutes: 525600, // 1 year
      cookieDomain: window.location.hostname,
      lookupCookie: COOKIE_NAME,
    },
  });

export default i18n;
export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE };

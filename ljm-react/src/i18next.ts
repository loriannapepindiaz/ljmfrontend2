import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es/translation.json';
import en from './locales/en/translation.json';

const savedLang = localStorage.getItem('idioma');
const initialLang = savedLang === 'en' || savedLang === 'es' ? savedLang : 'es';

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: initialLang,
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;

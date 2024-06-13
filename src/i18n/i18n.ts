import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';
import en from './en.json';
import ro from './ro.json';

const languages = ['en', 'ro'];
const resources = {
  en: {
    translation: en,
  },
  ro: {
    translation: ro,
  },
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    whitelist: languages,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

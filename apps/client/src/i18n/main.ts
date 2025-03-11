import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).use(LanguageDetector).init({
  resources: {
    en: { translation: { welcome: "Welcome", goodbye: "Goodbye" } },
    he: { translation: { welcome: "ברוך הבא", goodbye: "להתראות" } },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

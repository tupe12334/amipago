import i18next, { t } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(LanguageDetector).init({
  resources: {
    en: { translation: { welcome: "Welcome", goodbye: "Goodbye" } },
    he: { translation: { welcome: "ברוך הבא", goodbye: "להתראות" } },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

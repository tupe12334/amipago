import i18next from "i18next";

i18next.init({
  resources: {
    en: { translation: { welcome: "Welcome", goodbye: "Goodbye" } },
    he: { translation: { welcome: "ברוך הבא", goodbye: "להתראות" } },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

console.log(i18next.t("welcome")); // Output: Welcome

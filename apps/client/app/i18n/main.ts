import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Define our translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      goodbye: "Goodbye",
      form: {
        success: {
          group: "Group created successfully!",
        },
      },
      expense: {
        title: "New Expense",
        amount: "Amount:",
        description: "Description:",
        date: "Date:",
        currency: "Currency:",
        save: "Save Expense",
        success: "Expense created successfully!",
        payer: "Payer", // added key
        groupSelector: "Select Group", // added key
        placeholder: {
          amount: "Enter amount",
          description: "Enter expense description",
          payer: "Enter payer's name", // added key
        },
        validation: {
          positiveAmount: "Amount must be positive",
          minAmount: "Amount must be at least 0.01",
          invalidDate: "Invalid date",
        },
      },
      currencies: {
        ILS: "NIS",
        USD: "USD",
      },
    },
  },
  he: {
    translation: {
      welcome: "ברוך הבא",
      goodbye: "להתראות",
      form: {
        success: {
          group: "הקבוצה נוצרה בהצלחה!",
        },
      },
      expense: {
        title: "הוצאה חדשה",
        amount: "סכום:",
        description: "תיאור:",
        date: "תאריך:",
        currency: "מטבע:",
        save: "שמור הוצאה",
        success: "ההוצאה נוצרה בהצלחה!",
        payer: "משלם", // added key
        groupSelector: "בחר קבוצה", // added key
        placeholder: {
          amount: "הכנס סכום",
          description: "הכנס תיאור הוצאה",
          payer: "הזן שם משלם", // added key
        },
        validation: {
          positiveAmount: "הסכום חייב להיות חיובי",
          minAmount: "הסכום חייב להיות לפחות 0.01",
          invalidDate: "תאריך לא תקין",
        },
      },
      currencies: {
        ILS: "שקל",
        USD: "דולר",
      },
    },
  },
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: "he", // Default language set to Hebrew
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    // Set RTL direction for Hebrew
    react: {
      useSuspense: false,
    },
    // Add language direction configuration
    supportedLngs: ["en", "he"],
  });

// Export language direction helper function
export const getLanguageDir = (language: string): "rtl" | "ltr" => {
  return language === "he" ? "rtl" : "ltr";
};

export default i18next;

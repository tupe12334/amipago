import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLanguageDir } from "./i18n/main";
import { AddButton } from "./components/AddButton/AddButton";
import NavBar from "./components/NavBar/NavBar";
import GroupList from "./components/GroupList/GroupList";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set the document direction based on the current language
    document.documentElement.dir = getLanguageDir(i18n.language);
    document.documentElement.lang = i18n.language;

    // Update direction when language changes
    const handleLanguageChange = () => {
      document.documentElement.dir = getLanguageDir(i18n.language);
      document.documentElement.lang = i18n.language;
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <div
        className="flex flex-col flex-1 p-4 overflow-y-auto"
        aria-label="תוכן ראשי"
      >
        <h1 className="text-2xl font-bold mb-4">הקבוצות שלי</h1>
        <GroupList />
        <AddButton />
      </div>
    </main>
  );
}

export default App;

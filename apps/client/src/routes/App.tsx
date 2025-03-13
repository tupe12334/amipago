import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLanguageDir } from "../i18n/main";
import { AddButton } from "../components/AddButton/AddButton";
import NavBar from "../components/NavBar/NavBar";
import GroupList from "../components/GroupList/GroupList";

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

  // Add effect to disable scrolling
  useEffect(() => {
    // Disable scrolling on html and body elements
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.height = "100%";
    document.body.style.width = "100%";

    return () => {
      // Restore scrolling when component unmounts
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.height = "";
      document.body.style.width = "";
    };
  }, []);

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

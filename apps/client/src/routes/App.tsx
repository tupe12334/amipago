import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLanguageDir } from "../i18n/main";
import { AddButton } from "../components/AddButton/AddButton";
import NavBar from "../components/NavBar/NavBar";
import GroupList from "../components/GroupList/GroupList";
import { ButtonGroup } from "../components/ButtonGroup/ButtonGroup";
import { useUser } from "../context/UserContext";

function App() {
  const { i18n } = useTranslation();
  const { userId, isLoading: userLoading, error: userError } = useUser();
  const [activeView, setActiveView] = useState<"groups" | "activity">("groups");
  const [showUserMessage, setShowUserMessage] = useState(true);

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

  // Hide the user message after 3 seconds
  useEffect(() => {
    if (userId && !userLoading) {
      const timer = setTimeout(() => {
        setShowUserMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [userId, userLoading]);

  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <div
        className="flex flex-col flex-1 p-4 overflow-y-auto"
        aria-label="תוכן ראשי"
      >
        <h1 id="main-heading" className="text-2xl font-bold mb-4">
          הקבוצות שלי
        </h1>

        {userLoading ? (
          <div
            className="bg-blue-50 p-3 mb-4 rounded"
            id="user-loading-message"
          >
            <p className="text-blue-700 text-center">
              <i className="fa fa-spinner fa-pulse ml-2" aria-hidden="true"></i>
              מאתחל את המערכת...
            </p>
          </div>
        ) : userError ? (
          <div className="bg-red-50 p-3 mb-4 rounded" id="user-error-message">
            <p className="text-red-700 text-center">
              <i
                className="fa fa-exclamation-circle ml-2"
                aria-hidden="true"
              ></i>
              שגיאה באתחול מזהה משתמש
            </p>
          </div>
        ) : userId && showUserMessage ? (
          <div
            className="bg-green-50 p-3 mb-4 rounded"
            id="user-success-message"
          >
            <p className="text-green-700 text-center">
              <i className="fa fa-check-circle ml-2" aria-hidden="true"></i>
              המשתמש אותחל בהצלחה עם מזהה ייחודי
            </p>
          </div>
        ) : null}

        <ButtonGroup
          options={[
            { value: "groups", label: "הקבוצות שלי" },
            { value: "activity", label: "פעילות אחרונה" },
          ]}
          selected={activeView}
          onChange={setActiveView}
        />
        {activeView === "groups" && <GroupList />}
        {activeView === "activity" && (
          <div
            id="activity-view"
            className="text-center p-8 bg-gray-100 rounded-md"
          >
            <p>פעילות אחרונה עדיין לא זמינה</p>
          </div>
        )}
        <AddButton />
      </div>
    </main>
  );
}

export default App;

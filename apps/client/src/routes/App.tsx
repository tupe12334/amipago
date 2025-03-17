import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLanguageDir } from "../i18n/main";
import { AddButton } from "../components/AddButton/AddButton";
import NavBar from "../components/NavBar/NavBar";
import { GroupList } from "../components/GroupList/GroupList";
import { ButtonGroup } from "../components/ButtonGroup/ButtonGroup";
import { useUser } from "../context/UserContext";
import { RecentActivityView } from "./RecentActivityView";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function App() {
  const { i18n } = useTranslation();
  const { userId, isLoading: userLoading, error: userError } = useUser();
  const [activeView, setActiveView] = useState<"groups" | "activity">("groups");

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
    <Box
      component="main"
      id="app-main"
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
    >
      <NavBar />
      <Container
        id="content-container"
        component="section"
        aria-label="תוכן ראשי"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: 2,
          overflowY: "auto",
        }}
      >
        <Typography
          id="main-heading"
          variant="h3"
          component="h3"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          הקבוצות שלי
        </Typography>
        <ButtonGroup
          options={[
            { value: "groups", label: "הקבוצות שלי" },
            { value: "activity", label: "פעילות אחרונה" },
          ]}
          selected={activeView}
          onChange={setActiveView}
        />
        {activeView === "groups" && <GroupList />}
        {activeView === "activity" && <RecentActivityView />}
        <AddButton />
      </Container>
    </Box>
  );
}

export default App;

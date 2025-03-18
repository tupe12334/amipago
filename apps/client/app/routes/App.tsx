import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddButton } from "../components/AddButton/AddButton";
import { GroupListContainer } from "../components/GroupList/GroupListContainer";
import { NavBar } from "../components/NavBar/NavBar";
import { getLanguageDir } from "../i18n/main";
import { RecentActivityView } from "./RecentActivityView";

function App() {
  const { i18n } = useTranslation();
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
          id="view-toggle-button-group"
          variant="contained"
          aria-label="בחירת תצוגה"
          fullWidth
          sx={{ mb: 2 }}
        >
          <Button
            id="groups-view-button"
            onClick={() => setActiveView("groups")}
            variant={activeView === "groups" ? "contained" : "outlined"}
          >
            הקבוצות שלי
          </Button>
          <Button
            id="activity-view-button"
            onClick={() => setActiveView("activity")}
            variant={activeView === "activity" ? "contained" : "outlined"}
          >
            פעילות אחרונה
          </Button>
        </ButtonGroup>
        {activeView === "groups" && <GroupListContainer />}
        {activeView === "activity" && <RecentActivityView />}
        <AddButton />
      </Container>
    </Box>
  );
}

export { App };

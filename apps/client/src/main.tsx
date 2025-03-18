import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./routes/router";
import { UserProvider } from "./context/UserContext";
import { OnboardingWrapper } from "./components/OnboardingWrapper";
import { ThemeProvider } from "./theme/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <UserProvider>
        <ThemeProvider>
          <OnboardingWrapper>
            <Router />
          </OnboardingWrapper>
        </ThemeProvider>
      </UserProvider>
    </LocalizationProvider>
  </React.StrictMode>
);

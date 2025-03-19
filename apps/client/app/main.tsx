import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./routes/router";
import { ThemeProvider } from "./theme/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./firebase/config";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);

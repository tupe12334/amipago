import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./routes/router";
import { ThemeProvider } from "./theme/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./firebase/config";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/main";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);

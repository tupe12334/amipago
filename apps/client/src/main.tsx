import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./routes/router";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="m-0 select-none">
    <React.StrictMode>
      <UserProvider>
        <Router />
      </UserProvider>
    </React.StrictMode>
  </div>
);

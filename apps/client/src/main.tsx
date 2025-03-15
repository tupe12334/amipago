import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./routes/router";
import { UserProvider } from "./context/UserContext";
import { OnboardingWrapper } from "./components/OnboardingWrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="m-0 select-none">
    <React.StrictMode>
      <UserProvider>
        <OnboardingWrapper>
          <Router />
        </OnboardingWrapper>
      </UserProvider>
    </React.StrictMode>
  </div>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="m-0 select-none">
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/group" element={<CreateGroupPage />} /> {/* create group */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </div>
);

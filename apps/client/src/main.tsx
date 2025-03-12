import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import "./index.css";
import { createExpensePath, createGroupPath } from "./paths";
import { CreateExpensePage } from "./routes/create/expense/create-expense";
import { CreateGroupPage } from "./routes/create/group/create-group";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="m-0 select-none">
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path={createGroupPath} element={<CreateGroupPage />} />
          <Route path={createExpensePath} element={<CreateExpensePage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </div>
);

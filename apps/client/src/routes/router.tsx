import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { createExpensePath, createGroupPath } from "../paths";
import { CreateGroupPage } from "./create/group/create-group";
import { CreateExpensePage } from "./create/expense/create-expense";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path={createGroupPath} element={<CreateGroupPage />} />
        <Route path={createExpensePath} element={<CreateExpensePage />} />
      </Routes>
    </BrowserRouter>
  );
};

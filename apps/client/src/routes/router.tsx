import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import {
  createExpensePath,
  createExpenseForGroupPath,
  createGroupPath,
  groupPath,
} from "../paths";
import { CreateGroupPage } from "./create/group/create-group";
import { CreateExpensePage } from "./create/expense/create-expense";
import { GroupContainer } from "./group";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path={createGroupPath} element={<CreateGroupPage />} />
        <Route path={createExpensePath} element={<CreateExpensePage />} />
        <Route
          path={createExpenseForGroupPath}
          element={<CreateExpensePage />}
        />
        <Route path={groupPath} element={<GroupContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

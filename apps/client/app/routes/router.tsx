import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App";
import {
  createExpensePath,
  createExpenseForGroupPath,
  createGroupPath,
  groupPath,
  onboardingPath,
} from "../paths";
import { CreateGroupPage } from "./create/group/create-group";
import { CreateExpensePage } from "./create/expense/create-expense";
import { GroupContainer } from "./group";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const OnboardingPage = lazy(() => import("../pages/OnboardingPage"));

const LoadingFallback = () => (
  <Box
    id="route-loading"
    display="flex"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
  >
    <CircularProgress aria-label="טוען..." />
  </Box>
);

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path={onboardingPath} element={<OnboardingPage />} />
          <Route path={createGroupPath} element={<CreateGroupPage />} />
          <Route path={createExpensePath} element={<CreateExpensePage />} />
          <Route
            path={createExpenseForGroupPath}
            element={<CreateExpensePage />}
          />
          <Route path={groupPath} element={<GroupContainer />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

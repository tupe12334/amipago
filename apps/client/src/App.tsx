import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const App: React.FC = () => {
  return (
    <div dir="rtl">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

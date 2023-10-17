import React from "react";
import { AppContext } from "./AppContext.tsx";
import { defaultContext } from "./defaultContext.tsx";
import { router } from "./router.tsx";
import { RouterProvider } from "react-router-dom";

export const App = () => {
  return (
    <React.StrictMode>
      <AppContext.Provider value={defaultContext}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </React.StrictMode>
  );
};

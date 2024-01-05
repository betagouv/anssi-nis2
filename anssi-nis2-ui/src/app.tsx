import React from "react";
import { AppContext } from "./Services/AppContexte/AppContext.definition.ts";
import { defaultContext } from "./Services/AppContexte/AppContext.constantes.ts";
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

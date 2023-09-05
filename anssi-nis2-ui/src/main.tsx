import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Accueil from "./Accueil.tsx";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import Simulateur from "./Simulateur.tsx";
import { SimulateurFormData } from "./Services/simulateurFrontServices.ts";
import { AppContext, Context, SendFormData } from "./AppContext.tsx";

startReactDsfr({ defaultColorScheme: "system" });

const sendFormData: SendFormData = async (formData: SimulateurFormData) => {
  const data = JSON.stringify(formData);
  console.log(data);
  return data;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/simulateur",
    element: <Simulateur />,
  },
]);
const defaultContext: Context = {
  sendFormData: sendFormData,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContext.Provider value={defaultContext}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  </React.StrictMode>,
);

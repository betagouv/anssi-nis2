import { AppContext } from "../../Components/AppContexte/AppContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  reducerBoutons,
  reducerFormData,
} from "../../Services/Simulateur/Reducteurs.ts";

import { Contexte } from "../../Services/contexte";
import { StoryComponent } from "./typesUtilitaires";

const defaultAsyncStringFonctionInjected = async () => {
  return "";
};

export const defaultContext: Contexte = {
  envoieDonneesFormulaire: defaultAsyncStringFonctionInjected,
  simulateur: {
    reducteurActionsBoutonNavigation: reducerBoutons,
    reducteurDonneesFormulaire: reducerFormData,
  },
};

export const pageDecorator = (Story: StoryComponent) => {
  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Story />,
    },
  ]);
  return (
    <AppContext.Provider value={defaultContext}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

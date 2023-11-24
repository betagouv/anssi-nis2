import { AppContext } from "../../Components/AppContexte/AppContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  reducerBoutons,
  reducerFormData,
} from "../../Services/Simulateur/Reducteurs.ts";

import { Contexte } from "../../Services/contexte";
import { StoryComponent } from "./typesUtilitaires";
import { AggregatInformationsEmail } from "../../../../anssi-nis2-domain/src/Contact/InformationsEmail.definitions.ts";

const defaultAsyncStringFonctionInjected = async () => {
  return "";
};
const defaultAsyncAggregatInformationsEmailFonctionInjected =
  async (): Promise<AggregatInformationsEmail> => {
    return {
      id: 0,
      email: "toto@titi.tutu",
      accepteInfolettreNis2: true,
      accepteInfolettreServicesDedies: true,
      nomOrganisation: "Titi International",
    };
  };

export const defaultContext: Contexte = {
  envoieDonneesFormulaire: defaultAsyncStringFonctionInjected,
  enregistreInformationsEmail:
    defaultAsyncAggregatInformationsEmailFonctionInjected,
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

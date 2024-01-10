import { AggregatInformationsEmail } from "../../../../commun/core/src/Domain/Contact/InformationsEmail.definitions.ts";
import { AppContext } from "../../Services/AppContexte/AppContext.definition.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  reducerBoutons,
  reduitDonneesFormulaire,
} from "../../Services/Simulateur/Reducteurs.ts";

import { Contexte } from "../../Services/contexte";
import { StoryComponent } from "./typesUtilitaires";

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
    reducteurDonneesFormulaire: reduitDonneesFormulaire,
  },
};

export const pageDecorator = (Story: StoryComponent) => {
  const router = createBrowserRouter([
    {
      path: "/*",
      element: (
        <>
          <Story />
        </>
      ),
    },
  ]);
  return (
    <AppContext.Provider value={defaultContext}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

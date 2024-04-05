import { AggregatInformationsEmail } from "../../../../commun/core/src/Domain/Contact/InformationsEmail.definitions.ts";
import {
  reducerBoutons,
  reduitDonneesFormulaire,
} from "../../Services/Simulateur/Reducteurs.ts";

import { Contexte } from "../../Services/contexte";

export const defaultContext: Contexte = {
  envoieDonneesFormulaire: async () => "",
  enregistreInformationsEmail:
    async (): Promise<AggregatInformationsEmail> => ({
      id: 0,
      email: "toto@titi.tutu",
      accepteInfolettreNis2: true,
      accepteInfolettreServicesDedies: true,
      nomOrganisation: "Titi International",
    }),
  simulateur: {
    reducteurActionsBoutonNavigation: reducerBoutons,
    reducteurDonneesFormulaire: reduitDonneesFormulaire,
  },
};

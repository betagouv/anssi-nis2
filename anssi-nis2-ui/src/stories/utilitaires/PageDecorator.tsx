import { AggregatInformationsEmail } from "../../InformationsEmail/InformationsEmail.ts";

import { Contexte } from "../../Services/contexte";

export const defaultContext: Contexte = {
  envoieDonneesFormulaire: async () => {},
  enregistreInformationsEmail:
    async (): Promise<AggregatInformationsEmail> => ({
      id: 0,
      email: "toto@titi.tutu",
      accepteInfolettreNis2: true,
      accepteInfolettreServicesDedies: true,
      nomOrganisation: "Titi International",
    }),
};

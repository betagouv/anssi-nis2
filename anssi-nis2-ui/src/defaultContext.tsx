import { Contexte } from "./Services/contexte";
import { sendFormDataToApi } from "./Services/sendFormDataToApi.ts";
import {
  reducerBoutons,
  reducerFormData,
} from "./Services/Simulateur/Reducteurs.ts";

export const defaultContext: Contexte = {
  envoieDonneesFormulaire: sendFormDataToApi,
  simulateur: {
    reducteurDonneesFormulaire: reducerFormData,
    reducteurActionsBoutonNavigation: reducerBoutons,
  },
};

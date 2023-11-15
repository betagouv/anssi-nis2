import { Contexte } from "../../Services/contexte";
import {
  enregistreInformationsEmailVersApi,
  sendFormDataToApi,
} from "../../Services/sendFormDataToApi.ts";
import {
  reducerBoutons,
  reducerFormData,
} from "../../Services/Simulateur/Reducteurs.ts";

export const defaultContext: Contexte = {
  envoieDonneesFormulaire: sendFormDataToApi,
  enregistreInformationsEmail: enregistreInformationsEmailVersApi,
  simulateur: {
    reducteurDonneesFormulaire: reducerFormData,
    reducteurActionsBoutonNavigation: reducerBoutons,
  },
};

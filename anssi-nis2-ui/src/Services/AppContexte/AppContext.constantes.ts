import { Contexte } from "../contexte";
import {
  enregistreInformationsEmailVersApi,
  sendFormDataToApi,
} from "../sendFormDataToApi.ts";
import {
  reducerBoutons,
  reduitDonneesFormulaire,
} from "../Simulateur/Reducteurs.ts";

export const defaultContext: Contexte = {
  envoieDonneesFormulaire: sendFormDataToApi,
  enregistreInformationsEmail: enregistreInformationsEmailVersApi,
  simulateur: {
    reducteurDonneesFormulaire: reduitDonneesFormulaire,
    reducteurActionsBoutonNavigation: reducerBoutons,
  },
};

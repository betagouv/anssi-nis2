import { Contexte } from "../contexte";
import {
  enregistreInformationsEmailVersApi,
  sendFormDataToApi,
} from "../sendFormDataToApi.ts";

export const defaultContext: Contexte = {
  envoieDonneesFormulaire: sendFormDataToApi,
  enregistreInformationsEmail: enregistreInformationsEmailVersApi,
};

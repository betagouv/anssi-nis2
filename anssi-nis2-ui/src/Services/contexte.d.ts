import {
  EnregistreInformationsEmail,
  EnvoieDonneesFormulaire,
} from "./Simulateur/Operations/appelsApi";

export type Contexte = {
  envoieDonneesFormulaire: EnvoieDonneesFormulaire;
  enregistreInformationsEmail: EnregistreInformationsEmail;
};

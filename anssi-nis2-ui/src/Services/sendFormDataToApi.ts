import { InformationsEmail } from "../../../commun/core/src/Domain/Contact/InformationsEmail.definitions.ts";
import { DonneesFormulaireSimulateur } from "../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { genereClientApi } from "./prepare.ts";
import {
  EnregistreInformationsEmail,
  EnvoieDonneesFormulaire,
} from "./Simulateur/Operations/appelsApi";

export const sendFormDataToApi: EnvoieDonneesFormulaire = async (
  formData: DonneesFormulaireSimulateur,
) => {
  const simulationApi = genereClientApi();
  await simulationApi.post("/simulateur-reponse", formData);
};

export const enregistreInformationsEmailVersApi: EnregistreInformationsEmail =
  async (informations: InformationsEmail) => {
    try {
      const api = genereClientApi();
      await api.post("/informations-emails", informations);
    } catch (e) {
      throw Error("Erreur à l'appel API d'enregistrement d'email : " + e);
    }
  };

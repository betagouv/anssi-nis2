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
  const data = JSON.stringify(formData);
  const simulationApi = genereClientApi();
  simulationApi
    .post("/", formData)
    .then((response) => console.log(JSON.stringify(response)));
  return data;
};

export const enregistreInformationsEmailVersApi: EnregistreInformationsEmail =
  async (informations: InformationsEmail) => {
    try {
      const api = genereClientApi("informations-emails");
      await api.post("/", informations);
    } catch (e) {
      throw Error("Erreur à l'appel API d'enregistrement d'email : " + e);
    }
  };

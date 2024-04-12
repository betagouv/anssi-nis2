import {
  AggregatInformationsEmail,
  InformationsEmail,
} from "../../../commun/core/src/Domain/Contact/InformationsEmail.definitions.ts";
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
    const simulationApi = genereClientApi("informations-emails");
    simulationApi
      .post("/", informations)
      .then((response) => {
        response.data as AggregatInformationsEmail;
      })
      .catch((reason) => {
        throw Error(
          "Erreur à l'appel API d'enregistrement d'email : " + reason,
        );
      });
  };

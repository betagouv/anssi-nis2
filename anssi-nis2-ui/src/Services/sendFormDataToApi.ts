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
  console.log(`Calling to API Simulation ${data}`);
  simulationApi
    .post("/", formData)
    .then((response) => console.log(JSON.stringify(response)));
  return data;
};
export const enregistreInformationsEmailVersApi: EnregistreInformationsEmail =
  async (informations: InformationsEmail) => {
    const ERREUR_APPEL = 0;
    let retourApi: AggregatInformationsEmail | typeof ERREUR_APPEL =
      ERREUR_APPEL;
    const simulationApi = genereClientApi("informations-emails");
    console.log(`[API info email - POST] ${JSON.stringify(informations)}`);
    simulationApi
      .post("/", informations)
      .then((response) => {
        retourApi = response.data as AggregatInformationsEmail;
        console.log(JSON.stringify(response));
      })
      .catch((reason) => {
        retourApi = ERREUR_APPEL;
        throw Error(
          "Erreur à l'appel API d'enregistrement d'email : " + reason,
        );
      });
    if (retourApi !== ERREUR_APPEL) return retourApi;
    else throw Error("Erreur à l'appel API d'enregistrement d'email");
  };

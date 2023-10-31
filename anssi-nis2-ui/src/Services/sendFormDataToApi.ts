import { generateSimulationApi } from "./prepare.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../Domaine/Simulateur/DonneesFormulaire.ts";
import { EnvoieDonneesFormulaire } from "./Simulateur/Operations/appelsApi";

export const sendFormDataToApi: EnvoieDonneesFormulaire = async (
  formData: IDonneesBrutesFormulaireSimulateur,
) => {
  const data = JSON.stringify(formData);
  const simulationApi = generateSimulationApi();
  console.log(`Calling to API Simulation ${data}`);
  simulationApi
    .post("/", formData)
    .then((response) => console.log(JSON.stringify(response)));
  return data;
};

import { generateSimulationApi } from "./prepare.ts";
import { DonneesFormulaireSimulateur } from "../Domaine/Simulateur/DonneesFormulaire.ts";
import { SendFormData } from "./Simulateur/Workflow/appelsApi";

export const sendFormDataToApi: SendFormData = async (
  formData: DonneesFormulaireSimulateur,
) => {
  const simulationApi = generateSimulationApi();
  const data = JSON.stringify(formData);
  console.log(`Calling to API Simulation ${data}`);
  simulationApi
    .post("/", formData)
    .then((response) => console.log(JSON.stringify(response)));
  return data;
};

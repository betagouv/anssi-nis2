import { SendFormData } from "../AppContext.tsx";
import { SimulateurFormData } from "./simulateurFrontServices.ts";
import { simulationApi } from "../prepare.ts";

export const sendFormDataToApi: SendFormData = async (
  formData: SimulateurFormData,
) => {
  const data = JSON.stringify(formData);
  simulationApi
    .post("/", formData)
    .then((response) => console.log(JSON.stringify(response)));
  return data;
};
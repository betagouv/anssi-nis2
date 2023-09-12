import { FormValueHandler } from "../../Props.ts";
import {
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/Simulateur/FormData.ts";

export const handleSingleValue = (value: string) => [value];
export const generateHandlerMultipleValues =
  (name: SimulateurFieldNames) =>
  (value: string, donneesFormulaire: SimulateurFormData) => {
    if (donneesFormulaire[name].indexOf(value) === -1) {
      return [...donneesFormulaire[name], value];
    }
    return donneesFormulaire[name].filter((content) => content !== value);
  };

export const fieldHandlers: Record<SimulateurFieldNames, FormValueHandler> = {
  etatMembre: generateHandlerMultipleValues("etatMembre"),
  secteurActivite: generateHandlerMultipleValues("secteurActivite"),
  trancheCA: handleSingleValue,
  trancheNombreEmployes: handleSingleValue,
  typeStructure: handleSingleValue,
};

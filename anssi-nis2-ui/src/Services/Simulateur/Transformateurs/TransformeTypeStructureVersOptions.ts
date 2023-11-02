import { TypeStructure } from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/optionChampSimulateur";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getTypesStructureElement = (
  value: string,
  typesStructure: Partial<Record<TypeStructure, string>>,
) => typesStructure[value as TypeStructure] || value;
export const transformeTypeStructureVersOptions: TransformeRecordToSelect<TypeStructure> =
  genereTransformateurValeursVersOptions(
    getTypesStructureElement,
    "typeStructure",
  );

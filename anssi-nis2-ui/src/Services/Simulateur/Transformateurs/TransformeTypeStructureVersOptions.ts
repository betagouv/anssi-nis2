import {
  TypeEntitePublique,
  TypeStructure,
} from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/optionChampSimulateur";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getTypesStructureElement = (
  value: string,
  typesStructure: Partial<Record<TypeStructure, string>>,
) => typesStructure[value as TypeStructure] || value;

const getTypeEntitePubliqueElement = (
  value: string,
  typeEntitePublique: Partial<Record<TypeEntitePublique, string>>,
) => typeEntitePublique[value as TypeEntitePublique] || value;

export const transformeTypeStructureVersOptions: TransformeRecordToSelect<TypeStructure> =
  genereTransformateurValeursVersOptions(
    getTypesStructureElement,
    "typeStructure",
  );
export const transformeTypeEntitePubliqueVersOptions: TransformeRecordToSelect<TypeEntitePublique> =
  genereTransformateurValeursVersOptions(
    getTypeEntitePubliqueElement,
    "typeEntitePublique",
  );

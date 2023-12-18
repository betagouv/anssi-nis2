import {
  TypeEntitePublique,
  TypeStructure,
} from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getTypesStructureElement = (
  value: TypeStructure,
  typesStructure: Record<TypeStructure, string>,
) => typesStructure[value];

const getTypeEntitePubliqueElement = (
  value: TypeEntitePublique,
  typeEntitePublique: Record<TypeEntitePublique, string>,
) => typeEntitePublique[value];

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

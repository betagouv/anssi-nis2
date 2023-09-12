import {
  ValeursClePaysUnionEuropeenne,
  ValeursSecteurActivite,
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
  ValeursTypeStructure,
} from "../Domaine/DomaineSimulateur.ts";
import { NativeInputProps } from "../Props.ts";

export type SimulateurFieldNames =
  | "etatMembre"
  | "typeStructure"
  | "trancheNombreEmployes"
  | "trancheCA"
  | "secteurActivite"
  | "activites";

export type SimulateurFormData = Record<SimulateurFieldNames, string[]>;
export const emptySimulateurFormData: SimulateurFormData = {
  etatMembre: [],
  secteurActivite: [],
  trancheCA: [],
  trancheNombreEmployes: [],
  typeStructure: [],
  activites: [],
};

type TransformeRecordToSelect<ValeursCles extends string> = (
  valeurs: Record<ValeursCles, string>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  formData?: SimulateurFormData,
  group?: string,
) => {
  nativeInputProps: NativeInputProps;
  label: string;
}[];

export const getValueContent = (group: string | undefined, key: string) =>
  group ? `${group}[${key}]` : key;

type labelGenerator<T extends string> = (
  value: string,
  valeursMetier: Record<T, string>,
) => string;
export const genereTransformateurValeursVersOptions =
  <T extends string>(
    generateurLabel: labelGenerator<T>,
    name: SimulateurFieldNames,
  ): TransformeRecordToSelect<T> =>
  (valeursMetier, onChange?, formData?, group?) => {
    const selectOptions: Array<{
      nativeInputProps: NativeInputProps;
      label: string;
    }> = [];
    const checkedValue = formData?.[name as SimulateurFieldNames] || [];
    for (const key in valeursMetier) {
      selectOptions.push();
      selectOptions.push({
        label: generateurLabel(key, valeursMetier),
        nativeInputProps: {
          name: name,
          value: getValueContent(group, key),
          onChange: onChange || (() => {}),
          checked: checkedValue.indexOf(getValueContent(group, key)) !== -1,
        },
      });
    }
    return selectOptions;
  };

const getPaysUnionEuropeenneElement = (
  value: string,
  paysUnionEuropeenne: Record<ValeursClePaysUnionEuropeenne, string>,
) => paysUnionEuropeenne[value as ValeursClePaysUnionEuropeenne];
export const transformePaysUnionEuropeennePourSelect: TransformeRecordToSelect<ValeursClePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    getPaysUnionEuropeenneElement,
    "etatMembre",
  );

const getTypesStructureElement = (
  value: string,
  typesStructure: Record<ValeursTypeStructure, string>,
) => typesStructure[value as ValeursTypeStructure];
export const transformeTypeStructureVersOptions: TransformeRecordToSelect<ValeursTypeStructure> =
  genereTransformateurValeursVersOptions(
    getTypesStructureElement,
    "typeStructure",
  );

const getNombreEmployesElement = (
  value: string,
  tranchesNombreEmployes: Record<ValeursTrancheNombreEmployes, string>,
) => tranchesNombreEmployes[value as ValeursTrancheNombreEmployes];
export const transformeTranchesNombreEmployesVersOptions: TransformeRecordToSelect<ValeursTrancheNombreEmployes> =
  genereTransformateurValeursVersOptions(
    getNombreEmployesElement,
    "trancheNombreEmployes",
  );

const getCALabel = (
  value: string,
  tranchesCA: Record<ValeursTrancheCA, string>,
) => tranchesCA[value as ValeursTrancheCA];
export const transformeTranchesCAVersOptions: TransformeRecordToSelect<ValeursTrancheCA> =
  genereTransformateurValeursVersOptions(getCALabel, "trancheCA");

export const getSecteurActiviteLabel = (
  value: string,
  secteurActivite: Record<ValeursSecteurActivite, string>,
) => secteurActivite[value as ValeursSecteurActivite];
export const transformeSecteursActiviteVersOptions: TransformeRecordToSelect<ValeursSecteurActivite> =
  genereTransformateurValeursVersOptions(
    getSecteurActiviteLabel,
    "secteurActivite",
  );

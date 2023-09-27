import {
  genereTransformateurValeursVersOptions,
  TransformeRecordToSelect,
} from "./simulateurFrontServices.ts";
import {
  ValeursClePaysUnionEuropeenne,
  TValeursSecteursActivites,
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
  ValeursTypeStructure,
} from "../../Domaine/Simulateur/ValeursCles.ts";

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
  secteurActivite: Record<TValeursSecteursActivites, string>,
) => secteurActivite[value as TValeursSecteursActivites];
export const transformeSecteursActiviteVersOptions: TransformeRecordToSelect<TValeursSecteursActivites> =
  genereTransformateurValeursVersOptions(
    getSecteurActiviteLabel,
    "secteurActivite",
  );

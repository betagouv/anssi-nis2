import {
  ValeursClePaysUnionEuropeenne,
  ValeursSecteurActivite,
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
  ValeursTypeStructure,
} from "../../Domaine/DomaineSimulateur.ts";
import {
  genereTransformateurValeursVersOptions,
  TransformeRecordToSelect,
} from "../Utilitaires/Transformateurs.ts/simulateurFrontServices.ts";

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

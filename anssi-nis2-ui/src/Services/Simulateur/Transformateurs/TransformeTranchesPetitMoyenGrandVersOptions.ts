import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/optionChampSimulateur";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getNombreEmployesElement = (
  value: string,
  tranchesNombreEmployes: Partial<Record<TrancheNombreEmployes, string>>,
) => tranchesNombreEmployes[value as TrancheNombreEmployes] || value;
export const transformeTranchesNombreEmployesVersOptions: TransformeRecordToSelect<TrancheNombreEmployes> =
  genereTransformateurValeursVersOptions(
    getNombreEmployesElement,
    "trancheNombreEmployes",
  );
const getCALabel = (
  value: string,
  tranchesCA: Partial<Record<TrancheChiffreAffaire, string>>,
) => tranchesCA[value as TrancheChiffreAffaire] || value;
export const transformeTranchesCAVersOptions: TransformeRecordToSelect<TrancheChiffreAffaire> =
  genereTransformateurValeursVersOptions(getCALabel, "trancheCA");

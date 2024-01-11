import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getNombreEmployesElement = (
  value: TrancheNombreEmployes,
  tranchesNombreEmployes: Record<TrancheNombreEmployes, string>,
) => tranchesNombreEmployes[value];
export const transformeTranchesNombreEmployesVersOptions: TransformeRecordToSelect<TrancheNombreEmployes> =
  genereTransformateurValeursVersOptions(
    getNombreEmployesElement,
    "trancheNombreEmployes",
  );
const getCALabel = (
  value: TrancheChiffreAffaire,
  tranchesCA: Record<TrancheChiffreAffaire, string>,
) => tranchesCA[value];
export const transformeTranchesCAVersOptions: TransformeRecordToSelect<TrancheChiffreAffaire> =
  genereTransformateurValeursVersOptions(getCALabel, "trancheChiffreAffaire");

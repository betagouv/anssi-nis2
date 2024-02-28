import {
  Regulation,
  RegulationEntite,
} from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { PrecisionsResultat } from "../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
import { PrecisionResultat } from "../../../../../commun/core/src/Domain/Simulateur/Resultat.declarations.ts";
import { EtatRegulationDefinitif } from "../../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import {
  libelleTitreIncertainAutrePaysUnionEuropeenne,
  libelleTitreIncertainStandard,
  libelleTitreNonRegule,
  libelleTitreReguleEntiteEssentielle,
  libelleTitreReguleEntiteImportante,
} from "../../../References/LibellesResultatsEligibilite.ts";
import {
  ActionPrecisionsResultat,
  EtatPrecisionsResultat,
} from "./LigneResultat.declarations.ts";
import { match } from "ts-pattern";

export const changePropriete = (
  state: EtatPrecisionsResultat,
  action: ActionPrecisionsResultat,
) => ({ ...state, [action.type]: action.value });

const classPourResultat: Record<
  RegulationEntite,
  (p: PrecisionResultat) => string
> = {
  Regule: () => "fr-nis2-eligible",
  NonRegule: () => "fr-nis2-non-eligible",
  Incertain: (p: PrecisionResultat) =>
    p === PrecisionsResultat.AutrePaysUnionEuropeenne
      ? "fr-nis2-incertain-UE"
      : "fr-nis2-incertain",
};

export const classDivResultat = (
  regulation: RegulationEntite,
  precision: PrecisionResultat,
) => classPourResultat[regulation](precision);

const classPourIcone: Record<
  RegulationEntite,
  (p: PrecisionResultat) => string
> = {
  Regule: () => "fr-icon-check-line",
  NonRegule: () => "fr-icon-close-line",
  Incertain: (p: PrecisionResultat) =>
    p === PrecisionsResultat.AutrePaysUnionEuropeenne
      ? "fr-icon-question-fill"
      : "fr-nis2-icon-in-progress",
};

export const classPourIconeResultat = (
  regulation: RegulationEntite,
  precision: PrecisionResultat,
) => classPourIcone[regulation](precision);

export const recupereTitrePourEtatEvaluation = (
  etatRegulation: EtatRegulationDefinitif,
) =>
  match(etatRegulation)
    .with(
      {
        decision: "Regule",
        typeEntite: "EntiteEssentielle",
      },
      () => libelleTitreReguleEntiteEssentielle,
    )
    .with(
      { decision: "Regule", typeEntite: "EntiteImportante" },
      () => libelleTitreReguleEntiteImportante,
    )
    .with({ decision: "NonRegule" }, () => libelleTitreNonRegule)
    .with(
      {
        // TODO : insérer une précision resultat pour incertain - PrecisionsResultat.AutrePaysUnionEuropeenne
        decision: "Incertain",
      },
      () => libelleTitreIncertainAutrePaysUnionEuropeenne,
    )
    .otherwise(() => libelleTitreIncertainStandard);
export const estIncertainStandard = (
  regulation: RegulationEntite,
  precision: PrecisionResultat,
) =>
  regulation === Regulation.Incertain &&
  precision === PrecisionsResultat.Standard;

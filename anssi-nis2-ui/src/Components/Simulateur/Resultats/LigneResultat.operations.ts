import { RegulationEntite } from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { PrecisionsResultat } from "../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
import { PrecisionResultat } from "../../../../../commun/core/src/Domain/Simulateur/Resultat.declarations.ts";
import {
  libelleTitreIncertainAutrePaysUnionEuropeenne,
  libelleTitreIncertainStandard,
  libelleTitreNonRegule,
  libelleTitreRegule,
} from "../../../References/contenusResultatEligibilite.ts";
import {
  ActionPrecisionsResultat,
  EtatPrecisionsResultat,
} from "./PrecisionsResultat.declarations.ts";

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

const titrePourResultat: Record<
  RegulationEntite,
  (p: PrecisionResultat) => string
> = {
  Regule: () => libelleTitreRegule,
  NonRegule: () => libelleTitreNonRegule,
  Incertain: (p: PrecisionResultat) =>
    p === PrecisionsResultat.AutrePaysUnionEuropeenne
      ? libelleTitreIncertainAutrePaysUnionEuropeenne
      : libelleTitreIncertainStandard,
};

export const recupereTitrePourResultat = (
  regulation: RegulationEntite,
  precision: PrecisionResultat,
) => titrePourResultat[regulation](precision);

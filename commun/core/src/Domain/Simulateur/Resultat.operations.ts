import { match } from "ts-pattern";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire";
import { RegulationEntite } from "./Regulation.definitions";
import {
  PrecisionsResultat,
  PrecisionsResultatRegulation,
} from "./Resultat.constantes";
import {
  PrecisionResultat,
  PrecisionResultatRegulation,
} from "./Resultat.declarations";

const calculePrecisionResultatRegulationIncertain = (
  d: DonneesFormulaireSimulateur
) =>
  match(d)
    .with(
      { etatMembre: ["autre"] },
      () => PrecisionsResultatRegulation.IncertainAutrePaysUnionEuropeenne
    )
    .otherwise(() => PrecisionsResultatRegulation.IncertainStandard);

const calculePrecisionResultatRegulationRegule = (
  d: DonneesFormulaireSimulateur
) =>
  match(d)
    .with(
      { secteurActivite: ["banqueSecteurBancaire"] },
      () => PrecisionsResultatRegulation.ReguleDORA
    )
    .with(
      { activites: ["registresNomsDomainesPremierNiveau"] },
      () => PrecisionsResultatRegulation.ReguleEnregistrementDeNomsDeDomaine
    )
    .otherwise(() => PrecisionsResultatRegulation.ReguleStandard);

const calculePrecisionResultatRegulationNonRegule = (
  d: DonneesFormulaireSimulateur
) =>
  match(d)
    .with(
      { etatMembre: ["horsue"] },
      () => PrecisionsResultatRegulation.NonReguleHorsUnionEuropeenne
    )
    .otherwise(() => PrecisionsResultatRegulation.NonReguleStandard);

const calculateurPrecisionsResultatRegulation: Record<
  RegulationEntite,
  (d: DonneesFormulaireSimulateur) => PrecisionResultatRegulation
> = {
  Regule: calculePrecisionResultatRegulationRegule,
  NonRegule: calculePrecisionResultatRegulationNonRegule,
  Incertain: calculePrecisionResultatRegulationIncertain,
};

export const calculePrecisionResultatRegulation = (e: RegulationEntite) =>
  calculateurPrecisionsResultatRegulation[e];

const calculePrecisionResultatIncertain = (d: DonneesFormulaireSimulateur) =>
  match(d)
    .with(
      { etatMembre: ["autre"] },
      () => PrecisionsResultat.AutrePaysUnionEuropeenne
    )
    .otherwise(() => PrecisionsResultat.Standard);

const calculePrecisionResultatRegule = (d: DonneesFormulaireSimulateur) =>
  match(d)
    .with(
      { secteurActivite: ["banqueSecteurBancaire"] },
      () => PrecisionsResultat.DORA
    )
    .with(
      { activites: ["registresNomsDomainesPremierNiveau"] },
      () => PrecisionsResultat.EnregistrementDeNomsDeDomaine
    )
    .otherwise(() => PrecisionsResultat.Standard);

const calculePrecisionResultatNonRegule = (d: DonneesFormulaireSimulateur) =>
  match(d)
    .with(
      { etatMembre: ["horsue"] },
      () => PrecisionsResultat.HorsUnionEuropeenne
    )
    .otherwise(() => PrecisionsResultat.Standard);

const calculateurPrecisionsResultat: Record<
  RegulationEntite,
  (d: DonneesFormulaireSimulateur) => PrecisionResultat
> = {
  Regule: calculePrecisionResultatRegule,
  NonRegule: calculePrecisionResultatNonRegule,
  Incertain: calculePrecisionResultatIncertain,
};

export const calculePrecisionResultat = (e: RegulationEntite) =>
  calculateurPrecisionsResultat[e];

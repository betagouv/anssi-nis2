import { match } from "ts-pattern";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.definitions";
import { RegulationEntite } from "./Regulation.definitions";
import { PrecisionsResultat } from "./Resultat.constantes";
import { PrecisionResultat } from "./Resultat.declarations";

const calculePrecisionResultatIncertain = (d: DonneesFormulaireSimulateur) =>
  match(d)
    .with(
      { appartenancePaysUnionEurpopeenne: ["autre"] },
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
      { appartenancePaysUnionEurpopeenne: ["horsue"] },
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

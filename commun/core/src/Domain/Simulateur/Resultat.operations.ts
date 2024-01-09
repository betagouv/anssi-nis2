import { match } from "ts-pattern";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire";
import { RegulationEntite } from "./Regulation.definitions";
import { PrecisionsResultat } from "./Resultat.constantes";
import { PrecisionResultat } from "./Resultat.declarations";

const calculePrecisionResultatIncertain = () => PrecisionsResultat.Incertain;

const calculePrecisionsResultatRegule = (d: DonneesFormulaireSimulateur) =>
  match(d)
    .with(
      { secteurActivite: ["banqueSecteurBancaire"] },
      () => PrecisionsResultat.ReguleDORA,
    )
    .with(
      { activites: ["registresNomsDomainesPremierNiveau"] },
      () => PrecisionsResultat.ReguleEnregistrementDeNomsDeDomaine,
    )
    .otherwise(() => PrecisionsResultat.ReguleStandard);

const calculePrecisionsResultatNonRegule = (d: DonneesFormulaireSimulateur) =>
  match(d)
    .with(
      { etatMembre: ["horsue"] },
      () => PrecisionsResultat.NonReguleHorsUnionEuropeenne,
    )
    .otherwise(() => PrecisionsResultat.NonReguleStandard);

const calculateurPrecisionsResultat: Record<
  RegulationEntite,
  (d: DonneesFormulaireSimulateur) => PrecisionResultat
> = {
  Regule: calculePrecisionsResultatRegule,
  NonRegule: calculePrecisionsResultatNonRegule,
  Incertain: calculePrecisionResultatIncertain,
};

export const calculePrecisionsResultat = (e: RegulationEntite) =>
  calculateurPrecisionsResultat[e];

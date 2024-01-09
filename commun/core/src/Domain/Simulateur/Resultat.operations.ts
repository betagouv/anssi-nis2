import { match } from "ts-pattern";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire";
import { Regulation, RegulationEntite } from "./Regulation.definitions";
import { PrecisionsResultat } from "./Resultat.constantes";

const calculatePrecisionResultatIncertain = () => PrecisionsResultat.Incertain;

const calculePrecisionsResultatRegule = (d: DonneesFormulaireSimulateur) =>
  match(d)
    .with(
      { secteurActivite: ["banqueSecteurBancaire"] },
      () => PrecisionsResultat.ReguleDORA,
    )
    .with(
      { activites: ["registresNomsDomainesPremierNiveau"] },
      () => PrecisionsResultat.ReguleEnregistrementNomsDeDomaine,
    )
    .otherwise(() => PrecisionsResultat.ReguleStandard);

const calculePrecisionsResultatNonRegule = (d: DonneesFormulaireSimulateur) =>
  match(d)
    .with(
      { etatMembre: ["horsue"] },
      () => PrecisionsResultat.NonReguleHorsUnionEuropeenne,
    )
    .otherwise(() => PrecisionsResultat.NonReguleStandard);

export const calculePrecisionsResultat = (e: RegulationEntite) => {
  switch (e) {
    case Regulation.Regule:
      return calculePrecisionsResultatRegule;
    case Regulation.NonRegule:
      return calculePrecisionsResultatNonRegule;
    case Regulation.Incertain:
    default:
      return calculatePrecisionResultatIncertain;
  }
};

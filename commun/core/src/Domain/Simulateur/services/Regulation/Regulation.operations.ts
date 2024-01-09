import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire";
import { ResultatEligibilite } from "../../Eligibilite.definitions";
import { fabriqueRegule } from "../../fabriques/Regulation.fabrique";
import {
  causeReguleOSE,
  resultatIncertain,
  resultatNonRegule,
} from "../../Regulation.constantes";
import { ResultatRegulationEntite } from "../../Regulation.definitions";

const calculateurRegulationParStatutEligibilite: Record<
  ResultatEligibilite,
  (d: DonneesFormulaireSimulateur) => ResultatRegulationEntite
> = {
  EligibleMoyenneGrandeEntreprise: fabriqueRegule(causeReguleOSE),
  EligiblePetiteEntreprise: fabriqueRegule(causeReguleOSE),
  Incertain: () => resultatIncertain,
  NonEligible: () => resultatNonRegule,
};

export const transformeEligibiliteEnRegulationEntite = (
  e: ResultatEligibilite
) => calculateurRegulationParStatutEligibilite[e];

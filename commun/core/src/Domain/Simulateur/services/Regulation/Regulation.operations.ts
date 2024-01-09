import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire";
import { Eligibilite } from "../../Eligibilite.constantes";
import { ResultatEligibilite } from "../../Eligibilite.definitions";
import { fabriqueRegule } from "../../fabriques/Regulation.fabrique";
import {
  causeReguleOSE,
  resultatIncertain,
  resultatNonRegule,
} from "../../Regulation.constantes";

export const transformeEligibiliteEnRegulationEntite =
  (e: ResultatEligibilite) => (d: DonneesFormulaireSimulateur) => {
    switch (e) {
      case Eligibilite.EligiblePetiteEntreprise:
      case Eligibilite.EligibleMoyenneGrandeEntreprise:
        return fabriqueRegule(causeReguleOSE)(d);
      case Eligibilite.NonEligible:
        return resultatNonRegule;
      case Eligibilite.Incertain:
      default:
        return resultatIncertain;
    }
  };

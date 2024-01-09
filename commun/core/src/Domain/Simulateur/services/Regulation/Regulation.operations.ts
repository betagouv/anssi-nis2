import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire";
import { ResultatEligibilite } from "../../Eligibilite.definitions";
import { fabriqueRegule } from "../../fabriques/Regulation.fabrique";
import { causeReguleOSE, resultatIncertain } from "../../Regulation.constantes";

export const transformeEligibiliteEnRegulationEntite =
  (e: ResultatEligibilite) => (d: DonneesFormulaireSimulateur) =>
    e === "Incertain" ? resultatIncertain : fabriqueRegule(causeReguleOSE)(d);

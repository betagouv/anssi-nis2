import { resultatReguleOSE } from "../../fabriques/Regulation.fabrique";
import { resultatIncertain } from "../../Regulation.constantes";
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import {
  ResultatEvaluationRegulationAvecReponses,
  ResultatEvaluationRegulationDefinitif,
  ResultatEvaluationRegulationEnSuspens,
} from "./EtatRegulation.definition";
import {
  DonneesCompletesEvaluees,
  UnionReponseEtatNonVide,
} from "./Reponse.definitions";

export const fabriqueResultatEvaluationEnSuspens = (
  etapeEvaluee: DonneesCompletesEvaluees,
  resulat: ResultatRegulationEntite,
  reponse: UnionReponseEtatNonVide,
): ResultatEvaluationRegulationEnSuspens => ({
  ...resulat,
  ...reponse,
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationDefinitif = (
  etapeEvaluee: DonneesCompletesEvaluees,
  resulat: ResultatRegulationEntite,
): ResultatEvaluationRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resulat,
});
export const fabriqueResultatEvaluationReguleOse =
  (): ResultatEvaluationRegulationDefinitif =>
    fabriqueResultatEvaluationDefinitif(
      "DesignationOperateurServicesEssentiels",
      resultatReguleOSE,
    );
export const fabriqueResultatEnSuspensOse =
  (reponse: ResultatEvaluationRegulationAvecReponses) =>
  (): ResultatEvaluationRegulationEnSuspens =>
    fabriqueResultatEvaluationEnSuspens(
      "DesignationOperateurServicesEssentiels",
      resultatIncertain,
      reponse,
    );

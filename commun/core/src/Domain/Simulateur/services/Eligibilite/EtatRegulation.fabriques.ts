import {
  fabriqueRegule,
  resultatReguleOSE,
} from "../../fabriques/ResultatRegulation.fabrique";
import { resultatIncertain } from "../../Regulation.constantes";
import {
  ResultatRegulationEntite,
  TypeEntite,
} from "../../Regulation.definitions";
import {
  EtapeEvaluation,
  EtapeEvaluationActive,
  EtatEvaluationEnSuspens,
  EtatRegulation,
  EtatRegulationAvecReponses,
  EtatRegulationDefinitif,
  EtatRegulationInconnu,
} from "./EtatRegulation.definitions";
import { UnionReponseEtatNonVide } from "./ReponseEtat.definitions";
import { propReponseEtat } from "./ReponseEtat.operations";

export const fabriqueResultatEvaluationInconnu = (
  reponse: UnionReponseEtatNonVide,
  etapeEvaluee: EtapeEvaluation = "NonEvalue",
): EtatRegulationInconnu => ({
  ...reponse,
  _resultatEvaluationRegulation: "Inconnu",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationEnSuspens = (
  etapeEvaluee: EtapeEvaluationActive,
  resulat: ResultatRegulationEntite,
  reponse: UnionReponseEtatNonVide,
): EtatEvaluationEnSuspens => ({
  ...resulat,
  ...reponse,
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationDefinitif = (
  etapeEvaluee: EtapeEvaluationActive,
  resulat: ResultatRegulationEntite,
): EtatRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resulat,
});
export const fabriqueResultatEvaluationReguleOse =
  (): EtatRegulationDefinitif =>
    fabriqueResultatEvaluationDefinitif(
      "DesignationOperateurServicesEssentiels",
      resultatReguleOSE,
    );

export const propageResultatIncertainEnSuspens =
  (etapeEvaluee: EtapeEvaluationActive) =>
  (reponse: EtatRegulation): EtatEvaluationEnSuspens =>
    fabriqueResultatEvaluationEnSuspens(
      etapeEvaluee,
      resultatIncertain,
      reponse as EtatRegulationAvecReponses,
    );
export const fabriqueResultatEvaluationRegulationDefinitif = (
  resultatRegulation: ResultatRegulationEntite,
  etapeEvaluee: EtapeEvaluation,
): EtatRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resultatRegulation,
});
export const propageDonneesEvaluees =
  (etape: EtapeEvaluationActive) => (reponse: EtatRegulation) => ({
    ...reponse,
    etapeEvaluee: etape,
  });
export const fabriqueResultatEvaluationDefinitifCarSecteur = (
  reponse: EtatEvaluationEnSuspens,
  typeEntite: TypeEntite,
) =>
  fabriqueResultatEvaluationDefinitif(
    "InformationsSecteur",
    fabriqueRegule(
      {
        ...propReponseEtat(reponse)("Structure"),
        ...propReponseEtat(reponse)("InformationsSecteur"),
      },
      typeEntite,
    ),
  );

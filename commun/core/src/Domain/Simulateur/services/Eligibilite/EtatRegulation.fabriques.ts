import { fabriqueRegule } from "../../ResultatRegulation.fabrique";
import { resultatIncertain } from "../../Regulation.constantes";
import { ResultatRegulationEntite, TypeEntite } from "../../Regulation.definitions";
import {
  EtapeEvaluationActive,
  EtatEvaluationEnSuspens,
  EtatRegulation,
  EtatRegulationAvecReponses,
  EtatRegulationDefinitif,
} from "./EtatRegulation.definitions";
import { UnionReponseEtatNonVide } from "./ReponseEtat.definitions";
import { propReponseEtat } from "./ReponseEtat.operations";

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

export const propageResultatIncertainEnSuspens =
  (etapeEvaluee: EtapeEvaluationActive) =>
  (reponse: EtatRegulation): EtatEvaluationEnSuspens =>
    fabriqueResultatEvaluationEnSuspens(
      etapeEvaluee,
      resultatIncertain,
      reponse as EtatRegulationAvecReponses,
    );
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

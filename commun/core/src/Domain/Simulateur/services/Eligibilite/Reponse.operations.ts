import { EtatEvaluationActives } from "./EtatEvaluation.definitions";
import { ResultatEvaluationRegulation } from "./EtatRegulation.definitions";
import { ReponseEtatInformationsSecteur } from "./ReponseEtat.definitions";

export const propReponseEtat =
  (reponse: ResultatEvaluationRegulation) =>
  <T extends EtatEvaluationActives>(
    propName: T,
  ): Pick<ReponseEtatInformationsSecteur, T> =>
    ({
      [propName]: (reponse as ReponseEtatInformationsSecteur)[propName],
    }) as Pick<ReponseEtatInformationsSecteur, T>;

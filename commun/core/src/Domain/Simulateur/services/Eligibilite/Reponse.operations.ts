import { EtatEvaluationActives } from "./EtatEvaluation.definitions";
import { EtatEvaluation } from "./EtatRegulation.definitions";
import { ReponseEtatInformationsSecteur } from "./ReponseEtat.definitions";

export const propReponseEtat =
  (reponse: EtatEvaluation) =>
  <T extends EtatEvaluationActives>(
    propName: T,
  ): Pick<ReponseEtatInformationsSecteur, T> =>
    ({
      [propName]: (reponse as ReponseEtatInformationsSecteur)[propName],
    }) as Pick<ReponseEtatInformationsSecteur, T>;

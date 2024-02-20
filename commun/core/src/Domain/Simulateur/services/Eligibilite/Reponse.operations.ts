import { ResultatEvaluationRegulation } from "./EtatRegulation.definition";
import {
  EtapesEvaluationActives,
  ReponseEtatInformationsSecteur,
} from "./Reponse.definitions";

export const propReponseEtat =
  (reponse: ResultatEvaluationRegulation) =>
  <T extends EtapesEvaluationActives>(
    propName: T,
  ): Pick<ReponseEtatInformationsSecteur, T> =>
    ({
      [propName]: (reponse as ReponseEtatInformationsSecteur)[propName],
    }) as Pick<ReponseEtatInformationsSecteur, T>;

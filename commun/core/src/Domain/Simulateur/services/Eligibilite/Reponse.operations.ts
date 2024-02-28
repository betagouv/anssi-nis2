import {
  EtapeEvaluationActive,
  EtatRegulation,
} from "./EtatRegulation.definitions";
import { ReponseEtatInformationsSecteur } from "./ReponseEtat.definitions";

export const propReponseEtat =
  (reponse: EtatRegulation) =>
  <T extends EtapeEvaluationActive>(
    propName: T,
  ): Pick<ReponseEtatInformationsSecteur, T> =>
    ({
      [propName]: (reponse as ReponseEtatInformationsSecteur)[propName],
    }) as Pick<ReponseEtatInformationsSecteur, T>;

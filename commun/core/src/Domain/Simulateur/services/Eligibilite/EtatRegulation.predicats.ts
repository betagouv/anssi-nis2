import { ResultatEvaluationRegulation } from "./EtatRegulation.definitions";
import { ReponseEtatInformationsSecteur } from "./ReponseEtat.definitions";

export const estReponseEtatInformationsSecteur = (
  resultat: ResultatEvaluationRegulation | ReponseEtatInformationsSecteur,
): resultat is ReponseEtatInformationsSecteur =>
  "_tag" in resultat && resultat._tag === "InformationsSecteur";

import { EtatEvaluation } from "./EtatRegulation.definitions";
import { ReponseEtatInformationsSecteur } from "./ReponseEtat.definitions";

export const estReponseEtatInformationsSecteur = (
  resultat: EtatEvaluation | ReponseEtatInformationsSecteur,
): resultat is ReponseEtatInformationsSecteur =>
  "_tag" in resultat && resultat._tag === "InformationsSecteur";

import { EtatRegulation } from "./EtatRegulation.definitions";
import { ReponseEtatInformationsSecteur } from "./ReponseEtat.definitions";

export const estReponseEtatInformationsSecteur = (
  resultat: EtatRegulation | ReponseEtatInformationsSecteur,
): resultat is ReponseEtatInformationsSecteur =>
  "_tag" in resultat && resultat._tag === "InformationsSecteur";

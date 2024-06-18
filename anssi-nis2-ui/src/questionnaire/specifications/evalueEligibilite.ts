import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { LecteurDeSpecifications } from "./LecteurDeSpecifications.ts";
import { ResultatAvecAnalyse } from "./EnsembleDeSpecifications.ts";

export function evalueEligibilite(
  reponses: EtatQuestionnaire,
  cheminCsv: string,
): ResultatAvecAnalyse {
  const lecteur = new LecteurDeSpecifications();
  const specifications = lecteur.lis(cheminCsv);
  return specifications.evalue(reponses);
}

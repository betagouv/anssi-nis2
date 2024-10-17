import { LecteurDeSpecifications } from "./LecteurDeSpecifications";
import { EtatQuestionnaire } from "./EtatQuestionnaire";
import { ResultatAvecAnalyse } from "./ResultatAvecAnalyse";

export function evalueEligibilite(
  reponses: EtatQuestionnaire,
  cheminCsv: string,
): ResultatAvecAnalyse {
  const lecteur = new LecteurDeSpecifications();
  const specifications = lecteur.lis(cheminCsv);
  return specifications.evalue(reponses);
}

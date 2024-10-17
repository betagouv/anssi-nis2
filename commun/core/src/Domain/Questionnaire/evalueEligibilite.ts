import { LecteurDeSpecifications } from "./LecteurDeSpecifications";
import { EtatQuestionnaire } from "./EtatQuestionnaire";
import { ResultatAvecAnalyse } from "./ResultatAvecAnalyse";

export function evalueEligibilite(
  reponses: EtatQuestionnaire,
  contenuDuCsv: string,
): ResultatAvecAnalyse {
  const lecteur = new LecteurDeSpecifications();
  const specifications = lecteur.lis(contenuDuCsv);
  return specifications.evalue(reponses);
}

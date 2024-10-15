import { LecteurDeSpecifications } from "./LecteurDeSpecifications";
import { ResultatAvecAnalyse } from "./EnsembleDeSpecifications";
import { EtatQuestionnaire } from "./EtatQuestionnaire";

export function evalueEligibilite(
  reponses: EtatQuestionnaire,
  cheminCsv: string,
): ResultatAvecAnalyse {
  const lecteur = new LecteurDeSpecifications();
  const specifications = lecteur.lis(cheminCsv);
  return specifications.evalue(reponses);
}

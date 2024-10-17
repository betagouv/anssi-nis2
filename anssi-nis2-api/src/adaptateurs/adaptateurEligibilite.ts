import { EtatQuestionnaire } from "~core/src/Domain/Questionnaire/EtatQuestionnaire";
import { ResultatAvecAnalyse } from "~core/src/Domain/Questionnaire/ResultatAvecAnalyse";

export type ReponsesEtResultatAvecAnalyse = {
  reponses: EtatQuestionnaire;
  eligibilite: ResultatAvecAnalyse;
};

export interface AdaptateurEligibilite {
  evalueEligibilite(reponses: EtatQuestionnaire): ReponsesEtResultatAvecAnalyse;
}

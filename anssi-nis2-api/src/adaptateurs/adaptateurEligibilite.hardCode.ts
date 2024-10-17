import { EtatQuestionnaire } from "~core/src/Domain/Questionnaire/EtatQuestionnaire";
import {
  AdaptateurEligibilite,
  ReponsesEtResultatAvecAnalyse,
} from "./adaptateurEligibilite";

export class AdaptateurEligibiliteHardCode implements AdaptateurEligibilite {
  evalueEligibilite(
    reponses: EtatQuestionnaire,
  ): ReponsesEtResultatAvecAnalyse {
    return {
      reponses,
      eligibilite: {
        specificationsRetenues: ["HARD-CODÉE"],
        resultat: {
          regulation: "Regule",
          typeEntite: "EntiteEssentielle",
          pointsAttention: { resumes: [], precisions: [] },
        },
      },
    };
  }
}

import * as fs from "node:fs";
import { EtatQuestionnaire } from "~core/src/Domain/Questionnaire/EtatQuestionnaire";
import {
  AdaptateurEligibilite,
  ReponsesEtResultatAvecAnalyse,
} from "./adaptateurEligibilite";
import { evalueEligibilite } from "../../../commun/core/src/Domain/Questionnaire/evalueEligibilite";

export class AdaptateurEligibiliteCsv implements AdaptateurEligibilite {
  private readonly contenuDuCsv: string;

  constructor() {
    // C'est le process de build copie le .csv dans le répertoire de cet adaptateur
    const path = __dirname + "/specifications-completes.csv";

    const csvIntrouvable = !fs.existsSync(path);
    if (csvIntrouvable) {
      throw new Error(
        `Impossible de trouver le CSV de spécifications. Chemin : "${path}".`,
      );
    }

    this.contenuDuCsv = fs.readFileSync(path).toString("utf-8");
  }

  evalueEligibilite(
    reponses: EtatQuestionnaire,
  ): ReponsesEtResultatAvecAnalyse {
    const eligibilite = evalueEligibilite(reponses, this.contenuDuCsv);
    return { reponses, eligibilite };
  }
}

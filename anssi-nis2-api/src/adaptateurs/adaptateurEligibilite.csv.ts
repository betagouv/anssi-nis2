import * as fs from "node:fs";
import { EtatQuestionnaire } from "~core/src/Domain/Questionnaire/EtatQuestionnaire";
import {
  AdaptateurEligibilite,
  ReponsesEtResultatAvecAnalyse,
} from "./adaptateurEligibilite";
import { evalueEligibilite } from "../../../commun/core/src/Domain/Questionnaire/evalueEligibilite";
import * as path from "node:path";

export class AdaptateurEligibiliteCsv implements AdaptateurEligibilite {
  private readonly contenuDuCsv: string;

  constructor() {
    // On remonte 5 fois, car on navigue depuis `dist/…`
    const csv = path.normalize(
      `${__dirname}/../../../../../commun/core/src/Domain/Questionnaire/specifications-completes.csv`,
    );

    const csvIntrouvable = !fs.existsSync(csv);
    if (csvIntrouvable) {
      throw new Error(
        `Impossible de trouver le CSV de spécifications. Chemin : "${csv}".`,
      );
    }

    this.contenuDuCsv = fs.readFileSync(csv).toString("utf-8");
  }

  evalueEligibilite(
    reponses: EtatQuestionnaire,
  ): ReponsesEtResultatAvecAnalyse {
    const eligibilite = evalueEligibilite(reponses, this.contenuDuCsv);
    return { reponses, eligibilite };
  }
}

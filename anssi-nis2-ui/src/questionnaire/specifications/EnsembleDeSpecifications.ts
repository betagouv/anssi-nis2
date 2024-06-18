import { Specifications } from "./Specifications.ts";
import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export type ResultatAvecAnalyse = {
  resultat: ResultatEligibilite;
  specificationsRetenues: string[];
};

export class EnsembleDeSpecifications {
  constructor(private readonly specifications: Specifications[]) {}

  premierPassant(reponses: EtatQuestionnaire): ResultatAvecAnalyse {
    const passants = this.specifications.filter(
      (s) => s.evalue(reponses) !== undefined,
    );

    if (passants.length === 0) {
      const detail = JSON.stringify(reponses);
      throw new Error(
        `Aucune spécification ne correspond au questionnaire. ${detail}`,
      );
    }
    const premierPassant = passants[0];

    return {
      resultat: premierPassant.resultat(),
      specificationsRetenues: passants.map((p) => p.code),
    };
  }

  nombre() {
    return this.specifications.length;
  }
}

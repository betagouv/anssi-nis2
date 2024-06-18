import { Specifications } from "./Specifications.ts";
import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export type ResultatAvecAnalyse = {
  resultat: ResultatEligibilite;
  specificationsRetenues: Specifications[];
};

export class EnsembleDeSpecifications {
  constructor(private readonly specifications: Specifications[]) {}

  premierPassant(reponses: EtatQuestionnaire): ResultatAvecAnalyse {
    const premierPassant = this.specifications.find(
      (s) => s.evalue(reponses) !== undefined,
    );

    if (!premierPassant) {
      const detail = JSON.stringify(reponses);
      throw new Error(
        `Aucune spécification ne correspond au questionnaire. ${detail}`,
      );
    }

    return {
      resultat: premierPassant.resultat(),
      specificationsRetenues: [premierPassant],
    };
  }

  nombre() {
    return this.specifications.length;
  }
}

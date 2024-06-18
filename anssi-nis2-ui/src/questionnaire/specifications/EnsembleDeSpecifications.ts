import { Specifications } from "./Specifications.ts";
import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export class EnsembleDeSpecifications {
  constructor(private readonly specifications: Specifications[]) {}

  premierPassant(reponses: EtatQuestionnaire): ResultatEligibilite {
    const premierPassant = this.specifications.find(
      (s) => s.evalue(reponses) !== undefined,
    );

    if (!premierPassant) {
      const detail = JSON.stringify(reponses);
      throw new Error(
        `Aucune spécification ne correspond au questionnaire. ${detail}`,
      );
    }

    return premierPassant.resultat();
  }

  nombre() {
    return this.specifications.length;
  }
}

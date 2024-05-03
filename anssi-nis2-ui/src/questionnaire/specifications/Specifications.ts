import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export interface Regle {
  evalue(reponses: EtatQuestionnaire): boolean;
}

export class Specifications {
  constructor(
    private readonly regles: Regle[],
    private readonly _resultat: ResultatEligibilite,
  ) {}

  evalue(reponses: EtatQuestionnaire) {
    return this.regles.every((r) => r.evalue(reponses));
  }

  nombreDeRegles() {
    return this.regles.length;
  }

  resultat() {
    return this._resultat;
  }
}

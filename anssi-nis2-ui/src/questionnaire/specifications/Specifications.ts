import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export interface Regle {
  evalue(reponses: EtatQuestionnaire): boolean;
}

export const estValeurVide = (v: string) => v === "-";

export class Specifications {
  constructor(
    private readonly regles: Regle[],
    private readonly _resultat: ResultatEligibilite,
  ) {}

  evalue(reponses: EtatQuestionnaire): ResultatEligibilite | undefined {
    const passeToutesLesRegles = this.regles.every((r) => r.evalue(reponses));

    if (passeToutesLesRegles) return this._resultat;
  }

  nombreDeRegles() {
    return this.regles.length;
  }

  resultat() {
    return this._resultat;
  }
}

import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";

export interface Regle {
  evalue(reponses: EtatQuestionnaire): boolean;
}

export class Specifications {
  constructor(private readonly regles: Regle[]) {}

  evalue(reponses: EtatQuestionnaire) {
    return this.regles.every((r) => r.evalue(reponses));
  }

  public nombreDeRegles() {
    return this.regles.length;
  }
}

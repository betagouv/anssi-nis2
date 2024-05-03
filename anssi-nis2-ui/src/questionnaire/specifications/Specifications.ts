import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";

export interface Regle {
  evalue(reponses: EtatQuestionnaire): boolean;
}

export class Specifications extends Array<Regle> {
  evalue(reponses: EtatQuestionnaire) {
    return this.every((spec) => spec.evalue(reponses));
  }
}

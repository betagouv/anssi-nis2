import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";

export interface Specification {
  evalue(reponses: EtatQuestionnaire): boolean;
}

export class Specifications extends Array<Specification> {
  evalue(reponses: EtatQuestionnaire) {
    return this.every((spec) => spec.evalue(reponses));
  }
}

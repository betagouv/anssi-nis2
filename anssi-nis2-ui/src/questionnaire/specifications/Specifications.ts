import { SpecificationEntiteOSE } from "./SpecificationEntiteOSE.ts";
import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";

export class Specifications extends Array<SpecificationEntiteOSE> {
  evalue(reponses: EtatQuestionnaire) {
    return this.every((spec) => spec.evalue(reponses));
  }
}

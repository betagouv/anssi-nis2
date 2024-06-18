import { Specifications } from "./Specifications.ts";
import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";

export class EnsembleDeSpecifications {
  constructor(private readonly specifications: Specifications[]) {}

  premierPassant(reponses: EtatQuestionnaire): Specifications | undefined {
    return this.specifications.find((s) => s.evalue(reponses) !== undefined);
  }

  nombre() {
    return this.specifications.length;
  }
}

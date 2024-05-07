import { Regle } from "../Specifications.ts";
import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { TypeStructure } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";

export class RegleTypeDeStructure implements Regle {
  constructor(private readonly valeursAcceptees: TypeStructure[]) {}

  evalue(reponses: EtatQuestionnaire): boolean {
    return contientUnParmi(...this.valeursAcceptees)(reponses.typeStructure);
  }
}

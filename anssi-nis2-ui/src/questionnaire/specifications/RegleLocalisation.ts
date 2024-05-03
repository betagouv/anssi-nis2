import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { AppartenancePaysUnionEuropeenne } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../commun/utils/services/commun.predicats.ts";
import { Regle } from "./Specifications.ts";

export class RegleLocalisation implements Regle {
  constructor(
    private readonly valeursAcceptees: AppartenancePaysUnionEuropeenne[],
  ) {}

  evalue(etat: EtatQuestionnaire) {
    return contientUnParmi(...this.valeursAcceptees)(
      etat.appartenancePaysUnionEuropeenne,
    );
  }
}

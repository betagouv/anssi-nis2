import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { AppartenancePaysUnionEuropeenne } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../commun/utils/services/commun.predicats.ts";
import { Specification } from "./Specifications.ts";

export class SpecificationLocalisation implements Specification {
  constructor(
    private readonly valeursAcceptees: AppartenancePaysUnionEuropeenne[],
  ) {}

  evalue(etat: EtatQuestionnaire) {
    return contientUnParmi(...this.valeursAcceptees)(
      etat.appartenancePaysUnionEuropeenne,
    );
  }
}

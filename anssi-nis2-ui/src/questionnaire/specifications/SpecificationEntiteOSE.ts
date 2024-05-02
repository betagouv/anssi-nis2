import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { DesignationOperateurServicesEssentiels } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../commun/utils/services/commun.predicats.ts";
import { Specification } from "./Specifications.ts";

export class SpecificationEntiteOSE implements Specification {
  constructor(
    private readonly valeursAcceptees: DesignationOperateurServicesEssentiels[],
  ) {}

  evalue(etat: EtatQuestionnaire) {
    return contientUnParmi(...this.valeursAcceptees)(
      etat.designationOperateurServicesEssentiels,
    );
  }
}

import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { DesignationOperateurServicesEssentiels } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../commun/utils/services/commun.predicats.ts";

export class SpecificationEntiteOSE {
  constructor(
    private readonly valeursAcceptees: DesignationOperateurServicesEssentiels[],
  ) {}

  evalue(etat: EtatQuestionnaire) {
    return contientUnParmi(...this.valeursAcceptees)(
      etat.designationOperateurServicesEssentiels,
    );
  }
}

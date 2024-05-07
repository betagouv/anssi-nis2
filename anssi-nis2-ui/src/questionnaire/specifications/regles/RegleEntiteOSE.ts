import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { DesignationOperateurServicesEssentiels } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";
import { Regle } from "../Specifications.ts";

export class RegleEntiteOSE implements Regle {
  constructor(
    private readonly valeursAcceptees: DesignationOperateurServicesEssentiels[],
  ) {}

  evalue(etat: EtatQuestionnaire) {
    return contientUnParmi(...this.valeursAcceptees)(
      etat.designationOperateurServicesEssentiels,
    );
  }
}

import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { Regle } from "../Specifications.ts";
import { UnionPetitMoyenGrand } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";

export class RegleTaille implements Regle {
  constructor(private readonly tailleAttendue: UnionPetitMoyenGrand) {}

  evalue(etat: EtatQuestionnaire): boolean {
    return contientUnParmi(this.tailleAttendue)(etat.trancheNombreEmployes);
  }
}

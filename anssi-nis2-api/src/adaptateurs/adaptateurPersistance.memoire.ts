import { AdaptateurPersistance } from "./adaptateurPersistance";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";

export class AdaptateurPersistanceMemoire implements AdaptateurPersistance {
  donnees: Record<TypeEntite, DonneesFormulaireSimulateur[]>;

  constructor() {
    this.donnees = { [TypeEntite.ReponseSimulateur]: [] };
  }

  async sauvegardeReponseFormulaire(donnees: DonneesFormulaireSimulateur) {
    this.donnees[TypeEntite.ReponseSimulateur].push(donnees);
  }
}

enum TypeEntite {
  ReponseSimulateur,
}

import { AdaptateurJournal } from "./adaptateurJournal";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";

export class AdaptateurJournalMemoire implements AdaptateurJournal {
  private readonly donnees = [];

  async consigneReponseSimulateur(donnees: DonneesFormulaireSimulateur) {
    this.donnees.push(donnees);
  }
}

import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";

export interface AdaptateurJournal {
  consigneReponseSimulateur: (
    donnees: DonneesFormulaireSimulateur,
  ) => Promise<void>;
}

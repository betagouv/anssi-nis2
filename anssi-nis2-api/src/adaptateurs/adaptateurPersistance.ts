import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";

export interface AdaptateurPersistance {
  sauvegardeReponseFormulaire: (
    donnees: DonneesFormulaireSimulateur,
  ) => Promise<void>;
}

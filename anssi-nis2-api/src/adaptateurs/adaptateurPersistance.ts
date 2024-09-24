import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { CreeInformationsEmailDto } from "../informations-emails/dto/cree-informations-email.dto";

export interface AdaptateurPersistance {
  sauvegardeReponseFormulaire: (
    donnees: DonneesFormulaireSimulateur,
  ) => Promise<void>;

  sauvegardeInformationsEmail: (
    donnees: CreeInformationsEmailDto,
  ) => Promise<void>;
}

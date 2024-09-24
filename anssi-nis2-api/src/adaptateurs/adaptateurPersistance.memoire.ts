import { CreeInformationsEmailDto } from "src/informations-emails/dto/cree-informations-email.dto";
import { AdaptateurPersistance } from "./adaptateurPersistance";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";

export class AdaptateurPersistanceMemoire implements AdaptateurPersistance {
  donnees: Record<
    TypeEntite,
    (DonneesFormulaireSimulateur | CreeInformationsEmailDto)[]
  >;

  constructor() {
    this.donnees = {
      [TypeEntite.ReponseSimulateur]: [],
      [TypeEntite.InformationsEmail]: [],
    };
  }

  async sauvegardeReponseFormulaire(donnees: DonneesFormulaireSimulateur) {
    this.donnees[TypeEntite.ReponseSimulateur].push(donnees);
  }

  async sauvegardeInformationsEmail(donnees: CreeInformationsEmailDto) {
    this.donnees[TypeEntite.InformationsEmail].push(donnees);
  }
}

enum TypeEntite {
  ReponseSimulateur,
  InformationsEmail,
}

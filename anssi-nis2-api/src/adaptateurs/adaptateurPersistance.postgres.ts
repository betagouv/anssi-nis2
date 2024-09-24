import * as Knex from "knex";
import * as configurationKnex from "../../knexfile";
import { AdaptateurPersistance } from "./adaptateurPersistance";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { CreeInformationsEmailDto } from "src/informations-emails/dto/cree-informations-email.dto";

export class AdaptateurPersistancePostgres implements AdaptateurPersistance {
  private readonly knex: Knex.Knex;

  constructor() {
    this.knex = Knex(configurationKnex);
  }

  async sauvegardeReponseFormulaire(donnees: DonneesFormulaireSimulateur) {
    await this.knex("simulateur_reponse").insert({
      reponseJson: JSON.stringify(donnees),
    });
  }

  async sauvegardeInformationsEmail(donnees: CreeInformationsEmailDto) {
    await this.knex("informations_email").insert({
      email: donnees.email,
      nomOrganisation: donnees.nomOrganisation,
      accepteInfolettreNis2: donnees.accepteInfolettreNis2,
      accepteInfolettreServicesDedies: donnees.accepteInfolettreServicesDedies,
    });
  }
}

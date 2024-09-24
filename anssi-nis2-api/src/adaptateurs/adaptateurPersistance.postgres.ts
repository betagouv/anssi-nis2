import * as Knex from "knex";
import * as configurationKnex from "../../knexfile";
import { AdaptateurPersistance } from "./adaptateurPersistance";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";

export class AdaptateurPersistancePostgres implements AdaptateurPersistance {
  knex: Knex.Knex;

  constructor() {
    this.knex = Knex(configurationKnex);
  }

  async sauvegardeReponseFormulaire(donnees: DonneesFormulaireSimulateur) {
    await this.knex("simulateur_reponse").insert({
      reponseJson: JSON.stringify(donnees),
    });
  }
}

import * as Knex from "knex";
import * as configurationKnex from "../knexfile";
import { AdaptateurJournalPostgres } from "./adaptateurs/adaptateurJournal.postgres";
import { AdaptateurEligibiliteCsv } from "./adaptateurs/adaptateurEligibilite.csv";

export class ConsoleAdministration {
  constructor(
    private readonly adaptateurJournal = new AdaptateurJournalPostgres(),
    private readonly adaptateurEligibilite = new AdaptateurEligibiliteCsv(),
    private readonly knexPersistance: Knex.Knex = Knex(configurationKnex),
  ) {}

  public async genereTousEvenementsQuestionnaire() {
    const reponses = await this.knexPersistance("simulateur_reponse").select();

    const succes = [];
    const erreurs = [];

    reponses.map(({ id, reponseJson }) => {
      try {
        const resultat =
          this.adaptateurEligibilite.evalueEligibilite(reponseJson);
        succes.push(resultat);
      } catch (e) {
        erreurs.push({ erreur: e, id: id });
      }
    });

    console.log(erreurs);

    console.log("-----------");
    console.log(`RÉSUMÉ : ✅ ${succes.length}. 💥 ${erreurs.length}.`);
  }
}

import {
  AdaptateurJournal,
  EvenementJournal,
  TypeEvenement,
} from "./adaptateurJournal";
import * as Knex from "knex";

const config = {
  client: "pg",
  connection: process.env.BASE_DONNEES_JOURNAL,
  pool: { min: 0, max: 10 },
};

export class AdaptateurJournalPostgres implements AdaptateurJournal {
  private readonly knex: Knex.Knex;

  constructor() {
    this.knex = Knex(config);
  }

  async consigneEvenement<T extends TypeEvenement>(
    evenement: EvenementJournal<T>,
  ) {
    await this.knex("journal_nis2.evenements").insert({
      type: evenement.type,
      date: evenement.date,
      donnees: evenement.donnees,
    });
  }
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("simulateur_reponse", (t) => {
    t.jsonb("reponseJson").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("simulateur_reponse", (t) => {
    t.text("reponseJson").alter();
  });
}

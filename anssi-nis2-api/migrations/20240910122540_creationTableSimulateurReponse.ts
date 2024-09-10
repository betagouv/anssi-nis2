import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const table = "simulateur_reponse";

  const tableExistante = await knex.schema.hasTable(table);

  if (tableExistante) return;

  await knex.schema.createTable(table, (t) => {
    t.primary(["id"]);
    t.increments("id");

    // Ce devrait être du `JSON`, mais pour compatibilité avec l'existant
    // on commence par du texte.
    t.text("reponseJson");

    t.timestamp("dateCreation").defaultTo(knex.fn.now());
  });
}

export async function down(): Promise<void> {
  // On ne fait rien ici.
  // Trop dangeureux de supprimer la table des réponses.
}

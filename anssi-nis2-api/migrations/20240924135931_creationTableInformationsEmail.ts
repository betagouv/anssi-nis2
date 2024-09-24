import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const table = "informations_email";

  const tableExistante = await knex.schema.hasTable(table);

  if (tableExistante) return;

  await knex.schema.createTable(table, (t) => {
    t.primary(["id"]);
    t.increments("id");

    t.text("email");
    t.text("nomOrganisation");
    t.boolean("accepteInfolettreNis2").defaultTo(false);
    t.boolean("accepteInfolettreServicesDedies").defaultTo(false);
  });
}

export async function down(): Promise<void> {
  // On ne fait rien ici.
  // Trop dangeureux de supprimer la table.
}

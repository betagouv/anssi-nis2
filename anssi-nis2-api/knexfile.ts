import { config } from "dotenv";

config({ path: ".env" });

module.exports = {
  client: "pg",
  connection: process.env.URL_SERVEUR_BASE_DONNEES,
  pool: { min: 2, max: 10 },
  migrations: { tableName: "knex_migrations" },
};

import * as process from "process";

export const recupereUrlBaseDeDonnees = async () =>
  process.env.SCALINGO_POSTGRESQL_URL;

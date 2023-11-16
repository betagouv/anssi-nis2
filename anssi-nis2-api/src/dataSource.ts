import { DataSource } from "typeorm";
import "dotenv/config";
import * as process from "process";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.SCALINGO_POSTGRESQL_URL,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  subscribers: [],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
});

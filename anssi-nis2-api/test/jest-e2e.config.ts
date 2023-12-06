import type { Config } from "jest";
import * as path from "path";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  moduleNameMapper: {
    "^~core/(.*)$":
      path.resolve(__dirname + "/../../anssi-nis2-ui/src/Domaine/") + "/$1",
  },
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};
export default config;

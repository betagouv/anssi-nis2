import type { Config } from "jest";
import * as path from "path";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transformIgnorePatterns: ["^.+\\.js$"],
  moduleNameMapper: {
    "^~core/(.*)$": path.resolve(__dirname + "/../../commun/core") + "/$1",
  },
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};
export default config;

import type { Config } from "jest";
import * as path from "path";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  preset: "ts-jest/presets/js-with-ts",
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./testSetup.ts"],
  moduleNameMapper: {
    "^~core/(.*)$": path.resolve(__dirname + "/../commun/core") + "/$1",
  },
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
};
export default config;

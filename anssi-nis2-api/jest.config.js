const path = require("path");
/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  preset: "ts-jest/presets/js-with-ts",
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^~core/(.*)$":
      path.resolve(__dirname + "/../anssi-nis2-ui/src/Domaine/") + "/$1",
  },
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest"],
  },
};

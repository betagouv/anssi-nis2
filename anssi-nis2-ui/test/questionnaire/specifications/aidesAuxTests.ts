import { readFileSync } from "node:fs";

export const leCSV = (nom: string) => {
  const chemin = "./test/questionnaire/specifications/csv/" + nom;
  return readFileSync(chemin).toString("utf-8");
};

import { readFileSync } from "node:fs";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions";

export const leCSV = (nom: string) => {
  const chemin = "./test/questionnaire/specifications/csv/" + nom;
  return readFileSync(chemin).toString("utf-8");
};

export const leCSVDeProd = (nom: string) => {
  const chemin = "./src/" + nom;
  return readFileSync(chemin).toString("utf-8");
};

export function reguleEE(): ResultatEligibilite {
  return {
    regulation: "Regule",
    typeEntite: "EntiteEssentielle",
    pointsAttention: { resumes: [], precisions: [] },
  };
}

export function reguleEI(): ResultatEligibilite {
  return {
    regulation: "Regule",
    typeEntite: "EntiteImportante",
    pointsAttention: { resumes: [], precisions: [] },
  };
}

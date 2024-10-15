import { readFileSync } from "node:fs";
import {
  ResultatEligibilite,
  ResumesPointsAttention,
} from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions";

export const leCSV = (nom: string) => {
  const chemin = "./test/questionnaire/specifications/csv/" + nom;
  return readFileSync(chemin).toString("utf-8");
};

export const leCSVDeProd = (nom: string) => {
  const chemin = "./src/" + nom;
  return readFileSync(chemin).toString("utf-8");
};

export function reguleEE(
  resumes: ResumesPointsAttention[] = [],
): ResultatEligibilite {
  return {
    regulation: "Regule",
    typeEntite: "EntiteEssentielle",
    pointsAttention: { resumes: resumes, precisions: [] },
  };
}

export function reguleEI(
  resumes: ResumesPointsAttention[] = [],
): ResultatEligibilite {
  return {
    regulation: "Regule",
    typeEntite: "EntiteImportante",
    pointsAttention: { resumes: resumes, precisions: [] },
  };
}

export function reguleSansPrecision(): ResultatEligibilite {
  return {
    regulation: "Regule",
    typeEntite: "AutreEtatMembreUE",
    pointsAttention: { resumes: [], precisions: [] },
  };
}

export function reguleEnregistrementSeul(): ResultatEligibilite {
  return {
    regulation: "Regule",
    typeEntite: "EnregistrementUniquement",
    pointsAttention: { resumes: [], precisions: [] },
  };
}

export function nonRegulee(): ResultatEligibilite {
  return {
    regulation: "NonRegule",
    typeEntite: "EnregistrementUniquement", // Peu importe le type
    pointsAttention: { resumes: [], precisions: [] },
  };
}

export function neSaitPas(): ResultatEligibilite {
  return {
    regulation: "Incertain",
    typeEntite: "EnregistrementUniquement", // Peu importe le type
    pointsAttention: { resumes: [], precisions: [] },
  };
}

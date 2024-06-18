import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export interface Regle {
  evalue(reponses: EtatQuestionnaire): boolean;
}

export const estValeurVide = (v: string) => v === "-";

export class Specifications {
  constructor(
    private readonly regles: Regle[],
    private readonly _resultat: ResultatEligibilite,
    public readonly code: string,
  ) {}

  evalue(reponses: EtatQuestionnaire): ResultatEligibilite | undefined {
    const passeToutesLesRegles = this.regles.every((r) => r.evalue(reponses));

    if (passeToutesLesRegles) return this._resultat;
  }

  nombreDeRegles() {
    return this.regles.length;
  }

  resultat() {
    return this._resultat;
  }

  ordreDePriorite(): number {
    const { regulation, typeEntite } = this._resultat;

    if (regulation === "Regule") {
      if (typeEntite === "EntiteEssentielle") return 1;
      if (typeEntite === "EntiteImportante") return 2;
      if (typeEntite === "AutreEtatMembreUE") return 3;
      if (typeEntite === "EnregistrementUniquement") return 4;
    }

    if (regulation === "NonRegule") return 5;

    if (regulation === "Incertain") return 6;

    throw new Error(
      `Impossible de déterminer la priorité de la spécification "${this.code}"`,
    );
  }
}

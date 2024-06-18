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
    if (
      this._resultat.regulation === "Regule" &&
      this._resultat.typeEntite === "EntiteEssentielle"
    )
      return 1;

    if (
      this._resultat.regulation === "Regule" &&
      this._resultat.typeEntite === "EntiteImportante"
    )
      return 2;

    return 9999;
  }
}

import { estValeurVide, Regle } from "../Specifications.ts";
import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { TypeStructure } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";

export class RegleTypeDeStructure implements Regle {
  constructor(private readonly valeursAcceptees: TypeStructure) {}

  evalue(reponses: EtatQuestionnaire): boolean {
    return contientUnParmi(this.valeursAcceptees)(reponses.typeStructure);
  }

  static nouvelle(texte: SpecificationTexte): RegleTypeDeStructure | undefined {
    const valeur = texte["Type de structure"];

    if (estValeurVide(valeur)) return;
    if (valeur === "Entreprise privée ou publique")
      return new RegleTypeDeStructure("privee");

    throw new ErreurLectureDeRegle(valeur, "Type de structure");
  }
}

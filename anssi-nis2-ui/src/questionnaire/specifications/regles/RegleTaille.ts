import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { Regle } from "../Specifications.ts";
import { UnionPetitMoyenGrand } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";

export class RegleTaille implements Regle {
  constructor(private readonly tailleAttendue: UnionPetitMoyenGrand) {}

  evalue(etat: EtatQuestionnaire): boolean {
    return contientUnParmi(this.tailleAttendue)(etat.trancheNombreEmployes);
  }

  static nouvelle(texte: SpecificationTexte): RegleTaille | undefined {
    const valeur = texte["Taille"];

    if (!valeur) return;
    if (valeur === "Petite") return new RegleTaille("petit");
    if (valeur === "Moyenne") return new RegleTaille("moyen");
    if (valeur === "Grande") return new RegleTaille("grand");

    throw new ErreurLectureDeRegle(valeur, "Taille");
  }
}

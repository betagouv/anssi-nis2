import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { AppartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";
import { Regle } from "../Specifications.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";

export class RegleLocalisation implements Regle {
  constructor(
    private readonly valeursAcceptees: AppartenancePaysUnionEuropeenne[],
  ) {}

  evalue(etat: EtatQuestionnaire) {
    return contientUnParmi(...this.valeursAcceptees)(
      etat.appartenancePaysUnionEuropeenne,
    );
  }

  static nouvelle(texte: SpecificationTexte): RegleLocalisation | undefined {
    const valeur = texte["Localisation"];

    if (!valeur) return;
    if (valeur === "France") return new RegleLocalisation(["france"]);

    throw new ErreurLectureDeRegle(valeur, "Localisation");
  }
}

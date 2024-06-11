import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { DesignationOperateurServicesEssentiels } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";
import { Regle } from "../Specifications.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";

export class RegleEntiteOSE implements Regle {
  constructor(
    private readonly valeursAcceptees: DesignationOperateurServicesEssentiels[],
  ) {}

  evalue(etat: EtatQuestionnaire) {
    return contientUnParmi(...this.valeursAcceptees)(
      etat.designationOperateurServicesEssentiels,
    );
  }

  static nouvelle(texte: SpecificationTexte): RegleEntiteOSE | undefined {
    const valeur = texte["Designation OSE"];

    if (!valeur) return;
    if (valeur === "Oui") return new RegleEntiteOSE(["oui"]);
    if (valeur === "Non") return new RegleEntiteOSE(["non"]);
    if (valeur === "Non / Ne sait pas")
      return new RegleEntiteOSE(["non", "nsp"]);

    throw new ErreurLectureDeRegle(valeur, "Designation OSE");
  }
}

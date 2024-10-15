import { DesignationOperateurServicesEssentiels } from "../../Simulateur/ChampsSimulateur.definitions";
import { contientUnParmi } from "../../../../../utils/services/commun.predicats";
import { Regle } from "../Specifications";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle";
import { EtatQuestionnaire } from "../EtatQuestionnaire";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV";

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
    if (valeur === "Ne sait pas") return new RegleEntiteOSE(["nsp"]);
    if (valeur === "Non [OU] Ne sait pas")
      return new RegleEntiteOSE(["non", "nsp"]);

    throw new ErreurLectureDeRegle(valeur, "Designation OSE");
  }
}

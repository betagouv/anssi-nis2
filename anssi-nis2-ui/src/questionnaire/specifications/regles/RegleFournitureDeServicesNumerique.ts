import { Regle } from "../Specifications.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";
import { AppartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";

export class RegleFournitureDeServicesNumerique implements Regle {
  constructor(
    private readonly localisationsAcceptees: AppartenancePaysUnionEuropeenne[],
  ) {}

  evalue(reponses: EtatQuestionnaire): boolean {
    const reponse = reponses.localisationFournitureServicesNumeriques;

    return contientUnParmi(...this.localisationsAcceptees)(reponse);
  }

  static nouvelle(
    texte: SpecificationTexte,
  ): RegleFournitureDeServicesNumerique | undefined {
    const valeur = texte["Extra - Fourniture de service"];

    if (!valeur) return;

    if (valeur === "France")
      return new RegleFournitureDeServicesNumerique(["france"]);
    if (valeur === "Autres États membres de l'Union Européenne")
      return new RegleFournitureDeServicesNumerique(["autre"]);
    if (valeur === "Autres États hors Union Européenne")
      return new RegleFournitureDeServicesNumerique(["horsue"]);

    throw new ErreurLectureDeRegle(valeur, "Extra - Fourniture de service");
  }
}

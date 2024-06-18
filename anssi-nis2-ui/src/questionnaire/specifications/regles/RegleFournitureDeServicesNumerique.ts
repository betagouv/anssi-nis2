import { estValeurVide, Regle } from "../Specifications.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";
import { AppartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";

export class RegleFournitureDeServicesNumerique implements Regle {
  constructor(
    private readonly localisationsAcceptees: AppartenancePaysUnionEuropeenne[],
  ) {}

  evalue(reponses: EtatQuestionnaire): boolean {
    const reponse = reponses.localisationFournitureServicesNumeriques;

    if (reponse.length !== this.localisationsAcceptees.length) return false;

    return reponse.every((r) => this.localisationsAcceptees.includes(r));
  }

  static nouvelle(
    texte: SpecificationTexte,
  ): RegleFournitureDeServicesNumerique | undefined {
    const valeur = texte["Extra - Fourniture de service"];

    if (estValeurVide(valeur)) return;

    const morceaux = valeur.split(SEPARATEUR).map((m) => m.trim());
    const tousConnus = morceaux.every((m) => Object.keys(mapping).includes(m));

    if (!tousConnus)
      throw new ErreurLectureDeRegle(valeur, "Extra - Fourniture de service");

    return new RegleFournitureDeServicesNumerique(
      morceaux.map((m) => mapping[m]),
    );
  }
}

const mapping: Record<string, AppartenancePaysUnionEuropeenne> = {
  France: "france",
  "Autres États membres de l'Union Européenne": "autre",
  "Autres États hors Union Européenne": "horsue",
};

const SEPARATEUR = "+";

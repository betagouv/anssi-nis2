import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { estValeurVide, Regle } from "../Specifications.ts";
import { UnionPetitMoyenGrand } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";

export class RegleTaille implements Regle {
  constructor(private readonly tailleAttendue: UnionPetitMoyenGrand) {}

  evalue(etat: EtatQuestionnaire): boolean {
    const employes = etat.trancheNombreEmployes;
    const ca = etat.trancheChiffreAffaire;

    let tailleReelle: UnionPetitMoyenGrand | undefined;

    const employesPetit = contientUnParmi("petit")(employes);
    if (employesPetit) {
      if (contientUnParmi("petit")(ca)) tailleReelle = "petit";
      if (contientUnParmi("moyen")(ca)) tailleReelle = "moyen";
      if (contientUnParmi("grand")(ca)) tailleReelle = "grand";
    }

    const employesMoyen = contientUnParmi("moyen")(employes);
    if (employesMoyen) {
      if (contientUnParmi("petit")(ca)) tailleReelle = "moyen";
      if (contientUnParmi("moyen")(ca)) tailleReelle = "moyen";
      if (contientUnParmi("grand")(ca)) tailleReelle = "grand";
    }

    if (contientUnParmi("grand")(employes)) tailleReelle = "grand";

    return tailleReelle === this.tailleAttendue;
  }

  static nouvelle(texte: SpecificationTexte): RegleTaille | undefined {
    const valeur = texte["Taille"];

    if (estValeurVide(valeur)) return;
    if (valeur === "Petite") return new RegleTaille("petit");
    if (valeur === "Moyenne") return new RegleTaille("moyen");
    if (valeur === "Grande") return new RegleTaille("grand");

    throw new ErreurLectureDeRegle(valeur, "Taille");
  }
}

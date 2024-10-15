import { estValeurVide, Regle } from "../Specifications";
import { UnionPetitMoyenGrand } from "../../Simulateur/ChampsSimulateur.definitions";
import { contientUnParmi } from "../../../../../utils/services/commun.predicats";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle";
import { EtatQuestionnaire } from "../EtatQuestionnaire";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV";

export class RegleTaille implements Regle {
  constructor(private readonly tailleAttendue: UnionPetitMoyenGrand) {}

  evalue(etat: EtatQuestionnaire): boolean {
    const employes = etat.trancheNombreEmployes;
    const ca = etat.trancheChiffreAffaire;
    const bilan = etat.trancheBilanFinancier;

    let tailleReelle: UnionPetitMoyenGrand | undefined;

    const employesPetit = contientUnParmi("petit")(employes);
    if (employesPetit) {
      if (contientUnParmi("petit")(ca)) tailleReelle = "petit";

      if (contientUnParmi("moyen")(ca)) {
        if (contientUnParmi("petit")(bilan)) tailleReelle = "petit";
        if (contientUnParmi("moyen")(bilan)) tailleReelle = "moyen";
        if (contientUnParmi("grand")(bilan)) tailleReelle = "moyen";
      }

      if (contientUnParmi("grand")(ca)) {
        if (contientUnParmi("petit")(bilan)) tailleReelle = "petit";
        if (contientUnParmi("moyen")(bilan)) tailleReelle = "moyen";
        if (contientUnParmi("grand")(bilan)) tailleReelle = "grand";
      }
    }

    const employesMoyen = contientUnParmi("moyen")(employes);
    if (employesMoyen) {
      if (contientUnParmi("petit")(ca)) tailleReelle = "moyen";
      if (contientUnParmi("moyen")(ca)) tailleReelle = "moyen";
      if (contientUnParmi("grand")(ca)) {
        if (contientUnParmi("petit")(bilan)) tailleReelle = "moyen";
        if (contientUnParmi("moyen")(bilan)) tailleReelle = "moyen";
        if (contientUnParmi("grand")(bilan)) tailleReelle = "grand";
      }
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

import { RegleEntiteOSE } from "./regles/RegleEntiteOSE.ts";
import { Regle, Specifications } from "./Specifications.ts";
import { RegleLocalisation } from "./regles/RegleLocalisation.ts";
import { SpecificationTexte } from "./FormatDesSpecificationsCSV.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { RegleTypeDeStructure } from "./regles/RegleTypeDeStructure.ts";
import { RegleTaille } from "./regles/RegleTaille.ts";
import { ErreurLectureDeRegle } from "./regles/ErreurLectureDeRegle.ts";

export class FabriqueDeSpecifications {
  transforme(texte: SpecificationTexte): Specifications {
    const regles: Regle[] = [
      RegleEntiteOSE.nouvelle(texte),
      RegleLocalisation.nouvelle(texte),
      this.regleTypeDeStructure(texte),
      this.regleTaille(texte),
    ].filter((s) => s !== undefined) as Regle[];

    const resultat = this.transformeResultat(texte);

    return new Specifications(regles, resultat);
  }
  private regleTypeDeStructure(texte: SpecificationTexte) {
    const valeur = texte["Type de structure"];

    if (!valeur) return;
    if (valeur === "Entreprise privee ou publique")
      return new RegleTypeDeStructure(["privee"]);

    throw new ErreurLectureDeRegle(valeur, "Type de structure");
  }

  private regleTaille(texte: SpecificationTexte) {
    const valeur = texte["Taille"];

    if (!valeur) return;
    if (valeur === "Petite") return new RegleTaille("petit");
    if (valeur === "Moyenne") return new RegleTaille("moyen");
    if (valeur === "Grande") return new RegleTaille("grand");

    throw new ErreurLectureDeRegle(valeur, "Taille");
  }

  private transformeResultat(texte: SpecificationTexte): ResultatEligibilite {
    const valeur = texte["Resultat"];

    if (valeur === "Regule EE")
      return {
        regulation: "Regule",
        typeEntite: "EntiteEssentielle",
        pointsAttention: { precisions: [], resumes: [] },
      };

    if (valeur === "Regule EI")
      return {
        regulation: "Regule",
        typeEntite: "EntiteImportante",
        pointsAttention: { precisions: [], resumes: [] },
      };

    if (valeur === "Regule enregistrement seul")
      return {
        regulation: "Regule",
        typeEntite: "EnregistrementUniquement",
        pointsAttention: { precisions: [], resumes: [] },
      };

    if (valeur === "Regule autre EM")
      return {
        regulation: "Regule",
        typeEntite: "AutreEtatMembreUE",
        pointsAttention: { precisions: [], resumes: [] },
      };

    if (valeur === "Non regule")
      return {
        regulation: "NonRegule",
        typeEntite: "AutreEtatMembreUE", // Le type est sans importance ici.
        pointsAttention: { precisions: [], resumes: [] },
      };

    if (valeur === "Incertain")
      return {
        regulation: "Incertain",
        typeEntite: "AutreEtatMembreUE", // Le type est sans importance ici.
        pointsAttention: { precisions: [], resumes: [] },
      };

    throw new ErreurLectureDeRegle(valeur, "Resultat");
  }
}

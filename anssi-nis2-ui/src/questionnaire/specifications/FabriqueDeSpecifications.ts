import { RegleEntiteOSE } from "./RegleEntiteOSE.ts";
import { Regle, Specifications } from "./Specifications.ts";
import { RegleLocalisation } from "./RegleLocalisation.ts";
import { SpecificationTexte } from "./FormatDesSpecificationsCSV.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { RegleTypeDeStructure } from "./RegleTypeDeStructure.ts";
import { RegleTaille } from "./RegleTaille.ts";

export class FabriqueDeSpecifications {
  transforme(texte: SpecificationTexte): Specifications {
    const regles: Regle[] = [
      this.regleOSE(texte),
      this.regleLocalisation(texte),
      this.regleTypeDeStructure(texte),
      this.regleTaille(texte),
    ].filter((s) => s !== undefined) as Regle[];

    const resultat = this.transformeResultat(texte);

    return new Specifications(regles, resultat);
  }

  private regleOSE = (
    texte: SpecificationTexte,
  ): RegleEntiteOSE | undefined => {
    const valeur = texte["Designation OSE"];

    if (!valeur) return;
    if (valeur === "Oui") return new RegleEntiteOSE(["oui"]);
    if (valeur === "Non / Ne sait pas")
      return new RegleEntiteOSE(["non", "nsp"]);

    throw new ErreurLectureDeRegle(valeur, "Designation OSE");
  };

  private regleLocalisation(
    texte: SpecificationTexte,
  ): RegleLocalisation | undefined {
    const valeur = texte["Localisation"];

    if (!valeur) return;
    if (valeur === "France") return new RegleLocalisation(["france"]);

    throw new ErreurLectureDeRegle(valeur, "Localisation");
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

class ErreurLectureDeRegle extends Error {
  constructor(valeurErreur: string, typeDeSpecification: string) {
    super(
      `La valeur ${valeurErreur} est invalide pour la règle ${typeDeSpecification}`,
    );
  }
}

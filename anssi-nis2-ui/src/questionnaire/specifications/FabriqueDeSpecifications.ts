import { RegleEntiteOSE } from "./RegleEntiteOSE.ts";
import { Regle, Specifications } from "./Specifications.ts";
import { RegleLocalisation } from "./RegleLocalisation.ts";
import { SpecificationTexte } from "./FormatDesSpecificationsCSV.ts";

export class FabriqueDeSpecifications {
  transforme(texte: SpecificationTexte): Specifications {
    const regles: Regle[] = [
      this.regleOSE(texte),
      this.regleLocalisation(texte),
    ].filter((s) => s !== undefined) as Regle[];

    return new Specifications(...regles);
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
}

class ErreurLectureDeRegle extends Error {
  constructor(valeurErreur: string, typeDeSpecification: string) {
    super(
      `La valeur ${valeurErreur} est invalide pour la règle ${typeDeSpecification}`,
    );
  }
}

import { RegleEntiteOSE } from "./regles/RegleEntiteOSE.ts";
import { Regle, Specifications } from "./Specifications.ts";
import { RegleLocalisation } from "./regles/RegleLocalisation.ts";
import { SpecificationTexte } from "./FormatDesSpecificationsCSV.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { RegleTypeDeStructure } from "./regles/RegleTypeDeStructure.ts";
import { RegleTaille } from "./regles/RegleTaille.ts";
import { ErreurLectureDeRegle } from "./regles/ErreurLectureDeRegle.ts";
import { RegleSecteurs } from "./regles/RegleSecteurs.ts";
import { RegleSousSecteurs } from "./regles/RegleSousSecteurs.ts";
import { RegleActivites } from "./regles/RegleActivites.ts";
import { RegleFournitureDeServicesNumerique } from "./regles/RegleFournitureDeServicesNumerique.ts";
import { RegleEtablissementPrincipal } from "./regles/RegleEtablissementPrincipal.ts";

export class FabriqueDeSpecifications {
  transforme(texte: SpecificationTexte): Specifications {
    const regles: Regle[] = [
      RegleEntiteOSE.nouvelle(texte),
      RegleLocalisation.nouvelle(texte),
      RegleTypeDeStructure.nouvelle(texte),
      RegleTaille.nouvelle(texte),
      RegleSecteurs.nouvelle(texte),
      RegleSousSecteurs.nouvelle(texte),
      RegleActivites.nouvelle(texte),
      RegleFournitureDeServicesNumerique.nouvelle(texte),
      RegleEtablissementPrincipal.nouvelle(texte),
    ].filter((s) => s !== undefined) as Regle[];

    const resultat = this.transformeResultat(texte);

    return new Specifications(regles, resultat, texte["Code"]);
  }

  private transformeResultat(texte: SpecificationTexte): ResultatEligibilite {
    const valeur = texte["Resultat"];

    if (valeur === "Régulée EE")
      return {
        regulation: "Regule",
        typeEntite: "EntiteEssentielle",
        pointsAttention: { precisions: [], resumes: [] },
      };

    if (valeur === "Régulée EI")
      return {
        regulation: "Regule",
        typeEntite: "EntiteImportante",
        pointsAttention: { precisions: [], resumes: [] },
      };

    if (valeur === "Régulée, enregistrement seul")
      return {
        regulation: "Regule",
        typeEntite: "EnregistrementUniquement",
        pointsAttention: { precisions: [], resumes: [] },
      };

    if (valeur === "Régulée, sans précision EE/EI")
      return {
        regulation: "Regule",
        typeEntite: "AutreEtatMembreUE",
        pointsAttention: { precisions: [], resumes: [] },
      };

    if (valeur === "Non régulée")
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

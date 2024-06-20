import { RegleEntiteOSE } from "./regles/RegleEntiteOSE.ts";
import { Regle, Specifications } from "./Specifications.ts";
import { RegleLocalisation } from "./regles/RegleLocalisation.ts";
import { SpecificationTexte } from "./FormatDesSpecificationsCSV.ts";
import {
  CodesPrecisionsPointsAttention,
  CodesResumesPointsAttention,
  PointsAttentionPrecis,
  ResultatEligibilite,
  ResumesPointsAttention,
} from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
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

    const pointsAttention = this.getPointsAttention(texte);

    if (valeur === "Régulée EE")
      return {
        regulation: "Regule",
        typeEntite: "EntiteEssentielle",
        pointsAttention,
      };

    if (valeur === "Régulée EI")
      return {
        regulation: "Regule",
        typeEntite: "EntiteImportante",
        pointsAttention,
      };

    if (valeur === "Régulée, enregistrement seul")
      return {
        regulation: "Regule",
        typeEntite: "EnregistrementUniquement",
        pointsAttention,
      };

    if (valeur === "Régulée, sans précision EE/EI")
      return {
        regulation: "Regule",
        typeEntite: "AutreEtatMembreUE",
        pointsAttention,
      };

    if (valeur === "Non régulée")
      return {
        regulation: "NonRegule",
        typeEntite: "AutreEtatMembreUE", // Le type est sans importance ici.
        pointsAttention,
      };

    if (valeur === "Incertain")
      return {
        regulation: "Incertain",
        typeEntite: "AutreEtatMembreUE", // Le type est sans importance ici.
        pointsAttention,
      };

    throw new ErreurLectureDeRegle(valeur, "Resultat");
  }

  private getPointsAttention = (
    texte: SpecificationTexte,
  ): {
    resumes: ResumesPointsAttention[];
    precisions: PointsAttentionPrecis[];
  } => {
    const valeur = texte["Points d'attention"];

    const nettoyees = valeur.split(",").map((v) => v.trim().replace("#", ""));

    const resumes: ResumesPointsAttention[] = [];
    const precisions: PointsAttentionPrecis[] = [];

    for (const v of nettoyees) {
      if (CodesResumesPointsAttention.includes(v)) resumes.push(v);
      if (CodesPrecisionsPointsAttention.includes(v)) precisions.push(v);
    }

    return { precisions, resumes };
  };
}

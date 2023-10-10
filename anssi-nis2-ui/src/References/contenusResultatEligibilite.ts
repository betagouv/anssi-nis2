import { ContenusResultatEligibilite } from "../Services/Simulateur/contenusResultatEligibilite";
import { ResultatEligibilite } from "../Domaine/Simulateur/resultatEligibilite.ts";

export const contenusResultatEligible: ContenusResultatEligibilite = {
  classeDivResultat: "fr-nis2-eligible",
  classIcone: "fr-icon-check-line",
  titre: "La directive s'appliquerait à votre entité au vu des éléments saisis",
  pointsAttention:
    "Sous réserve des mécanismes d'exemption ou de désignation pouvant " +
    "être mis en place au cas par cas par le gouvernement français pour " +
    "certaines entités. Ces exemptions ou désignation seront connues au " +
    "plus tard le 18 octobre 2024.",
};

export const contenusResultatNonEligible: ContenusResultatEligibilite = {
  classeDivResultat: "fr-nis2-non-eligible",
  classIcone: "fr-icon-cross-line",
  titre: "La directive ne s'appliquerait pas à votre entité",
  pointsAttention:
    "Sous réserve des mécanismes d'exemption ou de désignation pouvant " +
    "être mis en place au cas par cas par le gouvernement français pour " +
    "certaines entités. Ces exemptions ou désignation seront connues au " +
    "plus tard le 18 octobre 2024.",
};

export const contenusResultats: Record<
  ResultatEligibilite,
  ContenusResultatEligibilite
> = {
  Eligible: contenusResultatEligible,
  NonEligible: contenusResultatNonEligible,
};

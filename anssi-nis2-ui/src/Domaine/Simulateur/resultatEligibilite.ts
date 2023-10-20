import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { Activite } from "./Activite.ts";
import { SecteurActivite } from "./SecteursActivite";
import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "./ChampsSimulateur";

import { estActiviteListee } from "./Operations/FiltreActivites.ts";

import { listeSecteursActiviteSaufAutre } from "./ListesEnrSecteursSousSecteur.ts";

export type ResultatEligibilite =
  | "NonEligible"
  | "EligiblePetiteEntreprise"
  | "EligibleMoyenneGrandeEntreprise";
export const ResultatEligibiliteEnum = {
  NonEligible: "NonEligible",
  EligiblePetiteEntreprise: "EligiblePetiteEntreprise",
  EligibleMoyenneGrandeEntreprise: "EligibleMoyenneGrandeEntreprise",
} as const;

export const estPetiteEntreprise = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) => nombreEmployes.includes("petit") && chiffreAffaire.includes("petit");

export const estMoyenneEntreprise = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) =>
  (nombreEmployes.includes("moyen") && chiffreAffaire.includes("moyen")) ||
  (nombreEmployes.includes("moyen") && chiffreAffaire.includes("petit")) ||
  (nombreEmployes.includes("petit") && chiffreAffaire.includes("moyen"));
export const estGrandeEntreprise = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) => nombreEmployes.includes("grand") || chiffreAffaire.includes("grand");

const auMoinsUneActiviteListee = (activites: Activite[]) =>
  activites && activites.length && activites.some(estActiviteListee);
const estUnSecteurListee = (secteurs: SecteurActivite[]) =>
  secteurs &&
  secteurs.length &&
  secteurs.every((secteur) => listeSecteursActiviteSaufAutre.includes(secteur));

export const eligibilite: (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatEligibilite = ({
  designeOperateurServicesEssentiels,
  etatMembre,
  typeStructure,
  trancheNombreEmployes,
  trancheCA,
  secteurActivite,
  activites,
}) => {
  if (
    designeOperateurServicesEssentiels.includes("oui") &&
    estPetiteEntreprise(trancheNombreEmployes, trancheCA)
  ) {
    return ResultatEligibiliteEnum.EligiblePetiteEntreprise;
  }

  if (
    designeOperateurServicesEssentiels.includes("oui") &&
    (estMoyenneEntreprise(trancheNombreEmployes, trancheCA) ||
      estGrandeEntreprise(trancheNombreEmployes, trancheCA))
  ) {
    return ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise;
  }

  if (
    etatMembre[0] !== "horsue" &&
    typeStructure.includes("privee") &&
    estPetiteEntreprise(trancheNombreEmployes, trancheCA) &&
    secteurActivite.includes("infrastructureNumerique") &&
    auMoinsUneActiviteListee(activites)
  ) {
    return ResultatEligibiliteEnum.EligiblePetiteEntreprise;
  }

  if (
    etatMembre[0] !== "horsue" &&
    typeStructure.includes("privee") &&
    (estMoyenneEntreprise(trancheNombreEmployes, trancheCA) ||
      estGrandeEntreprise(trancheNombreEmployes, trancheCA)) &&
    estUnSecteurListee(secteurActivite) &&
    auMoinsUneActiviteListee(activites)
  )
    return ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise;

  return ResultatEligibiliteEnum.NonEligible;
};

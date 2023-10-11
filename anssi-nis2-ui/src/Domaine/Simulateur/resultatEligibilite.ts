import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { Activite, listeActivitesSaufAutre } from "./Activite.ts";
import { listeSecteursActiviteSaufAutre } from "./ValeursSecteursActivites.ts";
import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "./ValeursChampsSimulateur.ts";
import { SecteurActivite } from "./SecteursActivite";

export type ResultatEligibilite =
  | "NonEligible"
  | "EligiblePetiteEntreprise"
  | "EligibleMoyenneGrandeEntreprise";
export const ResultatEligibiliteEnum = {
  NonEligible: "NonEligible",
  EligiblePetitEntreprise: "EligiblePetiteEntreprise",
  EligibleMoyenneGrandeEntreprise: "EligibleMoyenneGrandeEntreprise",
} as const;

const estPetiteEntreprise = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) => nombreEmployes.includes("petit") && chiffreAffaire.includes("petit");

const estMoyenneEntreprise = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) =>
  (nombreEmployes.includes("moyen") && chiffreAffaire.includes("moyen")) ||
  (nombreEmployes.includes("moyen") && chiffreAffaire.includes("petit")) ||
  (nombreEmployes.includes("petit") && chiffreAffaire.includes("moyen"));
const estGrandeEntreprise = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) => nombreEmployes.includes("grand") || chiffreAffaire.includes("grand");

const estUneActiviteListee = (activites: Activite[]) =>
  activites.every((activite) => listeActivitesSaufAutre.includes(activite));
const estUnSecteurListee = (secteurs: SecteurActivite[]) =>
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
  if (designeOperateurServicesEssentiels.includes("oui")) {
    return ResultatEligibiliteEnum.EligiblePetitEntreprise;
  }
  if (
    etatMembre.includes("france") &&
    typeStructure.includes("privee") &&
    estPetiteEntreprise(trancheNombreEmployes, trancheCA) &&
    secteurActivite.includes("infrastructureNumerique") &&
    estUneActiviteListee(activites)
  )
    return ResultatEligibiliteEnum.EligiblePetitEntreprise;

  if (
    etatMembre.includes("france") &&
    typeStructure.includes("privee") &&
    (estMoyenneEntreprise(trancheNombreEmployes, trancheCA) ||
      estGrandeEntreprise(trancheNombreEmployes, trancheCA)) &&
    estUnSecteurListee(secteurActivite) &&
    estUneActiviteListee(activites)
  )
    return ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise;
  return ResultatEligibiliteEnum.NonEligible;
};

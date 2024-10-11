import { estMoyenneEntreprise, estPetiteEntreprise } from "../TailleEntreprise/TailleEntite.predicats";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.definitions";

export const contientPetiteEntreprise = (d: DonneesFormulaireSimulateur) =>
  estPetiteEntreprise(d.trancheNombreEmployes, d.trancheChiffreAffaire);
export const contientMoyenneEntreprise = (d: DonneesFormulaireSimulateur) =>
  estMoyenneEntreprise(d.trancheNombreEmployes, d.trancheChiffreAffaire);







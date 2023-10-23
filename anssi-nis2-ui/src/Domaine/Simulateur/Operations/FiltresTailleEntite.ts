import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "../ChampsSimulateur";

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

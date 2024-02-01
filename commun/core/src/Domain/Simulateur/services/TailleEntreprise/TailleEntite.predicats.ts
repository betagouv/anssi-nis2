import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "../../ChampsSimulateur.definitions";

type PredicatTailleEntite = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) => boolean;

export const estPetiteEntreprise: PredicatTailleEntite = (
  nombreEmployes,
  chiffreAffaire,
) =>
  !!nombreEmployes &&
  nombreEmployes.includes("petit") &&
  chiffreAffaire.includes("petit");

export const estMoyenneEntreprise: PredicatTailleEntite = (
  nombreEmployes,
  chiffreAffaire,
) =>
  (nombreEmployes.includes("moyen") && chiffreAffaire.includes("moyen")) ||
  (nombreEmployes.includes("moyen") && chiffreAffaire.includes("petit")) ||
  (nombreEmployes.includes("petit") && chiffreAffaire.includes("moyen"));

export const estGrandeEntreprise: PredicatTailleEntite = (
  nombreEmployes,
  chiffreAffaire,
) => nombreEmployes.includes("grand") || chiffreAffaire.includes("grand");

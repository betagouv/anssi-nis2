import { TrancheChiffreAffaire, TrancheNombreEmployes } from "../../ChampsSimulateur.definitions";

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


import {
  TValeursSecteursActivites,
  ValeursSousSecteurEnergie,
  ValeursSousSecteurFabrication,
  ValeursSousSecteurTransport,
} from "./ValeursCles.ts";
import { DescriptionSecteur } from "./Secteurs";

export const ValeursSecteursAvecSousSecteurs = [
  "energie",
  "transports",
  "fabrication",
] as const;

export type TValeursSecteursAvecSousSecteurs =
  (typeof ValeursSecteursAvecSousSecteurs)[number];
export const sousSecteursParSecteur: Record<
  Extract<TValeursSecteursActivites, TValeursSecteursAvecSousSecteurs>,
  DescriptionSecteur
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};

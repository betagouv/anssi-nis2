import {
  TValeursSecteursActivites,
  ValeursSousSecteurEnergie,
  ValeursSousSecteurFabrication,
  ValeursSousSecteurTransport,
} from "./ValeursCles.ts";
import { DescriptionSecteur } from "./Secteurs";

export type TValeursSecteursAvecSousSecteurs =
  | "energie"
  | "transports"
  | "fabrication";
export const sousSecteursParSecteur: Record<
  Extract<TValeursSecteursActivites, TValeursSecteursAvecSousSecteurs>,
  DescriptionSecteur
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};

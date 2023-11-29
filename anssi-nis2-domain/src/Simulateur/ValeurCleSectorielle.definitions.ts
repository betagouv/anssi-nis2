import {
  SecteursSansSousSecteur,
  SousSecteurActivite,
} from "./SousSecteurActivite.definitions";
import { SecteurActivite } from "./SecteurActivite.definitions";

export type ValeurCleSectorielle =
  | SecteursSansSousSecteur
  | SousSecteurActivite;
export type CoupleSectoriel = [
  SecteurActivite,
  SousSecteurActivite | undefined,
];

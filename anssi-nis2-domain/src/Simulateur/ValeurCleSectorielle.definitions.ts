import {
  SecteursSansSousSecteur,
  SousSecteurActivite,
} from "./SousSecteurActivite.definitions";
import { SecteurActivite } from "./SecteurActivite.definitions.ts";

export type ValeurCleSectorielle =
  | SecteursSansSousSecteur
  | SousSecteurActivite;
export type CoupleSectoriel = [
  SecteurActivite,
  SousSecteurActivite | undefined,
];

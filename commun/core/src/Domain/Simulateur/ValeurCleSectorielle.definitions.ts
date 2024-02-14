import { SecteursSansSousSecteur } from "./SecteurActivite.definitions";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions";

export type ValeurCleSectorielle =
  | SecteursSansSousSecteur
  | SousSecteurActivite;

import { SecteurActivite } from "./SecteurActivite.definitions";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions";

export type Sectorisation =
  | {
      type: "avecSousSecteur";
      secteur: SecteurActivite;
      sousSecteur: SousSecteurActivite;
    }
  | { type: "sansSousSecteur"; secteur: SecteurActivite };

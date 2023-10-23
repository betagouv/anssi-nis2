import { SecteurActivite } from "../SecteursActivite";
import { estSecteurListe } from "./operationsSecteurs.ts";

export const auMoinsUnSecteurListe = (secteurs: SecteurActivite[]) =>
  secteurs.some(estSecteurListe);
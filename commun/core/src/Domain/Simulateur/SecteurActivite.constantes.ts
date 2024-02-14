import { SecteurActivite } from "./SecteurActivite.definitions";
import { ValeursSecteursActivites } from "./SecteurActivite.valeurs";
import { estUnSecteurSansDesSousSecteurs } from "./services/SecteurActivite/SecteurActivite.predicats";

export const secteursNecessitantLocalisationRepresentant: readonly SecteurActivite[] =
  [
    "gestionServicesTic",
    "fournisseursNumeriques",
    "infrastructureNumerique",
  ] as const;
export const ValeursSecteursSansSousSecteur: SecteurActivite[] =
  ValeursSecteursActivites.filter(estUnSecteurSansDesSousSecteurs);

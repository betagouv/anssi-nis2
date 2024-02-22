import {
  ValeursSecteursActivites,
  ValeursSecteursAvecSousSecteurs,
} from "./SecteurActivite.valeurs";

export type SecteurActivite = (typeof ValeursSecteursActivites)[number];

export type SecteursAvecSousSecteurs =
  (typeof ValeursSecteursAvecSousSecteurs)[number];

export type SecteursSansSousSecteur = Exclude<
  SecteurActivite,
  SecteursAvecSousSecteurs
>;

export type SecteursAvecBesoinLocalisationRepresentant = Extract<
  SecteursSansSousSecteur,
  "infrastructureNumerique" | "gestionServicesTic" | "fournisseursNumeriques"
>;
export type SecteursSansBesoinLocalisationRepresentant = Omit<
  SecteursSansSousSecteur,
  "infrastructureNumerique" | "gestionServicesTic" | "fournisseursNumeriques"
>;
export type SecteursDefinitsSansBesoinLocalisationRepresentant = Omit<
  SecteursSansBesoinLocalisationRepresentant,
  "autreSecteurActivite"
>;

export type SousSecteurAutrePour<S extends SecteursAvecSousSecteurs> =
  `autreSousSecteur${Capitalize<S>}`;

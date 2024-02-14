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
export type SousSecteurAutrePour<S extends SecteursAvecSousSecteurs> =
  `autreSousSecteur${Capitalize<S>}`;
// export type SecteurActiviteDecoupe = Extract<
//   SecteurActivite,
//   "energie" | "fabrication" | "transports"
// >;
//
// export type SecteurActiviteSimple = Omit<
//   SecteurActivite,
//   "energie" | "fabrication" | "transports"
// >;

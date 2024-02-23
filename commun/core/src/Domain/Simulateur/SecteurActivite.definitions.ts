import {
  ValeursSecteurAvecActivitesEssentielles,
  ValeursSecteursActivites,
  ValeursSecteursAvecSousSecteurs,
  ValeursSecteursAvecBesoinLocalisationRepresentant,
} from "./SecteurActivite.valeurs";

export type SecteurActivite = (typeof ValeursSecteursActivites)[number];

export type SecteursAvecSousSecteurs =
  (typeof ValeursSecteursAvecSousSecteurs)[number];

export type SecteursSansSousSecteur = Exclude<
  SecteurActivite,
  SecteursAvecSousSecteurs
>;

export type SecteurAvecBesoinLocalisationRepresentant =
  (typeof ValeursSecteursAvecBesoinLocalisationRepresentant)[number];
export type SecteursSansBesoinLocalisationRepresentant = Omit<
  SecteursSansSousSecteur,
  SecteurAvecBesoinLocalisationRepresentant
>;

export type SecteurAvecBesoinLocalisationRepresentantPetiteEntite =
  (typeof ValeursSecteurAvecActivitesEssentielles)[number];
export type SecteursSansBesoinLocalisationRepresentantPetit = Omit<
  SecteursSansSousSecteur,
  SecteurAvecBesoinLocalisationRepresentantPetiteEntite
>;

export type SecteursDefinitsSansBesoinLocalisationRepresentant = Omit<
  SecteursSansBesoinLocalisationRepresentant,
  "autreSecteurActivite"
>;

export type SousSecteurAutrePour<S extends SecteursAvecSousSecteurs> =
  `autreSousSecteur${Capitalize<S>}`;

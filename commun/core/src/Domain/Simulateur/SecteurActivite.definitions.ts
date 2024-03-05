import { UnionDe } from "../../../../utils/types/UnionDe";
import {
  ValeursSecteurAvecActivitesEssentielles,
  ValeursSecteursActivites,
  ValeursSecteursAvecSousSecteurs,
  ValeursSecteursAvecBesoinLocalisationRepresentant,
  ValeursSecteursImportantsAvecBesoinLocalisation,
  ValeursSecteursActivitesAnnexe1,
  ValeursSecteursActivitesAnnexe2,
} from "./SecteurActivite.valeurs";

export type SecteurActivite = UnionDe<typeof ValeursSecteursActivites>;

export type SecteursAvecSousSecteurs = UnionDe<
  typeof ValeursSecteursAvecSousSecteurs
>;

export type SecteurActiviteAnnexe1 = UnionDe<
  typeof ValeursSecteursActivitesAnnexe1
>;
export type SecteurActiviteAnnexe2 = UnionDe<
  typeof ValeursSecteursActivitesAnnexe2
>;

export type SecteursSansSousSecteur = Exclude<
  SecteurActivite,
  SecteursAvecSousSecteurs
>;

export type SecteurAvecBesoinLocalisationRepresentant = UnionDe<
  typeof ValeursSecteursAvecBesoinLocalisationRepresentant
>;
export type SecteursSansBesoinLocalisationRepresentant = Omit<
  SecteursSansSousSecteur,
  SecteurAvecBesoinLocalisationRepresentant
>;

export type SecteurImportantsAvecBesoinLocalisation = UnionDe<
  typeof ValeursSecteursImportantsAvecBesoinLocalisation
>;

export type SecteurAvecActivitesEssentielles = UnionDe<
  typeof ValeursSecteurAvecActivitesEssentielles
>;

export type SecteursDefinitsSansBesoinLocalisationRepresentant = Omit<
  SecteursSansBesoinLocalisationRepresentant,
  "autreSecteurActivite"
>;

export type SousSecteurAutrePour<S extends SecteursAvecSousSecteurs> =
  `autreSousSecteur${Capitalize<S>}`;

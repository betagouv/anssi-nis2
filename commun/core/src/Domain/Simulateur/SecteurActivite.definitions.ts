import { UnionDe } from "../../../../utils/types/UnionDe";
import {
  ValeurSecteurInfrastructureNumerique,
  ValeursSecteursActivites,
  ValeursSecteursComposites,
  ValeursSecteursAvecBesoinLocalisationRepresentant,
  ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal,
} from "./SecteurActivite.valeurs";

export type SecteurActivite = UnionDe<typeof ValeursSecteursActivites>;

export type SecteurComposite = UnionDe<typeof ValeursSecteursComposites>;

export type SecteurSimple = Exclude<SecteurActivite, SecteurComposite>;

export type SecteurAvecBesoinLocalisationRepresentant = UnionDe<
  typeof ValeursSecteursAvecBesoinLocalisationRepresentant
>;

export type SecteursSansBesoinLocalisationRepresentant = Omit<
  SecteurSimple,
  SecteurAvecBesoinLocalisationRepresentant
>;

export type SecteurImportantsAvecBesoinLocalisationEtablissementPrincipal =
  UnionDe<typeof ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal>;

export type SecteurInfrastructureNumerique = UnionDe<
  typeof ValeurSecteurInfrastructureNumerique
>;

export type SecteursDefinitsSansBesoinLocalisationRepresentant = Omit<
  SecteursSansBesoinLocalisationRepresentant,
  "autreSecteurActivite"
>;

export type SousSecteurAutrePour<S extends SecteurComposite> =
  `autreSousSecteur${Capitalize<S>}`;

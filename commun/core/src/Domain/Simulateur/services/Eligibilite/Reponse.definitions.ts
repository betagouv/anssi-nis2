import { ExtraitAutre } from "../../../../../../utils/types/Extrait";
import { Tag } from "../../../../../../utils/types/Tag";
import {
  ActiviteSecteursSimples,
  ActivitesEnergie,
  ActivitesFabrication,
  ActivitesFournisseursNumeriques,
  ActivitesGestionServicesTic,
  ActivitesInfrastructureNumeriqueLocalisables,
  ActivitesTransports,
} from "../../Activite.definitions";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
} from "../../ChampsSimulateur.definitions";
import {
  SecteurActivite,
  SecteurAvecBesoinLocalisationRepresentant,
  SecteursAvecSousSecteurs,
  SecteursDefinitsSansBesoinLocalisationRepresentant,
  SousSecteurAutrePour,
} from "../../SecteurActivite.definitions";
import {
  SousSecteurEnergie,
  SousSecteurFabrication,
  SousSecteurTransport,
} from "../../SousSecteurActivite.definitions";

export type ReponseDesignationOperateurServicesEssentiels = {
  designationOperateurServicesEssentiels: DesignationOperateurServicesEssentiels;
};

export type ReponseAppartenancePaysUnionEuropeenne = {
  appartenancePaysUnionEuropeenne: AppartenancePaysUnionEuropeenne;
};

export type TypeStructurePrivee = {
  typeStructure: "privee";
};

export type TypeStructurePublique = {
  typeStructure: "publique";
  typeEntitePublique: TypeEntitePublique;
};

export type CategorieTaille = "Petit" | "Grand";

export type CategoriseTaille<S extends CategorieTaille> = Tag<
  S,
  "CategorieTaille"
>;

export type TrancheTaillePrivePetit = {
  trancheChiffreAffaire: Extract<TrancheChiffreAffaire, "petit">;
  trancheNombreEmployes: Extract<TrancheNombreEmployes, "petit">;
};
export type TrancheTaillePriveGrand =
  | {
      trancheChiffreAffaire: Omit<TrancheChiffreAffaire, "petit">;
      trancheNombreEmployes: TrancheNombreEmployes;
    }
  | {
      trancheChiffreAffaire: TrancheChiffreAffaire;
      trancheNombreEmployes: Omit<TrancheNombreEmployes, "petit">;
    };
export type TranchesTaillePrive<T extends CategorieTaille> = T extends "Petit"
  ? TrancheTaillePrivePetit
  : TrancheTaillePriveGrand;

export type TailleSecteurPrive<T extends CategorieTaille> =
  TranchesTaillePrive<T> & CategoriseTaille<T>;

type TrancheTaillePublicPetit = {
  trancheNombreEmployes: Extract<TrancheChiffreAffaire, "petit">;
};
type TrancheTaillePublicGrand = {
  trancheNombreEmployes: Omit<TrancheNombreEmployes, "petit">;
};
export type TranchesTaillePublic<T extends CategorieTaille> = T extends "Petit"
  ? TrancheTaillePublicPetit
  : TrancheTaillePublicGrand;

export type TailleSecteurPublic<T extends CategorieTaille> =
  TranchesTaillePublic<T> & CategoriseTaille<T>;
export type ReponseStructurePrivee<T extends CategorieTaille> =
  TypeStructurePrivee & TailleSecteurPrive<T>;

export type ReponseStructurePublique<T extends CategorieTaille> =
  TypeStructurePublique & TailleSecteurPublic<T>;

export type ReponseStructure<T extends CategorieTaille> =
  | ReponseStructurePrivee<T>
  | ReponseStructurePublique<T>;

export type InformationSousSecteurAutre<S extends SecteursAvecSousSecteurs> = {
  secteurActivite: S;
  sousSecteurActivite: SousSecteurAutrePour<S>;
};

export type InformationSecteurEnergie = {
  secteurActivite: "energie";
  sousSecteurActivite: Omit<SousSecteurEnergie, "autreSousSecteurEnergie">;
  activites: Set<ActivitesEnergie>;
};

export type InformationSecteurFabrication = {
  secteurActivite: "fabrication";
  sousSecteurActivite: Omit<
    SousSecteurFabrication,
    "autreSousSecteurFabrication"
  >;
  activites: Set<ActivitesFabrication>;
};

export type InformationSecteurTransport = {
  secteurActivite: "transports";
  sousSecteurActivite: Omit<SousSecteurTransport, "autreSousSecteurTransports">;
  activites: Set<ActivitesTransports>;
};

export type InformationSecteurSimple = {
  secteurActivite: SecteursDefinitsSansBesoinLocalisationRepresentant;
  activites: Set<ActiviteSecteursSimples>;
};

export type EtablissementPrincipalNeFournitPasUE = {
  fournitServicesUnionEuropeenne: "non";
};
export type EtablissementPrincipalFournitUE = {
  fournitServicesUnionEuropeenne: "oui";
  localisationRepresentant: AppartenancePaysUnionEuropeenne;
};

export type EtablissementPrincipalLocalisation =
  | EtablissementPrincipalNeFournitPasUE
  | EtablissementPrincipalFournitUE;

export type InformationSecteurLocalisablePetiteEntite = {
  secteurActivite: SecteurAvecBesoinLocalisationRepresentant;
  activites: Set<ActivitesInfrastructureNumeriqueLocalisables>;
} & EtablissementPrincipalLocalisation;

export type InformationSecteurLocalisableGrandeEntite = {
  secteurActivite: SecteurAvecBesoinLocalisationRepresentant;
  activites: Set<
    | ActivitesInfrastructureNumeriqueLocalisables
    | ActivitesFournisseursNumeriques
    | ActivitesGestionServicesTic
  >;
} & EtablissementPrincipalLocalisation;

export type InformationSecteurSimpleAutre = {
  secteurActivite: ExtraitAutre<SecteurActivite>;
};

export type InformationsSecteurPossiblesAutre =
  | InformationSecteurSimpleAutre
  | InformationSousSecteurAutre<SecteursAvecSousSecteurs>;

export type InformationsSecteurPossibleNonLocalisees =
  | InformationsSecteursCompositeListe
  | InformationSecteurSimple;

export type InformationSecteurPossiblePetit =
  | InformationsSecteurPossibleNonLocalisees
  | InformationSecteurLocalisablePetiteEntite
  | InformationsSecteurPossiblesAutre;

export type InformationSecteurPossibleGrand =
  | InformationsSecteurPossibleNonLocalisees
  | InformationSecteurLocalisableGrandeEntite
  | InformationsSecteurPossiblesAutre;

export type InformationsSecteursCompositeListe =
  | InformationSecteurEnergie
  | InformationSecteurFabrication
  | InformationSecteurTransport;

export type InformationsSecteursComposite =
  | InformationSousSecteurAutre<SecteursAvecSousSecteurs>
  | InformationsSecteursCompositeListe;

export type InformationSecteurPossible =
  | InformationSecteurPossiblePetit
  | InformationSecteurPossibleGrand;

export type InformationsSecteurPetitAlternatives<T extends CategorieTaille> =
  T extends "Petit"
    ? {
        secteurs: Set<InformationSecteurPossiblePetit>;
      }
    : {
        secteurs: Set<InformationSecteurPossibleGrand>;
      };

export type ReponseInformationsSecteur<T extends CategorieTaille> =
  CategoriseTaille<T> & InformationsSecteurPetitAlternatives<T>;

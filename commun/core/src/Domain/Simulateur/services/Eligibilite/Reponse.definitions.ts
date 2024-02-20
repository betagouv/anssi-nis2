import { ExtraitAutre } from "../../../../../../utils/types/Extrait";
import { RemoveTag, Tag } from "../../../../../../utils/types/Tag";
import {
  ActiviteSecteursSimples,
  ActivitesEnergie,
  ActivitesFabrication,
  ActivitesFournisseursNumeriques,
  ActivitesGestionServicesTic,
  ActivitesInfrastructureNumeriqueLocalisables,
  ActivitesInfrastructureNumeriqueNonLocalisables,
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
  SecteursAvecBesoinLocalisationRepresentant,
  SecteursAvecSousSecteurs,
  SecteursSansBesoinLocalisationRepresentant,
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

type TypeStructurePrivee = {
  typeStructure: "privee";
};
type TypeStructurePublique = {
  typeStructure: "publique";
  typeEntitePublique: TypeEntitePublique;
};

type CategoriseTaille<S extends "Grand" | "Petit"> = Tag<S, "CategorieTaille">;

type TailleSecteurPriveGrand = (
  | {
      trancheChiffreAffaire: Omit<TrancheChiffreAffaire, "petit">;
      trancheNombreEmployes: TrancheNombreEmployes;
    }
  | {
      trancheChiffreAffaire: TrancheChiffreAffaire;
      trancheNombreEmployes: Omit<TrancheNombreEmployes, "petit">;
    }
) &
  CategoriseTaille<"Grand">;

type TailleSecteurPrivePetit = {
  trancheChiffreAffaire: Extract<TrancheChiffreAffaire, "petit">;
  trancheNombreEmployes: Extract<TrancheNombreEmployes, "petit">;
} & CategoriseTaille<"Petit">;

type TailleSecteurPublicPetit = {
  trancheNombreEmployes: Extract<TrancheChiffreAffaire, "petit">;
} & CategoriseTaille<"Petit">;
type TailleSecteurPublicGrand = {
  trancheNombreEmployes: Omit<TrancheNombreEmployes, "petit">;
} & CategoriseTaille<"Grand">;

export type ReponseStructurePriveePetit = TypeStructurePrivee &
  TailleSecteurPrivePetit;
export type ReponseStructurePriveeGrand = TypeStructurePrivee &
  TailleSecteurPriveGrand;

export type ReponseStructurePubliquePetit = TypeStructurePublique &
  TailleSecteurPublicPetit;
export type ReponseStructurePubliqueGrand = TypeStructurePublique &
  TailleSecteurPublicGrand;

export type ReponseStructurePetit =
  | ReponseStructurePriveePetit
  | ReponseStructurePubliquePetit;
export type ReponseStructureGrand =
  | ReponseStructurePriveeGrand
  | ReponseStructurePubliqueGrand;
export type ReponseStructure = ReponseStructurePetit | ReponseStructureGrand;

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
  secteurActivite: Omit<
    SecteursSansBesoinLocalisationRepresentant,
    "autreSecteurActivite"
  >;
  activites: Set<ActiviteSecteursSimples>;
};

type EtablissementPrincipalNeFournitPasFrance = {
  fournitServicesUnionEuropeenne: "non";
};
type EtablissementPrincipalLocalisation = {
  fournitServicesUnionEuropeenne: "oui";
  localisationRepresentant: AppartenancePaysUnionEuropeenne;
};

export type InformationSecteurLocalisableGrand =
  | {
      secteurActivite: SecteursAvecBesoinLocalisationRepresentant;
      activites: Set<
        | ActivitesInfrastructureNumeriqueNonLocalisables
        | ActivitesFournisseursNumeriques
        | ActivitesGestionServicesTic
      >;
    }
  | ({
      secteurActivite: SecteursAvecBesoinLocalisationRepresentant;
      activites: Set<
        | ActivitesInfrastructureNumeriqueLocalisables
        | ActivitesFournisseursNumeriques
        | ActivitesGestionServicesTic
      >;
    } & EtablissementPrincipalNeFournitPasFrance)
  | ({
      secteurActivite: SecteursAvecBesoinLocalisationRepresentant;
      activites: Set<
        | ActivitesInfrastructureNumeriqueLocalisables
        | ActivitesFournisseursNumeriques
        | ActivitesGestionServicesTic
      >;
    } & EtablissementPrincipalLocalisation);

export type InformationSecteurLocalisablePetiteEntreprise =
  | {
      secteurActivite: SecteursAvecBesoinLocalisationRepresentant;
      activites: Set<ActivitesInfrastructureNumeriqueNonLocalisables>;
    }
  | ({
      secteurActivite: SecteursAvecBesoinLocalisationRepresentant;
      activites: Set<ActivitesInfrastructureNumeriqueLocalisables>;
    } & EtablissementPrincipalNeFournitPasFrance)
  | ({
      secteurActivite: SecteursAvecBesoinLocalisationRepresentant;
      activites: Set<ActivitesInfrastructureNumeriqueLocalisables>;
    } & EtablissementPrincipalLocalisation);

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
  | InformationSecteurLocalisablePetiteEntreprise
  | InformationsSecteurPossiblesAutre;

export type InformationSecteurPossibleGrand =
  | InformationsSecteurPossibleNonLocalisees
  | InformationSecteurLocalisableGrand
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

type InformationsSecteurPetitAlternatives =
  | (Tag<"Necessaire", "Localisation"> & {
      secteurs: Set<InformationSecteurPossiblePetit>;
      fournitServicesUnionEuropeenne: "oui" | "non";
      localisationRepresentant: AppartenancePaysUnionEuropeenne;
    })
  | (Tag<"NonNecessaire", "Localisation"> & {
      secteurs: Set<
        | InformationsSecteurPossibleNonLocalisees
        | InformationsSecteurPossiblesAutre
      >;
    });

export type ReponseInformationsSecteurPetit = CategoriseTaille<"Petit"> &
  InformationsSecteurPetitAlternatives;

export type ReponseInformationsSecteurGrand = CategoriseTaille<"Grand"> & {
  secteurs: Set<InformationSecteurPossibleGrand>;
};

export type EtapesEvaluationActives =
  | "DesignationOperateurServicesEssentiels"
  | "AppartenancePaysUnionEuropeenne"
  | "Structure"
  | "InformationsSecteur";

export type EtapesEvaluation = "NonEvalue" | EtapesEvaluationActives;

export type ReponseEtatVide = Tag<"ReponseEtatVide">;

type CapsuleDesignationOperateurServicesEssentiels = {
  DesignationOperateurServicesEssentiels: ReponseDesignationOperateurServicesEssentiels;
};
type CapsuleAppartenancePaysUnionEuropeenne = {
  AppartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne;
};
type CapsuleStructure = {
  Structure: ReponseStructure;
};
type CapsuleInformationsSecteur =
  | {
      Structure: ReponseStructurePetit;
      InformationsSecteur: ReponseInformationsSecteurPetit;
    }
  | {
      Structure: ReponseStructureGrand;
      InformationsSecteur: ReponseInformationsSecteurGrand;
    };

export type CapsuleInformations =
  | CapsuleDesignationOperateurServicesEssentiels
  | CapsuleAppartenancePaysUnionEuropeenne
  | CapsuleStructure
  | CapsuleInformationsSecteur;

export type ReponseEtatDesignationOperateurServicesEssentiels =
  Tag<"DesignationOperateurServicesEssentiels"> &
    CapsuleDesignationOperateurServicesEssentiels;
export type ReponseEtatAppartenancePaysUnionEuropeenne =
  Tag<"AppartenancePaysUnionEuropeenne"> &
    RemoveTag<ReponseEtatDesignationOperateurServicesEssentiels> &
    CapsuleAppartenancePaysUnionEuropeenne;

export type ReponseEtatStructure = Tag<"Structure"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> &
  CapsuleStructure;

export type ReponseEtatStructurePetit = Tag<"Structure"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure: ReponseStructurePetit;
  };

export type ReponseEtatInformationsSecteurPetit = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure: ReponseStructurePetit;
    InformationsSecteur: ReponseInformationsSecteurPetit;
  };
export type ReponseEtatInformationsSecteur = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> &
  CapsuleInformationsSecteur;

export type UnionReponseEtatNonVide =
  | ReponseEtatDesignationOperateurServicesEssentiels
  | ReponseEtatAppartenancePaysUnionEuropeenne
  | ReponseEtatStructure
  | ReponseEtatInformationsSecteur;

export type UnionReponseEtat = ReponseEtatVide | UnionReponseEtatNonVide;

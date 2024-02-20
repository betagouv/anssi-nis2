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
import { ResultatEvaluationRegulation } from "./EtatRegulation.definition";

export type ReponseDesigneOperateurServicesEssentiels = {
  designationOperateurServicesEssentiels: DesignationOperateurServicesEssentiels;
};

export type ReponseLocalisation = {
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

export type DefinitionStructurePriveePetit = TypeStructurePrivee &
  TailleSecteurPrivePetit;
export type DefinitionStructurePriveeGrand = TypeStructurePrivee &
  TailleSecteurPriveGrand;

export type DefinitionStructurePubliquePetit = TypeStructurePublique &
  TailleSecteurPublicPetit;
export type DefinitionStructurePubliqueGrand = TypeStructurePublique &
  TailleSecteurPublicGrand;

export type DefinitionStructurePetit =
  | DefinitionStructurePriveePetit
  | DefinitionStructurePubliquePetit;
export type DefinitionStructureGrand =
  | DefinitionStructurePriveeGrand
  | DefinitionStructurePubliqueGrand;
export type DefinitionStructure =
  | DefinitionStructurePetit
  | DefinitionStructureGrand;

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

export type InformationSecteurPossiblePetit =
  | InformationSecteurEnergie
  | InformationSecteurFabrication
  | InformationSecteurTransport
  | InformationSecteurSimple
  | InformationSecteurLocalisablePetiteEntreprise
  | InformationsSecteurPossiblesAutre;

export type InformationSecteurPossibleGrand =
  | InformationSecteurEnergie
  | InformationSecteurFabrication
  | InformationSecteurTransport
  | InformationSecteurSimple
  | InformationSecteurLocalisableGrand
  | InformationsSecteurPossiblesAutre;

export type InformationsSecteursCompositeListe =
  | InformationSecteurEnergie
  | InformationSecteurFabrication
  | InformationSecteurTransport;

export type InformationsSecteursComposite =
  | InformationSousSecteurAutre<SecteursAvecSousSecteurs>
  | InformationSecteurEnergie
  | InformationSecteurFabrication
  | InformationSecteurTransport;

export type InformationSecteurPossible =
  | InformationSecteurPossiblePetit
  | InformationSecteurPossibleGrand;

export type InformationsSecteurPetit = CategoriseTaille<"Petit"> & {
  secteurs: Set<InformationSecteurPossiblePetit>;
};

export type InformationsSecteurGrand = CategoriseTaille<"Grand"> & {
  secteurs: Set<InformationSecteurPossibleGrand>;
};

export type InformationsSecteur = {
  secteurs: Set<
    InformationSecteurPossiblePetit | InformationSecteurPossibleGrand
  >;
};

export type DonneesCompletesEvaluees =
  | "DesignationOperateurServicesEssentiels"
  | "AppartenancePaysUnionEuropeenne"
  | "Structure"
  | "InformationsSecteur";

export type EtapesEvaluation = "NonEvalue" | DonneesCompletesEvaluees;

export type ReponseEtatVide = Tag<"ReponseEtatVide">;

type CapsuleDesignationOperateurServicesEssentiels = {
  DesignationOperateurServicesEssentiels: ReponseDesigneOperateurServicesEssentiels;
};
type CapsuleAppartenancePaysUnionEuropeenne = {
  AppartenancePaysUnionEuropeenne: ReponseLocalisation;
};
type CapsuleStructure = {
  Structure: DefinitionStructure;
};
type CapsuleInformationsSecteur =
  | {
      Structure: DefinitionStructurePetit;
      InformationsSecteur: InformationsSecteurPetit;
    }
  | {
      Structure: DefinitionStructureGrand;
      InformationsSecteur: InformationsSecteurGrand;
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
    Structure: DefinitionStructurePetit;
  };

export type ReponseEtatInformationsSecteurPetit = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure: DefinitionStructurePetit;
    InformationsSecteur: InformationsSecteurPetit;
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
export const propReponseEtat =
  (reponse: ResultatEvaluationRegulation) =>
  <T extends DonneesCompletesEvaluees>(
    propName: T,
  ): Pick<ReponseEtatInformationsSecteur, T> =>
    ({
      [propName]: (reponse as ReponseEtatInformationsSecteur)[propName],
    }) as Pick<ReponseEtatInformationsSecteur, T>;

export const eqInformationsSecteur = (
  a: InformationSecteurPossible,
  b: InformationSecteurPossible,
) => a.secteurActivite === b.secteurActivite;

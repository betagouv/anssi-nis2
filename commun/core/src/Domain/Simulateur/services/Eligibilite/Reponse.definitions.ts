import { ExtraitAutre } from "../../../../../../utils/types/Extrait";
import { Tag } from "../../../../../../utils/types/Tag";
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
  Tag<"Grand", "CategorieTaille">;

type TailleSecteurPrivePetit = {
  trancheChiffreAffaire: Extract<TrancheChiffreAffaire, "petit">;
  trancheNombreEmployes: Extract<TrancheNombreEmployes, "petit">;
} & Tag<"Petit", "CategorieTaille">;

type TailleSecteurPrive = TailleSecteurPrivePetit | TailleSecteurPriveGrand;

type TailleSecteurPublicPetit = {
  trancheNombreEmployes: Extract<TrancheChiffreAffaire, "petit">;
} & Tag<"Grand", "CategorieTaille">;
type TailleSecteurPublicGrand = {
  trancheNombreEmployes: Omit<TrancheNombreEmployes, "petit">;
} & Tag<"Petit", "CategorieTaille">;

type TailleSecteurPublic = TailleSecteurPublicPetit | TailleSecteurPublicGrand;

export type DefinitionStructurePriveePetit = TypeStructurePrivee &
  TailleSecteurPrivePetit;
export type DefinitionStructurePriveeGrand = TypeStructurePrivee &
  TailleSecteurPriveGrand;

export type DefinitionStructurePrivee = TypeStructurePrivee &
  TailleSecteurPrive;

export type DefinitionStructurePubliquePetit = TypeStructurePublique &
  TailleSecteurPublicPetit;
export type DefinitionStructurePubliqueGrand = TypeStructurePublique &
  TailleSecteurPublicGrand;
export type DefinitionStructurePublique = TypeStructurePublique &
  TailleSecteurPublic;

export type DefinitionStructurePetit =
  | DefinitionStructurePriveePetit
  | DefinitionStructurePubliquePetit;
export type DefinitionStructureGrand =
  | DefinitionStructurePriveeGrand
  | DefinitionStructurePubliqueGrand;
export type DefinitionStructure =
  | DefinitionStructurePrivee
  | DefinitionStructurePublique;

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

export type InformationSecteurAutre = {
  secteurActivite: ExtraitAutre<SecteurActivite>;
};

export type InformationSecteurPossiblePetit =
  | InformationSecteurEnergie
  | InformationSecteurFabrication
  | InformationSecteurTransport
  | InformationSecteurSimple
  | InformationSecteurLocalisablePetiteEntreprise
  | InformationSecteurAutre
  | InformationSousSecteurAutre<SecteursAvecSousSecteurs>;

export type InformationSecteurPossibleGrand =
  | InformationSecteurEnergie
  | InformationSecteurFabrication
  | InformationSecteurTransport
  | InformationSecteurSimple
  | InformationSecteurLocalisableGrand
  | InformationSecteurAutre
  | InformationSousSecteurAutre<SecteursAvecSousSecteurs>;

export type InformationSecteurPossible =
  | InformationSecteurPossiblePetit
  | InformationSecteurPossibleGrand;

export type InformationsSecteurPetit = {
  secteurs: Set<InformationSecteurPossiblePetit>;
};
export type InformationsSecteurGrand = {
  secteurs: Set<InformationSecteurPossibleGrand>;
};
export type InformationsSecteur = {
  secteurs: Set<
    InformationSecteurPossiblePetit | InformationSecteurPossibleGrand
  >;
};

export type InformationsLocalisationRepresentant =
  | {
      fournitServicesUnionEuropeenne: "non";
    }
  | {
      fournitServicesUnionEuropeenne: "oui";
      localisationRepresentant: AppartenancePaysUnionEuropeenne;
    };

export type DonneesCompletesEvaluees =
  | "DesignationOperateurServicesEssentiels"
  | "AppartenancePaysUnionEuropeenne"
  | "Structure"
  | "InformationsSecteur"
  | "LocalisationRepresentant";

export type DonneesEvaluees = DonneesCompletesEvaluees | "Fin";

type ReferencesTypeDonnees = {
  DesignationOperateurServicesEssentiels: ReponseDesigneOperateurServicesEssentiels;
  AppartenancePaysUnionEuropeenne: ReponseLocalisation;
  Structure: DefinitionStructure;
  InformationsSecteur: InformationsSecteur;
  LocalisationRepresentant: InformationsLocalisationRepresentant;
};

export type TypeDonnees<
  EtapeEvaluation extends DonneesCompletesEvaluees &
    keyof ReferencesTypeDonnees,
> = ReferencesTypeDonnees[EtapeEvaluation];

export type ReponseEtatVide = Tag<"ReponseEtatVide">;

export type ReponseEtatDesignationOperateurServicesEssentiels =
  Tag<"DesignationOperateurServicesEssentiels"> & {
    DesignationOperateurServicesEssentiels: ReponseDesigneOperateurServicesEssentiels;
  };

export type ReponseEtatappartenancePaysUnionEuropeenne =
  Tag<"AppartenancePaysUnionEuropeenne"> &
    Omit<ReponseEtatDesignationOperateurServicesEssentiels, "_tag"> & {
      AppartenancePaysUnionEuropeenne: ReponseLocalisation;
    };

export type ReponseEtatStructure = Tag<"Structure"> &
  Omit<ReponseEtatappartenancePaysUnionEuropeenne, "_tag"> & {
    Structure: DefinitionStructure;
  };

export type ReponseEtatInformationsSecteur = Tag<"InformationsSecteur"> &
  Omit<ReponseEtatappartenancePaysUnionEuropeenne, "_tag"> &
  (
    | {
        Structure: DefinitionStructurePetit;
        InformationsSecteur: InformationsSecteurPetit;
      }
    | {
        Structure: DefinitionStructureGrand;
        InformationsSecteur: InformationsSecteurGrand;
      }
  );

// export type ReponseEtatLocalisationRepresentant =
//   Tag<"LocalisationRepresentant"> &
//     Omit<ReponseEtatInformationsSecteur, "_tag"> & {
//       [K in "LocalisationRepresentant"]: TypeDonnees<K>;
//     };

export type UnionReponseEtat =
  | ReponseEtatVide
  | ReponseEtatDesignationOperateurServicesEssentiels
  | ReponseEtatappartenancePaysUnionEuropeenne
  | ReponseEtatStructure
  | ReponseEtatInformationsSecteur;
// | ReponseEtatLocalisationRepresentant;

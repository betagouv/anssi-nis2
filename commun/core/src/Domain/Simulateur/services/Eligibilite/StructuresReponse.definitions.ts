import { ExtraitAutre } from "../../../../../../utils/types/Extrait";
import { Tag } from "../../../../../../utils/types/Tag";
import {
  ActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  ActiviteSecteursSimples,
  ActivitesEnergie,
  ActivitesFabrication,
  ActivitesFournisseursNumeriques,
  ActivitesGestionServicesTic,
  ActivitesTransports,
} from "../../Activite.definitions";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
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

export type InformationsTypeStructure<T extends TypeStructure> =
  T extends "privee"
    ? {
        typeStructure: "privee";
      }
    : {
        typeStructure: "publique";
        typeEntitePublique: TypeEntitePublique;
      };

export type CategorieTaille = "Petit" | "Moyen" | "Grand";

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

export type TailleSecteur<
  S extends TypeStructure,
  T extends CategorieTaille,
> = S extends "privee" ? TailleSecteurPrive<T> : TailleSecteurPublic<T>;

export type ReponseStructurePrivee<T extends CategorieTaille> =
  InformationsTypeStructure<"privee"> & TailleSecteur<"privee", T>;

export type TailleSecteurPublic<T extends CategorieTaille> =
  TranchesTaillePublic<T> & CategoriseTaille<T>;

export type ReponseStructurePublique<T extends CategorieTaille> =
  InformationsTypeStructure<"publique"> & TailleSecteur<"publique", T>;

export type ReponseStructure<
  S extends TypeStructure,
  T extends CategorieTaille,
> = S extends "privee"
  ? ReponseStructurePrivee<T>
  : ReponseStructurePublique<T>;

export type InformationSousSecteurAutre<S extends SecteursAvecSousSecteurs> = {
  secteurActivite: S;
  sousSecteurActivite: SousSecteurAutrePour<S>;
};

export type InformationsSecteurCompositeEnergie = {
  secteurActivite: "energie";
  sousSecteurActivite: Omit<SousSecteurEnergie, "autreSousSecteurEnergie">;
  activites: Set<ActivitesEnergie>;
};

export type InformationsSecteurCompositeFabrication = {
  secteurActivite: "fabrication";
  sousSecteurActivite: Omit<
    SousSecteurFabrication,
    "autreSousSecteurFabrication"
  >;
  activites: Set<ActivitesFabrication>;
};

export type InformationsSecteurCompositeTransport = {
  secteurActivite: "transports";
  sousSecteurActivite: Omit<SousSecteurTransport, "autreSousSecteurTransports">;
  activites: Set<ActivitesTransports>;
};

export type InformationSecteurSimple = {
  secteurActivite: SecteursDefinitsSansBesoinLocalisationRepresentant;
  activites: Set<ActiviteSecteursSimples>;
};

export type InformationsSecteursCompositeListe =
  | InformationsSecteurCompositeEnergie
  | InformationsSecteurCompositeFabrication
  | InformationsSecteurCompositeTransport;

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

export type ActivitesAvecBesoinLocalisationRepresentant<
  Taille extends CategorieTaille,
> = Taille extends "Petit"
  ? ActiviteInfrastructureNumeriqueAvecBesoinLocalisation
  :
      | ActiviteInfrastructureNumeriqueAvecBesoinLocalisation
      | ActivitesFournisseursNumeriques
      | ActivitesGestionServicesTic;

export type InformationsSecteurAvecBesoinLocalisation<
  Taille extends CategorieTaille,
> = {
  secteurActivite: SecteurAvecBesoinLocalisationRepresentant;
  activites: Set<ActivitesAvecBesoinLocalisationRepresentant<Taille>>;
} & EtablissementPrincipalLocalisation;

export type InformationSecteurSimpleAutre = {
  secteurActivite: ExtraitAutre<SecteurActivite>;
};

export type InformationsSecteurAutre =
  | InformationSecteurSimpleAutre
  | InformationSousSecteurAutre<SecteursAvecSousSecteurs>;

export type InformationsSecteurSansBesoinLocalisation =
  | InformationsSecteursCompositeListe
  | InformationSecteurSimple;

export type InformationsSecteurPossible<Taille extends CategorieTaille> =
  | InformationsSecteurSansBesoinLocalisation
  | InformationsSecteurAvecBesoinLocalisation<Taille>
  | InformationsSecteurAutre;

export type InformationsSecteursComposite =
  | InformationSousSecteurAutre<SecteursAvecSousSecteurs>
  | InformationsSecteursCompositeListe;

export type InformationsSecteur<T extends CategorieTaille> = {
  secteurs: Set<InformationsSecteurPossible<T>>;
};

export type ReponseInformationsSecteur<T extends CategorieTaille> =
  CategoriseTaille<T> & InformationsSecteur<T>;
export type predicatInformationSecteurPossible = (
  i: InformationsSecteurPossible<CategorieTaille>,
) => boolean;

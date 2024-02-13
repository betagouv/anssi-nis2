import {
  Activite,
  ActivitesEnergie,
  ActivitesFabrication,
  ActivitesTransports,
} from "../../Activite.definitions";
import {
  appartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
} from "../../ChampsSimulateur.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import {
  SousSecteurEnergie,
  SousSecteurFabrication,
  SousSecteurTransport,
} from "../../SousSecteurActivite.definitions";

export type ReponseDesigneOSE = {
  designationOperateurServicesEssentiels: DesignationOperateurServicesEssentiels;
};

export type ReponseLocalisation = {
  appartenancePaysUnionEuropeenne: appartenancePaysUnionEuropeenne;
};

type TypeStructurePrivee = {
  typeStructure: "privee";
};
type TypeStructurePublique = {
  typeStructure: "publique";
  typeEntitePublique: TypeEntitePublique;
};

type TailleSecteurPrive = {
  trancheChiffreAffaire: TrancheChiffreAffaire;
  trancheNombreEmployes: TrancheNombreEmployes;
};
type TailleSecteurPublic = {
  trancheNombreEmployes: TrancheNombreEmployes;
};

export type DefinitionStructurePrivee = TypeStructurePrivee &
  TailleSecteurPrive;
export type DefinitionStructurePublique = TypeStructurePublique &
  TailleSecteurPublic;

export type DefinitionStructure =
  | DefinitionStructurePrivee
  | DefinitionStructurePublique;

type InformationSecteurEnergie =
  | {
      secteurActivite: "energie";
      sousSecteurActivite: Omit<SousSecteurEnergie, "autreSousSecteurEnergie">;
      activites: ActivitesEnergie[];
    }
  | {
      secteurActivite: "energie";
      sousSecteurActivite: "autreSousSecteurEnergie";
    };

type InformationSecteurFabrication =
  | {
      secteurActivite: "fabrication";
      sousSecteurActivite: Omit<
        SousSecteurFabrication,
        "autreSousSecteurFabrication"
      >;
      activites: ActivitesFabrication[];
    }
  | {
      secteurActivite: "fabrication";
      sousSecteurActivite: "autreSousSecteurFabrication";
    };

type InformationSecteurTransport =
  | {
      secteurActivite: "transports";
      sousSecteurActivite: Omit<
        SousSecteurTransport,
        "autreSousSecteurTransport"
      >;
      activites: ActivitesFabrication[];
    }
  | {
      secteurActivite: "transports";
      sousSecteurActivite: "autreSousSecteurTransports";
    };

export type InformationSecteurPossible =
  | InformationSecteurEnergie
  | InformationSecteurFabrication
  | InformationSecteurTransport
  | {
      secteurActivite: "autreSecteurActivite";
    }
  | {
      secteurActivite: Omit<
        SecteurActivite,
        "energie" | "fabrication" | "transports" | "autreSecteurActivite"
      >;
      activites: Omit<
        Activite,
        ActivitesEnergie | ActivitesTransports | ActivitesFabrication
      >[];
    };
export type InformationsSecteur = { secteurs: Set<InformationSecteurPossible> };

export type InformationsLocalisationRepresentant =
  | {
      fournitServicesUnionEuropeenne: "non";
    }
  | {
      fournitServicesUnionEuropeenne: "oui";
      localisationRepresentant: appartenancePaysUnionEuropeenne;
    };

export type DonneesCompletesEvaluees =
  | "DesignationOperateurServicesEssentiels"
  | "appartenancePaysUnionEuropeenne"
  | "Structure"
  | "SecteurActiviteComplet"
  | "LocalisationRepresentant";

export type DonneesEvaluees = DonneesCompletesEvaluees | "Fin";

export type TypeDonnees<EtapeEvaluation extends DonneesCompletesEvaluees> =
  EtapeEvaluation extends "DesignationOperateurServicesEssentiels"
    ? ReponseDesigneOSE
    : EtapeEvaluation extends "appartenancePaysUnionEuropeenne"
      ? ReponseLocalisation
      : EtapeEvaluation extends "Structure"
        ? DefinitionStructure
        : EtapeEvaluation extends "SecteurActiviteComplet"
          ? InformationsSecteur
          : EtapeEvaluation extends "LocalisationRepresentant"
            ? InformationsLocalisationRepresentant
            : never;

export type Tag<E extends string> = { _tag: `${E}` };

export type ReponseEtat<
  Encapsule extends UnionReponseEtat,
  E extends DonneesCompletesEvaluees,
> = Tag<E> &
  Omit<Encapsule, "_tag"> & {
    [K in E]: TypeDonnees<K>;
  };

export type ReponseEtatVide = Tag<"ReponseEtatVide">;

export type ReponseEtatDesignationOperateurServicesEssentiels = ReponseEtat<
  ReponseEtatVide,
  "DesignationOperateurServicesEssentiels"
>;

export type ReponseEtatappartenancePaysUnionEuropeenne = ReponseEtat<
  ReponseEtatDesignationOperateurServicesEssentiels,
  "appartenancePaysUnionEuropeenne"
>;

export type ReponseEtatStructure = ReponseEtat<
  ReponseEtatappartenancePaysUnionEuropeenne,
  "Structure"
>;

export type ReponseEtatSecteurActiviteComplet = ReponseEtat<
  ReponseEtatStructure,
  "SecteurActiviteComplet"
>;

export type ReponseEtatLocalisationRepresentant = ReponseEtat<
  ReponseEtatSecteurActiviteComplet,
  "LocalisationRepresentant"
>;

export type UnionReponseEtat =
  | ReponseEtatVide
  | ReponseEtatDesignationOperateurServicesEssentiels
  | ReponseEtatappartenancePaysUnionEuropeenne
  | ReponseEtatStructure
  | ReponseEtatSecteurActiviteComplet
  | ReponseEtatLocalisationRepresentant;

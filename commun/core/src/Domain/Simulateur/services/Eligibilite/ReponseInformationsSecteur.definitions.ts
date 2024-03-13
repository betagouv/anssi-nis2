import {
  ActiviteInfranumLocalEtabLot1,
  ActiviteInfranumLocalEtabLot2,
  ActiviteInfranumLocalServices,
} from "../../Activite.definitions";
import {
  InformationsSecteur,
  InformationsSecteurAvecActiviteInfranumLocalEtabLot1,
  InformationsSecteurAvecActiviteInfranumLocalEtabLot2,
  InformationsSecteurAvecActiviteInfranumLocalServices,
  InformationsSecteurLocalEtab,
  InformationsSecteurPossible,
  InfoSecteursMoinsActivites,
} from "./InformationsSecteur.definitions";
import {
  LocalisationsServices,
  LocalisationEtablissementPrincipal,
} from "./LocalisationsActivites.definitions";
import {
  CategorieTaille,
  CategoriseTaille,
} from "./ReponseStructure.definitions";

export type ReponseInformationsSecteurInfranumActiviteLocalServices =
  CategoriseTaille<CategorieTaille> &
    InformationsSecteurAvecActiviteInfranumLocalServices &
    LocalisationsServices;

export type ReponseInformationsSecteurInfranumActiviteLocalEtabLot1 =
  CategoriseTaille<CategorieTaille> &
    InformationsSecteurAvecActiviteInfranumLocalEtabLot1 &
    LocalisationEtablissementPrincipal;

export type ReponseInformationsSecteurInfranumActiviteLocalEtabLot2 =
  CategoriseTaille<"Moyen" | "Grand"> &
    InformationsSecteurAvecActiviteInfranumLocalEtabLot2 &
    LocalisationEtablissementPrincipal;

/**
 * Réponse informations serveur dans le cas des activités Infrastructure
 * Numérique sans les activités nécessitant une localisation de l'établissement
 * principal ni des services pour une Petite Entité
 */
export type ReponseInformationsSecteurInfranumAutresActivitesListees_P =
  CategoriseTaille<"Petit"> &
    InfoSecteursMoinsActivites<
      "infrastructureNumerique",
      ActiviteInfranumLocalServices | ActiviteInfranumLocalEtabLot1
    >;

/**
 * Réponse informations serveur dans le cas des activités Infrastructure
 * Numérique sans les activités nécessitant une localisation de l'établissement
 * principal ni des services pour une Grande Entité
 */
export type ReponseInformationsSecteurInfranumAutresActivitesListees_MG =
  CategoriseTaille<"Moyen" | "Grand"> &
    InfoSecteursMoinsActivites<
      "infrastructureNumerique",
      | ActiviteInfranumLocalServices
      | ActiviteInfranumLocalEtabLot1
      | ActiviteInfranumLocalEtabLot2
    >;

/**
 * Réponse Informations Secteur dans le cas des activités Infrastructure
 * Numérique sans les activités nécessitant une localisation de l'établissement
 * principal ni des services par rapport à la taille de l'entité
 */
export type ReponseInformationsSecteurInfranumAutresActivitesListees<
  Taille extends CategorieTaille,
> = Taille extends "Petit"
  ? ReponseInformationsSecteurInfranumAutresActivitesListees_P
  : ReponseInformationsSecteurInfranumAutresActivitesListees_MG;

/**
 * Réponse Informations Secteur pour:
 * - "gestionServicesTic" | "fournisseursNumeriques"
 * - Taille = "Petit"
 */
export type ReponseInformationsSecteurLocalEtab_P = CategoriseTaille<"Petit"> &
  InformationsSecteurLocalEtab;

/**
 * Réponse Informations Secteur pour:
 * - "gestionServicesTic" | "fournisseursNumeriques"
 * - Taille = "Moyen" | "Grand"
 * Contient une localisation de services
 */
export type ReponseInformationsSecteurLocalEtab_MG = CategoriseTaille<
  "Moyen" | "Grand"
> &
  InformationsSecteurLocalEtab &
  LocalisationsServices;

export type ReponseInformationsSecteurLocalEtab<
  Taille extends CategorieTaille,
> = Taille extends "Petit"
  ? ReponseInformationsSecteurLocalEtab_P
  : ReponseInformationsSecteurLocalEtab_MG;

export type ReponseInformationsSecteur<Taille extends CategorieTaille> =
  CategoriseTaille<Taille> & InformationsSecteur<Taille>;

export type PredicatInformationSecteurPossible = (
  i: InformationsSecteurPossible<CategorieTaille>,
) => boolean;

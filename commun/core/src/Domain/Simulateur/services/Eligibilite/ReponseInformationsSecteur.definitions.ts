import {
  InformationsAutresSecteursListes,
  InformationSecteurSimpleAutre,
  InformationsSecteurAvecActiviteInfranumLocalEtabLot1,
  InformationsSecteurAvecActiviteInfranumLocalEtabLot2,
  InformationsSecteurAvecActiviteInfranumLocalServices,
  InformationsSecteurComposite,
  InformationsSecteurInfranumAutresActivitesListees_MG,
  InformationsSecteurInfranumAutresActivitesListees_P,
  InformationsSecteurLocalEtab,
  InformationsSecteursCompositeListe,
} from "./InformationsSecteur.definitions";
import {
  LocalisationEtablissementPrincipal,
  LocalisationsServices,
} from "./LocalisationsActivites.definitions";
import {
  CategorieTaille,
  CategoriseTaille,
} from "./ReponseStructure.definitions";

export type ReponseInformationsSecteurInfranumActiviteLocalServices<
  Taille extends CategorieTaille,
> = CategoriseTaille<Taille> &
  InformationsSecteurAvecActiviteInfranumLocalServices &
  LocalisationsServices;

export type ReponseInformationsSecteurInfranumActiviteLocalEtabLot1<
  Taille extends CategorieTaille,
> = CategoriseTaille<Taille> &
  InformationsSecteurAvecActiviteInfranumLocalEtabLot1 &
  LocalisationEtablissementPrincipal;

export type ReponseInformationsSecteurInfranumActiviteLocalEtabLot2<
  Taille extends CategorieTaille,
> = Taille extends "Petit"
  ? CategoriseTaille<Taille> &
      InformationsSecteurAvecActiviteInfranumLocalEtabLot2
  : CategoriseTaille<Taille> &
      InformationsSecteurAvecActiviteInfranumLocalEtabLot2 &
      LocalisationEtablissementPrincipal;

/**
 * Réponse informations serveur dans le cas des activités Infrastructure
 * Numérique sans les activités nécessitant une localisation de l'établissement
 * principal ni des services pour une Petite Entité
 */
export type ReponseInformationsSecteurInfranumAutresActivitesListees_P =
  CategoriseTaille<"Petit"> &
    InformationsSecteurInfranumAutresActivitesListees_P;

/**
 * Réponse informations serveur dans le cas des activités Infrastructure
 * Numérique sans les activités nécessitant une localisation de l'établissement
 * principal ni des services pour une Grande Entité
 */
export type ReponseInformationsSecteurInfranumAutresActivitesListees_MG =
  CategoriseTaille<"Moyen" | "Grand"> &
    InformationsSecteurInfranumAutresActivitesListees_MG;

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

export type RepInfoSecteurLocalEtab<Taille extends CategorieTaille> =
  Taille extends "Petit"
    ? ReponseInformationsSecteurLocalEtab_P
    : ReponseInformationsSecteurLocalEtab_MG;

// TODO : vérifier activités autres
export type RepInfoSecteurInfranum<Taille extends CategorieTaille> =
  | ReponseInformationsSecteurInfranumActiviteLocalServices<Taille>
  | ReponseInformationsSecteurInfranumActiviteLocalEtabLot1<Taille>
  | ReponseInformationsSecteurInfranumActiviteLocalEtabLot2<Taille>
  | ReponseInformationsSecteurInfranumAutresActivitesListees<Taille>;

export type RepInfoSecteurListes<Taille extends CategorieTaille> =
  | RepInfoSecteurInfranum<Taille>
  | RepInfoSecteurLocalEtab<Taille>
  | InformationsSecteursCompositeListe
  | InformationsAutresSecteursListes;

export type RepInfoSecteur<Taille extends CategorieTaille> =
  | RepInfoSecteurInfranum<Taille>
  | RepInfoSecteurLocalEtab<Taille>
  | InformationsSecteurComposite
  | InformationsAutresSecteursListes
  | InformationSecteurSimpleAutre;
export type RepInfoSecteurLocalises<Taille extends CategorieTaille> =
  | RepInfoSecteurInfranum<Taille>
  | RepInfoSecteurLocalEtab<Taille>;

export type InformationsSecteurPossible<Taille extends CategorieTaille> =
  RepInfoSecteur<Taille>;

export type DonneesInformationsSecteur<Taille extends CategorieTaille> = {
  secteurs: Set<RepInfoSecteur<Taille>>;
};

export type ReponseInformationsSecteur<Taille extends CategorieTaille> =
  CategoriseTaille<Taille> & DonneesInformationsSecteur<Taille>;

export type PredicatInformationSecteurPossible = (
  i: RepInfoSecteur<CategorieTaille>,
) => boolean;

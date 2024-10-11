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
} from "./InformationsSecteur.definitions";
import { LocalisationEtablissementPrincipal, LocalisationsServices } from "./LocalisationsActivites.definitions";
import { CategorieTaille, CategoriseTaille } from "./ReponseStructure.definitions";

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

export type ReponseInformationsSecteurInfranumAutresActivitesListees_P =
  CategoriseTaille<"Petit"> &
    InformationsSecteurInfranumAutresActivitesListees_P;

export type ReponseInformationsSecteurInfranumAutresActivitesListees_MG =
  CategoriseTaille<"Moyen" | "Grand"> &
    InformationsSecteurInfranumAutresActivitesListees_MG;

export type ReponseInformationsSecteurInfranumAutresActivitesListees<
  Taille extends CategorieTaille,
> = Taille extends "Petit"
  ? ReponseInformationsSecteurInfranumAutresActivitesListees_P
  : ReponseInformationsSecteurInfranumAutresActivitesListees_MG;

export type ReponseInformationsSecteurLocalEtab_P = CategoriseTaille<"Petit"> &
  InformationsSecteurLocalEtab;

export type ReponseInformationsSecteurLocalEtab_MG = CategoriseTaille<
  "Moyen" | "Grand"
> &
  InformationsSecteurLocalEtab &
  LocalisationEtablissementPrincipal;

export type RepInfoSecteurLocalEtab<Taille extends CategorieTaille> =
  Taille extends "Petit"
    ? ReponseInformationsSecteurLocalEtab_P
    : ReponseInformationsSecteurLocalEtab_MG;

export type RepInfoSecteurInfranum<Taille extends CategorieTaille> =
  | ReponseInformationsSecteurInfranumActiviteLocalServices<Taille>
  | ReponseInformationsSecteurInfranumActiviteLocalEtabLot1<Taille>
  | ReponseInformationsSecteurInfranumActiviteLocalEtabLot2<Taille>
  | ReponseInformationsSecteurInfranumAutresActivitesListees<Taille>;


export type RepInfoSecteur<Taille extends CategorieTaille> =
  | RepInfoSecteurInfranum<Taille>
  | RepInfoSecteurLocalEtab<Taille>
  | InformationsSecteurComposite
  | InformationsAutresSecteursListes
  | InformationSecteurSimpleAutre;

export type InformationsSecteurPossible<Taille extends CategorieTaille> =
  RepInfoSecteur<Taille>;

export type DonneesInformationsSecteur<Taille extends CategorieTaille> = {
  secteurs: Set<RepInfoSecteur<Taille>>;
};

export type ReponseInformationsSecteur<Taille extends CategorieTaille> =
  CategoriseTaille<Taille> & DonneesInformationsSecteur<Taille>;

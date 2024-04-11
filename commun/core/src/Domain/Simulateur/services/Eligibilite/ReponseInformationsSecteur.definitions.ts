import {
  ActiviteInfranumLocalEtabLot1,
  ActiviteInfranumLocalEtabLot2,
  ActiviteInfranumLocalServices,
  ActivitesPourSecteur,
} from "../../Activite.definitions";
import {
  InformationsAutresSecteursListes,
  InformationSecteurSimpleAutre,
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

export type RepInfoSecteurLocalEtab<Taille extends CategorieTaille> =
  Taille extends "Petit"
    ? CategoriseTaille<"Petit"> & InformationsSecteurLocalEtab
    : CategoriseTaille<"Moyen" | "Grand"> &
        InformationsSecteurLocalEtab &
        LocalisationEtablissementPrincipal;

type ActiviteInfranumNonLocalisee<Taille extends CategorieTaille> =
  Taille extends "Petit"
    ? InformationsSecteurInfranumAutresActivitesListees_P
    : InformationsSecteurInfranumAutresActivitesListees_MG;

type LocalisationEtablissementPrincipalPourLot2<
  Taille extends CategorieTaille,
> = Taille extends "Petit" ? never : LocalisationEtablissementPrincipal;

type ActiviteInfranumLocalServicesSansLocalisationEtablissement =
  | Extract<
      ActivitesPourSecteur["infrastructureNumerique"],
      ActiviteInfranumLocalServices
    >
  | Exclude<
      ActivitesPourSecteur["infrastructureNumerique"],
      ActiviteInfranumLocalEtabLot2 | ActiviteInfranumLocalEtabLot1
    >;

type ActiviteInfranumLocalEtabLot1SansLocalisationLot2EtService =
  | Extract<
      ActivitesPourSecteur["infrastructureNumerique"],
      ActiviteInfranumLocalEtabLot1
    >
  | Exclude<
      ActivitesPourSecteur["infrastructureNumerique"],
      ActiviteInfranumLocalServices | ActiviteInfranumLocalEtabLot2
    >;
type ActiviteInfranumLocalEtabSansLocalisationService =
  | Extract<
      ActivitesPourSecteur["infrastructureNumerique"],
      ActiviteInfranumLocalEtabLot1 | ActiviteInfranumLocalEtabLot2
    >
  | Exclude<
      ActivitesPourSecteur["infrastructureNumerique"],
      ActiviteInfranumLocalServices | ActiviteInfranumLocalEtabLot1
    >;
export type RepInfoSecteurInfranum<Taille extends CategorieTaille> =
  CategoriseTaille<Taille> &
    (
      | ({
          secteurActivite: "infrastructureNumerique";
          activites: Set<ActiviteInfranumLocalServicesSansLocalisationEtablissement>;
        } & LocalisationsServices)
      | ({
          secteurActivite: "infrastructureNumerique";
          activites: Set<
            | ActiviteInfranumLocalServicesSansLocalisationEtablissement
            | ActiviteInfranumLocalEtabLot1SansLocalisationLot2EtService
          >;
        } & LocalisationsServices &
          LocalisationEtablissementPrincipal)
      | ({
          secteurActivite: "infrastructureNumerique";
          activites: Set<
            | ActiviteInfranumLocalServicesSansLocalisationEtablissement
            | ActiviteInfranumLocalEtabSansLocalisationService
          >;
        } & LocalisationsServices &
          LocalisationEtablissementPrincipal)
      | ({
          secteurActivite: "infrastructureNumerique";
          activites: Set<ActiviteInfranumLocalEtabLot1SansLocalisationLot2EtService>;
        } & LocalisationEtablissementPrincipal)
      | ({
          secteurActivite: "infrastructureNumerique";
          activites: Set<ActiviteInfranumLocalEtabSansLocalisationService>;
        } & LocalisationEtablissementPrincipalPourLot2<Taille>)
      | ActiviteInfranumNonLocalisee<Taille>
    );

export type RepInfoSecteurLocalises<Taille extends CategorieTaille> =
  | RepInfoSecteurInfranum<Taille>
  | RepInfoSecteurLocalEtab<Taille>;

export type RepInfoSecteurListes<Taille extends CategorieTaille> =
  | RepInfoSecteurLocalises<Taille>
  | InformationsSecteursCompositeListe
  | InformationsAutresSecteursListes;

export type RepInfoSecteur<Taille extends CategorieTaille> =
  | RepInfoSecteurLocalises<Taille>
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

export type PredicatInformationSecteurPossible = (
  i: RepInfoSecteur<CategorieTaille>,
) => boolean;

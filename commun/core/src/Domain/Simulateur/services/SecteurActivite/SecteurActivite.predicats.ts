import {
  SecteurActivite,
  SecteurAvecActivitesEssentielles,
  SecteurAvecBesoinLocalisationRepresentant,
  SecteursAvecSousSecteurs,
  SecteursSansBesoinLocalisationRepresentant,
} from "../../SecteurActivite.definitions";
import {
  ValeursSecteurAvecActivitesEssentielles,
  ValeursSecteursAvecBesoinLocalisationRepresentant,
  ValeursSecteursAvecSousSecteurs,
  ValeursSecteursImportantsAvecBesoinLocalisation,
} from "../../SecteurActivite.valeurs";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { sousSecteursParSecteur } from "../../SousSecteurActivite.valeurs";

export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(secteur as SecteursAvecSousSecteurs);

export const filtreSecteursAvecSousSecteurs = (secteur: SecteurActivite[]) =>
  secteur.filter(estUnSecteurAvecDesSousSecteurs) as SecteursAvecSousSecteurs[];
export const estUnSecteurSansDesSousSecteurs = (secteur: string) => {
  return !ValeursSecteursAvecSousSecteurs?.includes(
    secteur as SecteursAvecSousSecteurs,
  );
};
export const estSecteur =
  (secteurReference: SecteurActivite) => (secteurCompare: SecteurActivite) =>
    secteurReference === secteurCompare;
export const estSecteurListe = (secteur: SecteurActivite) =>
  !secteur.startsWith("autre");
export const estSecteurAutre = (secteur: SecteurActivite) =>
  secteur.startsWith("autre");
export const contientSousSecteur = (
  secteur: string,
  sousSecteur: SousSecteurActivite,
) =>
  sousSecteursParSecteur[secteur as SecteursAvecSousSecteurs].includes(
    sousSecteur,
  );
export const auMoinsUnSecteurListe = (
  secteurs: SecteurActivite[],
): secteurs is SecteurActivite[] =>
  secteurs.length > 0 && secteurs.some(estSecteurListe);

export const uniquementDesSecteursAutres = (
  secteurs: SecteurActivite[],
): secteurs is SecteurActivite[] =>
  secteurs.length > 0 && secteurs.every(estSecteurAutre);

export const estUnSecteurSansSousSecteur = (secteur: string) =>
  !(ValeursSecteursAvecSousSecteurs as readonly string[]).includes(secteur);

const predicatSecteurDansListe = (
  secteursFiltre: SecteurActivite[],
  secteurCherche: string,
) => secteursFiltre.some((secteur) => secteur == secteurCherche);

export const estSecteurParmi =
  (secteurCherche: SecteurActivite) => (secteursFiltre: SecteurActivite[]) =>
    predicatSecteurDansListe(secteursFiltre, secteurCherche);

/**
 * Vérifie si secteur n'est pas dans:
 *   "infrastructureNumerique",
 *   "gestionServicesTic",
 *   "fournisseursNumeriques",
 * @param secteur
 */
export const estSecteurNeNecessitantPasLocalisationRepresentant = (
  secteur: SecteursSansBesoinLocalisationRepresentant | SecteurActivite,
): secteur is SecteursSansBesoinLocalisationRepresentant =>
  !ValeursSecteursAvecBesoinLocalisationRepresentant.includes(
    secteur as SecteurAvecBesoinLocalisationRepresentant,
  );
export const estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite = <
  T extends SecteurActivite,
>(
  secteur: T | SecteurAvecActivitesEssentielles,
) =>
  !ValeursSecteurAvecActivitesEssentielles.includes(
    secteur as (typeof ValeursSecteurAvecActivitesEssentielles)[number],
  );
export const estSecteurImportantsAvecBesoinLocalisation = (
  secteur: SecteurActivite,
) =>
  ValeursSecteursImportantsAvecBesoinLocalisation.includes(
    secteur as (typeof ValeursSecteursImportantsAvecBesoinLocalisation)[number],
  );
/**
 *   "infrastructureNumerique",
 * @param secteur
 */
export const estSecteurAvecActivitesEssentielles = (
  secteur: SecteurActivite | SecteurAvecActivitesEssentielles,
): secteur is SecteurAvecActivitesEssentielles =>
  ValeursSecteurAvecActivitesEssentielles.includes(
    secteur as (typeof ValeursSecteurAvecActivitesEssentielles)[number],
  );

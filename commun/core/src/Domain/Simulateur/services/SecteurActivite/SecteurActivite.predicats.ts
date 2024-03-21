import {
  SecteurActivite,
  SecteurInfrastructureNumerique,
  SecteurAvecBesoinLocalisationRepresentant,
  SecteurComposite,
  SecteursSansBesoinLocalisationRepresentant,
} from "../../SecteurActivite.definitions";
import {
  ValeurSecteurInfrastructureNumerique,
  ValeursSecteursAvecBesoinLocalisationRepresentant,
  ValeursSecteursComposites,
  ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal,
} from "../../SecteurActivite.valeurs";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { sousSecteursParSecteur } from "../../SousSecteurActivite.valeurs";

export const estUnSecteurAvecDesSousSecteurs = (
  secteur: string,
): secteur is SecteurComposite =>
  ValeursSecteursComposites.includes(secteur as SecteurComposite);

export const filtreSecteursAvecSousSecteurs = (secteur: SecteurActivite[]) =>
  secteur.filter(estUnSecteurAvecDesSousSecteurs) as SecteurComposite[];
export const estUnSecteurSansDesSousSecteurs = (secteur: string) => {
  return !ValeursSecteursComposites?.includes(secteur as SecteurComposite);
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
) => sousSecteursParSecteur[secteur as SecteurComposite].includes(sousSecteur);
export const auMoinsUnSecteurListe = (
  secteurs: SecteurActivite[],
): secteurs is SecteurActivite[] =>
  secteurs.length > 0 && secteurs.some(estSecteurListe);

export const uniquementDesSecteursAutres = (
  secteurs: SecteurActivite[],
): secteurs is SecteurActivite[] =>
  secteurs.length > 0 && secteurs.every(estSecteurAutre);

export const estUnSecteurSansSousSecteur = (secteur: string) =>
  !(ValeursSecteursComposites as readonly string[]).includes(secteur);

const predicatSecteurDansListe = (
  secteursFiltre: SecteurActivite[],
  secteurCherche: string,
) => secteursFiltre.some((secteur) => secteur == secteurCherche);

export const estSecteurParmi =
  (secteurCherche: SecteurActivite) => (secteursFiltre: SecteurActivite[]) =>
    predicatSecteurDansListe(secteursFiltre, secteurCherche);
export const estSecteurDansListe =
  (secteursFiltre: SecteurActivite[]) => (secteurCherche: SecteurActivite) =>
    predicatSecteurDansListe(secteursFiltre, secteurCherche);

/**
 * Vérifie si secteur n'est pas dans :
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
  secteur: T | SecteurInfrastructureNumerique,
) =>
  !ValeurSecteurInfrastructureNumerique.includes(
    secteur as (typeof ValeurSecteurInfrastructureNumerique)[number],
  );
export const estSecteurImportantsAvecBesoinLocalisation = (
  secteur: SecteurActivite,
) =>
  ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal.includes(
    secteur as (typeof ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal)[number],
  );
/**
 *   "infrastructureNumerique",
 * @param secteur
 */
export const estSecteurAvecActivitesEssentielles = (
  secteur: SecteurActivite | SecteurInfrastructureNumerique,
): secteur is SecteurInfrastructureNumerique =>
  ValeurSecteurInfrastructureNumerique.includes(
    secteur as (typeof ValeurSecteurInfrastructureNumerique)[number],
  );

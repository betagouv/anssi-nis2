import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import {
  SecteurActivite,
  SecteurAvecBesoinLocalisationRepresentant,
  SecteurAvecBesoinLocalisationRepresentantPetiteEntite,
  SecteursAvecSousSecteurs,
  SecteursSansBesoinLocalisationRepresentant,
} from "../../SecteurActivite.definitions";
import {
  ValeursSecteursAvecSousSecteurs,
  ValeursSecteursNecessitantLocalisationRepresentant,
  ValeursSecteurAvecBesoinLocalisationRepresentantPetiteEntite,
} from "../../SecteurActivite.valeurs";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { sousSecteursParSecteur } from "../../SousSecteurActivite.valeurs";

export const contientAutreSecteurActiviteUniquement = (
  donneesFormulaire: DonneesFormulaireSimulateur,
) =>
  donneesFormulaire.secteurActivite.length === 1 &&
  donneesFormulaire.secteurActivite[0] === "autreSecteurActivite";
export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(secteur as SecteursAvecSousSecteurs);

export const filtreSecteursAvecSousSecteurs = (secteur: SecteurActivite[]) =>
  secteur.filter(estUnSecteurAvecDesSousSecteurs) as SecteursAvecSousSecteurs[];
export const estUnSecteurSansDesSousSecteurs = (secteur: string) => {
  return !ValeursSecteursAvecSousSecteurs?.includes(
    secteur as SecteursAvecSousSecteurs,
  );
};
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

export const estSecteurNeNecessitantPasLocalisationRepresentant = (
  secteur: SecteursSansBesoinLocalisationRepresentant | SecteurActivite,
): secteur is SecteursSansBesoinLocalisationRepresentant =>
  !ValeursSecteursNecessitantLocalisationRepresentant.includes(
    secteur as SecteurAvecBesoinLocalisationRepresentant,
  );
export const estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite = <
  T extends SecteurActivite,
>(
  secteur: T | SecteurAvecBesoinLocalisationRepresentantPetiteEntite,
): secteur is SecteurAvecBesoinLocalisationRepresentantPetiteEntite =>
  !ValeursSecteurAvecBesoinLocalisationRepresentantPetiteEntite.includes(
    secteur as (typeof ValeursSecteurAvecBesoinLocalisationRepresentantPetiteEntite)[number],
  );
export const estSecteurNecessitantLocalisationRepresentantPetiteEntite = (
  secteur: SecteurActivite,
) =>
  ValeursSecteurAvecBesoinLocalisationRepresentantPetiteEntite.includes(
    secteur as (typeof ValeursSecteurAvecBesoinLocalisationRepresentantPetiteEntite)[number],
  );

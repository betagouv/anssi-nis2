import { Activites } from "../../Activite.definitions";
import { ValeurChampSimulateur } from "../../ChampsSimulateur.definitions";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../DonneesFormulaire";
import { SecteursAvecSousSecteurs } from "../../SousSecteurActivite.definitions";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions";
import { activiteEstDansSecteur } from "../Activite/Activite.predicats";
import { filtreSecteursSansSousSecteurs } from "../SecteurActivite/SecteurActivite.operations";
import {
  estSecteurListe,
  filtreSecteursAvecSousSecteurs,
} from "../SecteurActivite/SecteurActivite.predicats";
import {
  estSousSecteurAutre,
  estSousSecteurListe,
  sousSecteurAppartientASecteur,
} from "../SousSecteurActivite/SousSecteurActivite.predicats";
import { fabriqueListeValeursSectorielles } from "../ValeursSectorielles/ValeursSectorielles.operations";
import { PredicatChamp } from "./champs.domaine";

const appliqueValidateur: (
  donnees: DonneesFormulaireSimulateur,
) => (validateur: PredicatChamp) => boolean = (donnees) => (validateur) =>
  validateur(donnees);
export const et: (...validateurs: Array<PredicatChamp>) => PredicatChamp =
  (...validateurs) =>
  (donnees) =>
    validateurs.every(appliqueValidateur(donnees));

export const ou: (...validateurs: Array<PredicatChamp>) => PredicatChamp =
  (...validateurs) =>
  (donnees) =>
    validateurs.some(appliqueValidateur(donnees));

export const oux: (...validateurs: Array<PredicatChamp>) => PredicatChamp =
  (...validateurs) =>
  (donnees) =>
    validateurs.filter(appliqueValidateur(donnees)).length === 1;

export const non: (validateur: PredicatChamp) => PredicatChamp =
  (validateur) => (d) =>
    !validateur(d);

export const lorsque: (
  champ: NomsChampsSimulateur,
  valeur: ValeurChampSimulateur,
  predicat: PredicatChamp,
) => PredicatChamp =
  (champ, valeur, predicat) => (donnees: DonneesFormulaireSimulateur) =>
    donnees[champ][0] != valeur || predicat(donnees);

export const estChaineNonVide = <T extends string>(listeValeurs: T) =>
  listeValeurs.length > 0;

export const auMoinsN = (
  n: number,
  nomChamp: NomsChampsSimulateur,
  fonctionNommee = `auMoinsN_${n}_${nomChamp}`,
) =>
  ({
    [fonctionNommee]: (donnees: DonneesFormulaireSimulateur) =>
      donnees[nomChamp].filter(estChaineNonVide).length > n - 1,
  })[fonctionNommee];

export const exactementN = (
  n: number,
  nomChamp: NomsChampsSimulateur,
  fonctionNommee = `exactement_${n}_${nomChamp}`,
) =>
  ({
    [fonctionNommee]: (donnees: DonneesFormulaireSimulateur) =>
      donnees[nomChamp].filter(estChaineNonVide).length === n,
  })[fonctionNommee];

export const auMoinsUn = (nomChamp: NomsChampsSimulateur) =>
  auMoinsN(1, nomChamp);
export const exactementUn = (nomChamp: NomsChampsSimulateur) =>
  exactementN(1, nomChamp);

const collecteValidateursParSecteurAvecSousSecteur = (
  valeursSecteur: SecteursAvecSousSecteurs[],
) => valeursSecteur.map(sousSecteurAppartientASecteur);

const construitPredicatToutSousSecteur = (
  valeursSecteur: SecteursAvecSousSecteurs[],
) =>
  et(
    ...collecteValidateursParSecteurAvecSousSecteur(valeursSecteur),
    auMoinsN(valeursSecteur.length, "sousSecteurActivite"),
  );

export const auMoinsUnSousSecteurParSecteur: PredicatChamp = (
  donneesFormulaireSimulateur,
) =>
  construitPredicatToutSousSecteur(
    filtreSecteursAvecSousSecteurs(donneesFormulaireSimulateur.secteurActivite),
  )(donneesFormulaireSimulateur);

const auMoinsUneActiviteEstDansSecteur =
  (activites: Activites[]) => (secteurActivite: ValeurCleSectorielle) =>
    activites.some(activiteEstDansSecteur(secteurActivite));

const fabriqueAuMoinsUneActiviteEstDansSecteur = (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => auMoinsUneActiviteEstDansSecteur(donneesFormulaireSimulateur.activites);

export const auMoinsUneActiviteParValeurSectorielleListee: PredicatChamp = (
  donneesFormulaireSimulateur,
) =>
  fabriqueListeValeursSectorielles(
    filtreSecteursSansSousSecteurs(
      donneesFormulaireSimulateur.secteurActivite,
    ).filter(estSecteurListe),
    donneesFormulaireSimulateur.sousSecteurActivite.filter(estSousSecteurListe),
  ).every(
    fabriqueAuMoinsUneActiviteEstDansSecteur(donneesFormulaireSimulateur),
  );

export const contientSousSecteurAutresUniquement = (
  donneesFormulaire: DonneesFormulaireSimulateur,
) =>
  donneesFormulaire.sousSecteurActivite.length > 0 &&
  donneesFormulaire.sousSecteurActivite.every(estSousSecteurAutre);

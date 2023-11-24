import {
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { SecteursAvecSousSecteurs } from "anssi-nis2-domain/src/Simulateur/SousSecteurActivite.definitions";
import { PredicatChamp } from "./champs.domaine";
import {
  estSousSecteurAutre,
  sousSecteurAppartientASecteur,
} from "../SousSecteurActivite/SousSecteurActivite.predicats";
import { ValeurChampSimulateur } from "../../ChampsSimulateur.definitions";
import { ValeursActivites } from "anssi-nis2-domain/src/Simulateur/Activite.definitions";
import { activiteEstDansSecteur } from "../Activite/Activite.predicats";
import { filtreSecteursSansSousSecteurs } from "../SecteurActivite/SecteurActivite.operations";
import { filtreSecteursAvecSousSecteurs } from "../SecteurActivite/SecteurActivite.predicats";
import { ValeurCleSectorielle } from "anssi-nis2-domain/src/Simulateur/ValeurCleSectorielle.definitions";
import { fabriqueListeValeursSectorielles } from "../ValeursSectorielles/ValeursSectorielles.operations";

const appliqueValidateur: (
  donnees: IDonneesBrutesFormulaireSimulateur,
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

export const lorsque: (
  champ: NomsChampsSimulateur,
  valeur: ValeurChampSimulateur,
  predicat: PredicatChamp,
) => PredicatChamp =
  (champ, valeur, predicat) => (donnees: IDonneesBrutesFormulaireSimulateur) =>
    donnees[champ][0] != valeur || predicat(donnees);

export const estChaineNonVide = <T extends string>(listeValeurs: T) =>
  listeValeurs.length > 0;

export const auMoinsN = (
  n: number,
  nomChamp: NomsChampsSimulateur,
  fonctionNommee = `auMoinsN_${n}_${nomChamp}`,
) =>
  ({
    [fonctionNommee]: (donnees: IDonneesBrutesFormulaireSimulateur) =>
      donnees[nomChamp].filter(estChaineNonVide).length > n - 1,
  })[fonctionNommee];

export const exactementN = (
  n: number,
  nomChamp: NomsChampsSimulateur,
  fonctionNommee = `exactement_${n}_${nomChamp}`,
) =>
  ({
    [fonctionNommee]: (donnees: IDonneesBrutesFormulaireSimulateur) =>
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

const auMoinsUneActiviteEstDansSecteur = (
  activites: ValeursActivites[],
  secteurActivite: ValeurCleSectorielle,
) =>
  activites.some((activite) =>
    activiteEstDansSecteur(activite, secteurActivite),
  );

const fabriqueAuMoinsUneActiviteEstDansSecteur =
  (donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur) =>
  (secteurActivite: ValeurCleSectorielle) =>
    auMoinsUneActiviteEstDansSecteur(
      donneesFormulaireSimulateur.activites,
      secteurActivite,
    );

export const auMoinsUneActiviteParValeurSectorielle: PredicatChamp = (
  donneesFormulaireSimulateur,
) =>
  fabriqueListeValeursSectorielles(
    filtreSecteursSansSousSecteurs(donneesFormulaireSimulateur.secteurActivite),
    donneesFormulaireSimulateur.sousSecteurActivite,
  ).every(
    fabriqueAuMoinsUneActiviteEstDansSecteur(donneesFormulaireSimulateur),
  );

export const contientSousSecteurAutresUniquement = (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) =>
  donneesFormulaire.sousSecteurActivite.length > 0 &&
  donneesFormulaire.sousSecteurActivite.every(estSousSecteurAutre);

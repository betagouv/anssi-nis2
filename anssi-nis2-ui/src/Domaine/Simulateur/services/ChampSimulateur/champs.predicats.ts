import {
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../DonneesFormulaire.ts";
import { SecteursAvecSousSecteurs } from "../../SousSecteurActivite.definitions.ts";
import { PredicatChamp } from "./champs.domaine.ts";
import {
  estSousSecteurAutre,
  estSousSecteurListe,
  sousSecteurAppartientASecteur,
} from "../SousSecteurActivite/SousSecteurActivite.predicats.ts";
import { ValeurChampSimulateur } from "../../ChampsSimulateur.definitions.ts";
import { ValeursActivites } from "../../Activite.definitions.ts";
import { activiteEstDansSecteur } from "../Activite/Activite.predicats.ts";
import { filtreSecteursSansSousSecteurs } from "../SecteurActivite/SecteurActivite.operations.ts";
import { estSecteurListe, filtreSecteursAvecSousSecteurs } from "../SecteurActivite/SecteurActivite.predicats.ts";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions.ts";
import { fabriqueListeValeursSectorielles } from "./ValeursSectorielles/ValeursSectorielles.operations.ts";

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

export const auMoinsUneActiviteParValeurSectorielleListee: PredicatChamp = (
  donneesFormulaireSimulateur,
) =>
  fabriqueListeValeursSectorielles(
    filtreSecteursSansSousSecteurs(donneesFormulaireSimulateur.secteurActivite).filter(estSecteurListe),
    donneesFormulaireSimulateur.sousSecteurActivite.filter(estSousSecteurListe),
  ).every(
    fabriqueAuMoinsUneActiviteEstDansSecteur(donneesFormulaireSimulateur),
  );

export const contientSousSecteurAutresUniquement = (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) =>
  donneesFormulaire.sousSecteurActivite.length > 0 &&
  donneesFormulaire.sousSecteurActivite.every(estSousSecteurAutre);

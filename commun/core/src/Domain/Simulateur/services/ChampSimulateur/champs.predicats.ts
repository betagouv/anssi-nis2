import * as Predic from "../../../../../../utils/services/commun.predicats";
import { estChaineNonVide } from "../../../../../../utils/services/string.operations";
import { Activite } from "../../Activite.definitions";
import { activiteEstDansSecteur } from "../../Activite.predicats";
import { ValeurChampSimulateur } from "../../ChampsSimulateur.definitions";
import { SecteurComposite } from "../../SecteurActivite.definitions";
import { SousSecteurListes } from "../../SousSecteurActivite.definitions";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../DonneesFormulaire/DonneesFormulaire.definitions";
import { filtreSecteursSansSousSecteurs } from "../SecteurActivite/SecteurActivite.operations";
import {
  estSecteurListe,
  filtreSecteursAvecSousSecteurs,
} from "../SecteurActivite/SecteurActivite.predicats";
import {
  estSousSecteurListe,
  sousSecteurAppartientASecteur,
} from "../SousSecteurActivite/SousSecteurActivite.predicats";
import { fabriqueListeValeursSectorielles } from "../ValeursSectorielles/ValeursSectorielles.operations";
import { PredicatDonneesFormulaire } from "./champs.domaine";

export const lorsque: (
  champ: NomsChampsSimulateur,
  valeur: ValeurChampSimulateur,
  predicat: PredicatDonneesFormulaire
) => PredicatDonneesFormulaire =
  (champ, valeur, predicat) => (donnees: DonneesFormulaireSimulateur) =>
    donnees[champ][0] != valeur || predicat(donnees);

export const auMoinsN = (
  n: number,
  nomChamp: NomsChampsSimulateur,
  fonctionNommee = `auMoinsN_${n}_${nomChamp}`
) =>
  ({
    [fonctionNommee]: (donnees: DonneesFormulaireSimulateur) =>
      donnees[nomChamp].filter(estChaineNonVide).length > n - 1,
  }[fonctionNommee]);

export const exactementN = (
  n: number,
  nomChamp: NomsChampsSimulateur,
  fonctionNommee = `exactement_${n}_${nomChamp}`
) =>
  ({
    [fonctionNommee]: (donnees: DonneesFormulaireSimulateur) =>
      donnees[nomChamp].filter(estChaineNonVide).length === n,
  }[fonctionNommee]);

export const auMoinsUn = (nomChamp: NomsChampsSimulateur) =>
  auMoinsN(1, nomChamp);
export const exactementUn = (nomChamp: NomsChampsSimulateur) =>
  exactementN(1, nomChamp);

const collecteValidateursParSecteurAvecSousSecteur = (
  valeursSecteur: SecteurComposite[]
) => valeursSecteur.map(sousSecteurAppartientASecteur);

const construitPredicatToutSousSecteur = (valeursSecteur: SecteurComposite[]) =>
  Predic.et(
    ...collecteValidateursParSecteurAvecSousSecteur(valeursSecteur),
    auMoinsN(valeursSecteur.length, "sousSecteurActivite")
  );

export const auMoinsUnSousSecteurParSecteur: PredicatDonneesFormulaire = (
  donneesFormulaireSimulateur
) =>
  construitPredicatToutSousSecteur(
    filtreSecteursAvecSousSecteurs(donneesFormulaireSimulateur.secteurActivite)
  )(donneesFormulaireSimulateur);

const auMoinsUneActiviteEstDansSecteur =
  (activites: Activite[]) => (secteurActivite: ValeurCleSectorielle) =>
    activites.some(activiteEstDansSecteur(secteurActivite));

const fabriqueAuMoinsUneActiviteEstDansSecteur = (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur
) => auMoinsUneActiviteEstDansSecteur(donneesFormulaireSimulateur.activites);

export const auMoinsUneActiviteParValeurSectorielleListee: PredicatDonneesFormulaire =
  (donneesFormulaireSimulateur) =>
    fabriqueListeValeursSectorielles(
      filtreSecteursSansSousSecteurs(
        donneesFormulaireSimulateur.secteurActivite
      ).filter(estSecteurListe),
      donneesFormulaireSimulateur.sousSecteurActivite.filter(
        estSousSecteurListe
      ) as SousSecteurListes[]
    ).every(
      fabriqueAuMoinsUneActiviteEstDansSecteur(donneesFormulaireSimulateur)
    );

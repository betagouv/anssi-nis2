import {
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../DonneesFormulaire.ts";
import { SecteursAvecSousSecteurs } from "../../SousSecteurActivite.definitions.ts";
import { PredicatChamp } from "./champs.domaine.ts";
import { SecteurActivite } from "../../SecteurActivite.definitions.ts";
import {
  estSousSecteurAutre,
  sousSecteurAppartientASecteur,
} from "../SousSecteurActivite/SousSecteurActivite.predicats.ts";
import {
  ValeurChampSimulateur,
  ValeurCleSectorielle,
} from "../../ChampsSimulateur.definitions.ts";
import { ValeursActivites } from "../../Activite.definitions.ts";
import { activiteEstDansSecteur } from "../Activite/Activite.predicats.ts";
import { filtreSecteursSansSousSecteurs } from "../SecteurActivite/SecteurActivite.operations.ts";

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

export const auMoinsN =
  (n: number, nomChamp: NomsChampsSimulateur) =>
  (donnees: IDonneesBrutesFormulaireSimulateur) =>
    donnees[nomChamp].filter(estChaineNonVide).length > n - 1;

export const auMoinsUn = (nomChamp: NomsChampsSimulateur) =>
  auMoinsN(1, nomChamp);

export const auMoinsUnSousSecteurParSecteur: PredicatChamp = (
  donneesFormulaireSimulateur,
) => {
  const valeursSecteur: SecteurActivite[] =
    donneesFormulaireSimulateur.secteurActivite;
  const validateursParGroupe = valeursSecteur.map((valeur) =>
    sousSecteurAppartientASecteur(valeur as SecteursAvecSousSecteurs),
  );
  const validateur = et(
    ...validateursParGroupe,
    auMoinsN(
      donneesFormulaireSimulateur.secteurActivite.length,
      "sousSecteurActivite",
    ),
  );
  return validateur(donneesFormulaireSimulateur);
};

const auMoinsUneActiviteEstDansSecteur = (
  activites: ValeursActivites[],
  secteurActivite: ValeurCleSectorielle,
) => {
  return activites.some((activite) =>
    activiteEstDansSecteur(activite, secteurActivite),
  );
};

function fabriqueAuMoinsUneActiviteEstDansSecteur(
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
) {
  return (secteurActivite: ValeurCleSectorielle) =>
    auMoinsUneActiviteEstDansSecteur(
      donneesFormulaireSimulateur.activites,
      secteurActivite,
    );
}

export const auMoinsUneActiviteParValeurSectorielle: PredicatChamp = (
  donneesFormulaireSimulateur,
) => {
  const secteursEtSousSecteurs: ValeurCleSectorielle[] = [
    ...filtreSecteursSansSousSecteurs(
      donneesFormulaireSimulateur.secteurActivite,
    ),
    ...donneesFormulaireSimulateur.sousSecteurActivite,
  ];
  return secteursEtSousSecteurs.every(
    fabriqueAuMoinsUneActiviteEstDansSecteur(donneesFormulaireSimulateur),
  );
};

export const contientSousSecteurAutresUniquement = (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) =>
  donneesFormulaire.sousSecteurActivite.length > 0 &&
  donneesFormulaire.sousSecteurActivite.every(estSousSecteurAutre);

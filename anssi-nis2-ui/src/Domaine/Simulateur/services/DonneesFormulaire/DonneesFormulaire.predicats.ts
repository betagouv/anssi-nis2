import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";
import {
  auMoinsUneActiviteListee,
  estActiviteAutre,
} from "../Activite/Activite.predicats.ts";
import { match, isMatching, P } from "ts-pattern";
import {
  auMoinsUnSecteurListe,
  uniquementDesSecteursAutres,
} from "../SecteurActivite/SecteurActivite.predicats.ts";
import { uniquementDesSousSecteursAutres } from "../SousSecteurActivite/SousSecteurActivite.predicats.ts";
import {
  auMoinsUn,
  et,
  exactementUn,
} from "../ChampSimulateur/champs.predicats.ts";

const verifAuMoinsUn = {
  activiteListee: (donnees: IDonneesBrutesFormulaireSimulateur) =>
    auMoinsUneActiviteListee(donnees.activites),
};

export const predicatDonneesFormulaire = {
  auMoins: {
    un: verifAuMoinsUn,
    une: verifAuMoinsUn,
  },
  uniquement: {
    activiteAutre: (donnees: IDonneesBrutesFormulaireSimulateur) =>
      donnees.activites.every(estActiviteAutre),
  },
};
const toujoursVrai = () => true;
const toujoursFaux = () => false;
const tableauNonVide = <T>(tableau: T[]) => tableau.length > 0;
export const verifieCompletudeDonneesCommunes = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  et(
    exactementUn("designeOperateurServicesEssentiels"),
    exactementUn("etatMembre"),
    exactementUn("trancheNombreEmployes"),
    exactementUn("typeStructure"),
    auMoinsUn("secteurActivite"),
  )(donnees);

export const verifieDonneesCommunesPrivee: (
  donnees: IDonneesBrutesFormulaireSimulateur,
) => boolean = isMatching({
  trancheCA: [P._],
  typeStructure: ["privee"],
});
export const verifieDonneesCommunesPublique = isMatching({
  typeStructure: ["publique"],
  typeEntitePublique: [P._],
});

const verifieDonneesSectorielles = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  match<IDonneesBrutesFormulaireSimulateur, boolean>(donnees)
    .with(
      {
        secteurActivite: P.when(uniquementDesSecteursAutres),
        sousSecteurActivite: P.array(),
        activites: P.array(),
      },
      toujoursVrai,
    )
    .with(
      {
        secteurActivite: P.when(auMoinsUnSecteurListe),
        sousSecteurActivite: P.when(uniquementDesSousSecteursAutres),
        activites: P.array(),
      },
      toujoursVrai,
    )
    .with(
      {
        secteurActivite: P.when(auMoinsUnSecteurListe),
        sousSecteurActivite: P.array(),
        activites: P.when(tableauNonVide),
      },
      toujoursVrai,
    )
    .otherwise(toujoursFaux);

export const verifieCompletudeDonneesFormulairePrivee = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  verifieDonneesCommunesPrivee(donnees) && verifieDonneesSectorielles(donnees);
export const verifieCompletudeDonneesFormulairePublique = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  verifieDonneesCommunesPublique(donnees) &&
  verifieDonneesSectorielles(donnees);
export const verifieCompletudeDonneesFormulaire = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  verifieCompletudeDonneesCommunes(donnees) &&
  (verifieCompletudeDonneesFormulairePrivee(donnees) ||
    verifieCompletudeDonneesFormulairePublique(donnees));

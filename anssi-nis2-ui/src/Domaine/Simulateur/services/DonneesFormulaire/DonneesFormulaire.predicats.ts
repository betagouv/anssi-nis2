import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";
import {
  auMoinsUneActiviteAutre,
  auMoinsUneActiviteListee,
  estActiviteAutre,
} from "../Activite/Activite.predicats.ts";
import { match, P } from "ts-pattern";
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
  activiteAutre: (donnees: IDonneesBrutesFormulaireSimulateur) =>
    auMoinsUneActiviteAutre(donnees.activites),
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

export const verifieCompletudeDonneesFormulairePrivee = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  match<IDonneesBrutesFormulaireSimulateur, boolean>(donnees)
    .with(
      {
        trancheCA: [P._],
        typeStructure: ["privee"],
        secteurActivite: P.when(uniquementDesSecteursAutres),
        sousSecteurActivite: P.array(),
        activites: P.array(),
      },
      toujoursVrai,
    )
    .with(
      {
        trancheCA: [P._],
        typeStructure: ["privee"],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        sousSecteurActivite: P.when(uniquementDesSousSecteursAutres),
        activites: P.array(),
      },
      toujoursVrai,
    )
    .with(
      {
        trancheCA: [P._],
        typeStructure: ["privee"],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        sousSecteurActivite: P.array(),
        activites: P.when(tableauNonVide),
      },
      toujoursVrai,
    )
    .otherwise(toujoursFaux);
export const verifieCompletudeDonneesFormulairePublique = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  match<IDonneesBrutesFormulaireSimulateur, boolean>(donnees)
    .with(
      {
        typeStructure: ["publique"],
        typeEntitePublique: [P._],
        secteurActivite: P.when(uniquementDesSecteursAutres),
      },
      toujoursVrai,
    )
    .with(
      {
        typeStructure: ["publique"],
        typeEntitePublique: [P._],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        sousSecteurActivite: P.when(uniquementDesSousSecteursAutres),
      },
      toujoursVrai,
    )
    .with(
      {
        typeStructure: ["publique"],
        typeEntitePublique: [P._],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        activites: P.array(),
      },
      toujoursVrai,
    )
    .otherwise(toujoursFaux);
export const verifieCompletudeDonneesFormulaire = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  verifieCompletudeDonneesCommunes(donnees) &&
  (verifieCompletudeDonneesFormulairePrivee(donnees) ||
    verifieCompletudeDonneesFormulairePublique(donnees));

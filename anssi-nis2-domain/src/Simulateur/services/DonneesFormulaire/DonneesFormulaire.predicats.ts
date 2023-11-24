import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import {
  auMoinsUneActiviteListee,
  estActiviteAutre,
} from "../Activite/Activite.predicats";
import { match, isMatching, P } from "ts-pattern";
import {
  auMoinsUnSecteurListe,
  uniquementDesSecteursAutres,
} from "../SecteurActivite/SecteurActivite.predicats";
import { uniquementDesSousSecteursAutres } from "../SousSecteurActivite/SousSecteurActivite.predicats";
import {
  auMoinsUn,
  et,
  exactementUn,
} from "../ChampsSimulateur/champs.predicats";

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
export const donneesFormulaireSontCompletes = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  verifieCompletudeDonneesCommunes(donnees) &&
  (verifieCompletudeDonneesFormulairePrivee(donnees) ||
    verifieCompletudeDonneesFormulairePublique(donnees));

export const donneesFormulaireSontIncompletes = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) => !donneesFormulaireSontCompletes(donnees);

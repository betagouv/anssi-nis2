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
import { aucunSousSecteurListe } from "../SousSecteurActivite/SousSecteurActivite.predicats.ts";

const auMoinsUn = {
  activiteListee: (donnees: IDonneesBrutesFormulaireSimulateur) =>
    auMoinsUneActiviteListee(donnees.activites),
  activiteAutre: (donnees: IDonneesBrutesFormulaireSimulateur) =>
    auMoinsUneActiviteAutre(donnees.activites),
};

export const predicatDonneesFormulaire = {
  auMoins: {
    un: auMoinsUn,
    une: auMoinsUn,
  },
  uniquement: {
    activiteAutre: (donnees: IDonneesBrutesFormulaireSimulateur) =>
      donnees.activites.every(estActiviteAutre),
  },
};
const toujoursVrai = () => true;
const toujoursFaux = () => false;
export const verifieCompletudeDonneesFormulaire = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  match<IDonneesBrutesFormulaireSimulateur, boolean>(donnees)
    .with(
      {
        designeOperateurServicesEssentiels: [P._],
        etatMembre: [P._],
        trancheCA: [P._],
        typeStructure: ["privee"],
        trancheNombreEmployes: [P._],
        secteurActivite: P.when(uniquementDesSecteursAutres),
      },
      toujoursVrai,
    )
    .with(
      {
        designeOperateurServicesEssentiels: [P._],
        etatMembre: [P._],
        trancheCA: [P._],
        typeStructure: ["privee"],
        trancheNombreEmployes: [P._],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        sousSecteurActivite: P.when(aucunSousSecteurListe),
      },
      toujoursVrai,
    )
    .with(
      {
        designeOperateurServicesEssentiels: [P._],
        etatMembre: [P._],
        trancheCA: [P._],
        typeStructure: ["privee"],
        trancheNombreEmployes: [P._],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        activites: P.array(),
      },

      toujoursVrai,
    )
    .with(
      {
        designeOperateurServicesEssentiels: [P._],
        etatMembre: [P._],
        trancheNombreEmployes: [P._],
        typeStructure: ["publique"],
        typeEntitePublique: [P._],
        secteurActivite: P.when(uniquementDesSecteursAutres),
      },
      toujoursVrai,
    )
    .with(
      {
        designeOperateurServicesEssentiels: [P._],
        etatMembre: [P._],
        trancheNombreEmployes: [P._],
        typeStructure: ["publique"],
        typeEntitePublique: [P._],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        sousSecteurActivite: P.when(aucunSousSecteurListe),
      },
      toujoursVrai,
    )
    .with(
      {
        designeOperateurServicesEssentiels: [P._],
        etatMembre: [P._],
        trancheNombreEmployes: [P._],
        typeStructure: ["publique"],
        typeEntitePublique: [P._],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        activites: P.array(),
      },
      toujoursVrai,
    )
    .otherwise(toujoursFaux);

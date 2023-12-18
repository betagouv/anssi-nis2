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
  non,
  ou,
} from "../ChampSimulateur/champs.predicats.ts";
import { toujoursVrai } from "../../../Commun/Commun.predicats.ts";
import { toujoursFaux } from "../../../Commun/Commun.predicats.ts";
import { estTableauNonVide } from "../../../Commun/Commun.predicats.ts";

const verifAuMoinsUn = {
  activiteListee: (donnees: IDonneesBrutesFormulaireSimulateur): donnees is IDonneesBrutesFormulaireSimulateur =>
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
export const verifieCompletudeDonneesCommunes = et(
  exactementUn("designeOperateurServicesEssentiels"),
  exactementUn("etatMembre"),
  exactementUn("trancheNombreEmployes"),
  exactementUn("typeStructure"),
  auMoinsUn("secteurActivite"),
);

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
        activites: P.when(estTableauNonVide),
      },
      toujoursVrai,
    )
    .otherwise(toujoursFaux);

export const verifieCompletudeDonneesFormulairePrivee = et(
  verifieDonneesCommunesPrivee,
  verifieDonneesSectorielles,
);
export const verifieCompletudeDonneesFormulairePublique = et(
  verifieDonneesCommunesPublique,
  verifieDonneesSectorielles,
);
export const donneesFormulaireSontCompletes = et(
  verifieCompletudeDonneesCommunes,
  ou(
    verifieCompletudeDonneesFormulairePrivee,
    verifieCompletudeDonneesFormulairePublique,
  ),
);

export const donneesFormulaireSontIncompletes = non(
  donneesFormulaireSontCompletes,
);

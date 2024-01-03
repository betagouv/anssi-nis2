import { P, isMatching, match } from "ts-pattern";
import {
  estTableauNonVide,
  toujoursFaux,
  toujoursVrai,
} from "../../../Commun/Commun.predicats";
import {
  DonneesSectorielles,
  IDonneesBrutesFormulaireSimulateur,
} from "../../DonneesFormulaire";
import {
  auMoinsUneActiviteListee,
  estActiviteAutre,
} from "../Activite/Activite.predicats";
import {
  auMoinsUn,
  et,
  exactementUn,
  non,
  ou,
} from "../ChampSimulateur/champs.predicats";
import {
  auMoinsUnSecteurListe,
  uniquementDesSecteursAutres,
} from "../SecteurActivite/SecteurActivite.predicats";
import { uniquementDesSousSecteursAutres } from "../SousSecteurActivite/SousSecteurActivite.predicats";

const verifAuMoinsUn = {
  activiteListee: <
    T extends DonneesSectorielles &
      Pick<IDonneesBrutesFormulaireSimulateur, "activites">,
  >(
    donnees: T,
  ): donnees is T => auMoinsUneActiviteListee(donnees.activites),
};

export const predicatDonneesFormulaire = {
  auMoins: {
    un: verifAuMoinsUn,
    une: verifAuMoinsUn,
  },
  uniquement: {
    activiteAutre: <
      T extends DonneesSectorielles &
        Pick<IDonneesBrutesFormulaireSimulateur, "activites">,
    >(
      donnees: T,
    ) => donnees.activites.every(estActiviteAutre),
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

// noinspection TypeScriptValidateJSTypes
export const verifieDonneesSectorielles = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  match(donnees)
    .with(
      {
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        secteurActivite: ["infrastructureNumerique"],
        fournitServicesUnionEuropeenne: ["non"],
        localisationRepresentant: [],
      },
      toujoursVrai,
    )
    .with(
      {
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        secteurActivite: ["infrastructureNumerique"],
        sousSecteurActivite: P.array(),
        activites: P.when(estTableauNonVide),
        fournitServicesUnionEuropeenne: ["oui"],
        localisationRepresentant: [],
      },
      toujoursFaux,
    )
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

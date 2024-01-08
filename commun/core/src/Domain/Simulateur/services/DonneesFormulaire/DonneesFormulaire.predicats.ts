import { P, isMatching } from "ts-pattern";
import { estTableauNonVide } from "../../../Commun/Commun.predicats";
import { ValeursActivites } from "../../Activite.definitions";
import {
  DonneesSectorielles,
  DonneesFormulaireSimulateur,
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
  oux,
} from "../ChampSimulateur/champs.predicats";
import {
  auMoinsUnSecteurListe,
  uniquementDesSecteursAutres,
} from "../SecteurActivite/SecteurActivite.predicats";
import { uniquementDesSousSecteursAutres } from "../SousSecteurActivite/SousSecteurActivite.predicats";

const verifAuMoinsUn = {
  activiteListee: <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">
  >(
    donnees: T
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
        Pick<DonneesFormulaireSimulateur, "activites">
    >(
      donnees: T
    ) => donnees.activites.every(estActiviteAutre),
  },
};
export const verifieCompletudeDonneesCommunes = et(
  exactementUn("designeOperateurServicesEssentiels"),
  exactementUn("etatMembre"),
  exactementUn("trancheNombreEmployes"),
  exactementUn("typeStructure"),
  auMoinsUn("secteurActivite")
);

export const verifieDonneesCommunesPrivee: (
  donnees: DonneesFormulaireSimulateur
) => boolean = isMatching({
  trancheCA: [P._],
  typeStructure: ["privee"],
});
export const verifieDonneesCommunesPublique = isMatching({
  typeStructure: ["publique"],
  typeEntitePublique: [P._],
});

const contientSecteurALocaliser = isMatching({
  secteurActivite: ["infrastructureNumerique"],
  activites: P.union(
    ["fournisseurServicesDNS"],
    ["registresNomsDomainesPremierNiveau"]
  ),
});

const neFournitPasDeServiceDansUE = isMatching({
  fournitServicesUnionEuropeenne: ["non"],
  localisationRepresentant: [],
});

const fournitServiceUEBienRemplit = isMatching({
  fournitServicesUnionEuropeenne: ["oui"],
  localisationRepresentant: P.not([]),
});

export const contientSecteursLocalisesValides = oux(
  non(contientSecteurALocaliser),
  et(
    contientSecteurALocaliser,
    ou(neFournitPasDeServiceDansUE, fournitServiceUEBienRemplit)
  )
);

const contientUniquementSecteurAutre = isMatching({
  secteurActivite: P.when(uniquementDesSecteursAutres),
  sousSecteurActivite: P.array(),
  activites: P.array(),
});
const contientUniquementSousSecteurAutre = isMatching({
  secteurActivite: P.when(auMoinsUnSecteurListe),
  sousSecteurActivite: P.when(uniquementDesSousSecteursAutres),
  activites: P.array(),
});
const contientSectorielleComplete = isMatching({
  secteurActivite: P.when(auMoinsUnSecteurListe),
  sousSecteurActivite: P.array(),
  activites: P.when(estTableauNonVide<ValeursActivites>),
});
export const verifieDonneesSectorielles = et(
  ou(
    contientUniquementSecteurAutre,
    contientUniquementSousSecteurAutre,
    contientSectorielleComplete
  ),
  contientSecteursLocalisesValides
);

export const verifieCompletudeDonneesFormulairePrivee = et(
  verifieDonneesCommunesPrivee,
  verifieDonneesSectorielles
);
export const verifieCompletudeDonneesFormulairePublique = et(
  verifieDonneesCommunesPublique,
  verifieDonneesSectorielles
);
export const donneesFormulaireSontCompletes = et(
  verifieCompletudeDonneesCommunes,
  ou(
    verifieCompletudeDonneesFormulairePrivee,
    verifieCompletudeDonneesFormulairePublique
  )
);

export const donneesFormulaireSontIncompletes = non(
  donneesFormulaireSontCompletes
);

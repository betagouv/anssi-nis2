import { isMatching, P } from "ts-pattern";
import { estTableauNonVide } from "../../../Commun/Commun.predicats";
import { Activite } from "../../Activite.definitions";
import {
  DonneesFormulaireSimulateur,
  DonneesSectorielles,
  NomsChampsSimulateur,
  PredicatDonneesFormulaireSimulateur,
} from "../../DonneesFormulaire.definitions";
import { secteursNecessitantLocalisationRepresentant } from "../../SecteurActivite.constantes";
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
import { estPetiteEntreprise } from "../TailleEntreprise/TailleEntite.predicats";

export const contientPetiteEntreprise = (d: DonneesFormulaireSimulateur) =>
  estPetiteEntreprise(d.trancheNombreEmployes, d.trancheChiffreAffaire);

const verifAuMoinsUn = {
  activiteListee: <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">,
  >(
    donnees: T,
  ): donnees is T => auMoinsUneActiviteListee(donnees.activites),
};

const fabriqueSatisfaitUniquement =
  <TypeNom extends NomsChampsSimulateur>(
    champ: TypeNom,
    predicat: (
      activite: DonneesFormulaireSimulateur[TypeNom][number],
    ) => boolean,
  ) =>
  <T extends DonneesSectorielles & Pick<DonneesFormulaireSimulateur, TypeNom>>(
    donnees: T,
  ) =>
    donnees[champ].every(predicat);

export const predicatDonneesFormulaire = {
  auMoins: {
    un: verifAuMoinsUn,
    une: verifAuMoinsUn,
  },
  uniquement: {
    activiteAutre: fabriqueSatisfaitUniquement("activites", estActiviteAutre),
  },
  champs: <C extends NomsChampsSimulateur>(champ: C) => ({
    contient:
      <T extends DonneesFormulaireSimulateur[C][number]>(valeur: T) =>
      (donnees: DonneesFormulaireSimulateur) =>
        donnees !== undefined &&
        champ in donnees &&
        donnees[champ].includes(valeur as never),
    verifie:
      (f: <T extends DonneesFormulaireSimulateur[C]>(valeurs: T) => boolean) =>
      (d: DonneesFormulaireSimulateur) =>
        f(d[champ]),
    est: <T extends DonneesFormulaireSimulateur[C]>(valeurs: T) =>
      isMatching({ [champ]: valeurs }),
  }),
};

export const verifieCompletudeDonneesCommunes = et(
  exactementUn("designeOperateurServicesEssentiels"),
  exactementUn("appartenancePaysUnionEurpopeenne"),
  exactementUn("trancheNombreEmployes"),
  exactementUn("typeStructure"),
  auMoinsUn("secteurActivite"),
);

export const verifieDonneesCommunesPrivee: (
  donnees: DonneesFormulaireSimulateur,
) => boolean = isMatching({
  trancheChiffreAffaire: [P._],
  typeStructure: ["privee"],
});
export const verifieDonneesCommunesPublique = isMatching({
  typeStructure: ["publique"],
  typeEntitePublique: [P._],
});

const estInfranumDnsOuRegistre = isMatching({
  secteurActivite: ["infrastructureNumerique"],
  activites: P.union(
    ["fournisseurServicesDNS"],
    ["registresNomsDomainesPremierNiveau"],
  ),
});
const estServiceTicOuFournisseurNum = isMatching({
  secteurActivite: P.union(["gestionServicesTic"], ["fournisseursNumeriques"]),
});
export const contientSecteurALocaliser = ou(
  estInfranumDnsOuRegistre,
  et(non(contientPetiteEntreprise), estServiceTicOuFournisseurNum),
);

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
    ou(neFournitPasDeServiceDansUE, fournitServiceUEBienRemplit),
  ),
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
  activites: P.when(estTableauNonVide<Activite>),
});

export const verifieDonneesSectorielles = et(
  ou(
    contientUniquementSecteurAutre,
    contientUniquementSousSecteurAutre,
    contientSectorielleComplete,
  ),
  ou(
    predicatDonneesFormulaire.uniquement.activiteAutre,
    contientSecteursLocalisesValides,
  ),
);

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

export const contientSecteurNecessitantLocalisation = (
  d: DonneesSectorielles,
) =>
  secteursNecessitantLocalisationRepresentant.some((s) =>
    predicatDonneesFormulaire.champs("secteurActivite").contient(s)(
      d as DonneesFormulaireSimulateur,
    ),
  );
export const contientUniquementSecteurNecessitantLocalisation = (
  d: DonneesSectorielles,
) =>
  d.secteurActivite.every((s) =>
    secteursNecessitantLocalisationRepresentant.includes(s),
  );
export const contientOperateurServicesEssentiels: PredicatDonneesFormulaireSimulateur =
  isMatching({
    designeOperateurServicesEssentiels: ["oui"],
  });

export const contientInfrastructureNumerique: PredicatDonneesFormulaireSimulateur =
  isMatching({
    secteurActivite: ["infrastructureNumerique"],
  });

import { isMatching, P } from "ts-pattern";
import { estTableauNonVide } from "../../../Commun/Commun.predicats";
import { Activite } from "../../Activite.definitions";
import {
  ChampsAvecPredicats,
  DonneesFormulaireSimulateur,
  DonneesSectorielles,
  FabriquePredicatChamp,
  NomsChampsSimulateur,
  PredicatDonneesFormulaireSimulateur,
} from "../../DonneesFormulaire.definitions";
import { ValeursNomChampsFormulaire } from "../../DonneesFormulaire.valeurs";
import { SecteurAvecBesoinLocalisationRepresentant } from "../../SecteurActivite.definitions";
import { ValeursSecteursAvecBesoinLocalisationRepresentant } from "../../SecteurActivite.valeurs";
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
import {
  estMoyenneEntreprise,
  estPetiteEntreprise,
} from "../TailleEntreprise/TailleEntite.predicats";

export const contientPetiteEntreprise = (d: DonneesFormulaireSimulateur) =>
  estPetiteEntreprise(d.trancheNombreEmployes, d.trancheChiffreAffaire);
export const contientMoyenneEntreprise = (d: DonneesFormulaireSimulateur) =>
  estMoyenneEntreprise(d.trancheNombreEmployes, d.trancheChiffreAffaire);

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

const fabriquePredicatChamp: FabriquePredicatChamp = <
  C extends NomsChampsSimulateur,
>(
  champ: C,
) => ({
  contient:
    <T extends DonneesFormulaireSimulateur[C][number]>(valeur: T) =>
    (donnees: DonneesFormulaireSimulateur) =>
      donnees !== undefined &&
      champ in donnees &&
      (donnees[champ] as DonneesFormulaireSimulateur[C][number][]).includes(
        valeur,
      ),
  contientUnParmi:
    <T extends DonneesFormulaireSimulateur[C][number]>(...listeValeur: T[]) =>
    (donnees: DonneesFormulaireSimulateur) =>
      donnees !== undefined &&
      champ in donnees &&
      listeValeur.some((valeur) =>
        (donnees[champ] as DonneesFormulaireSimulateur[C][number][]).includes(
          valeur,
        ),
      ),
  satisfait:
    (f: <T extends DonneesFormulaireSimulateur[C]>(valeurs: T) => boolean) =>
    (d: DonneesFormulaireSimulateur) =>
      f(d[champ]),
  est: <T extends DonneesFormulaireSimulateur[C]>(valeurs: T) =>
    isMatching({ [champ]: valeurs }),
});

export const predicatDonneesFormulaire = {
  auMoins: {
    un: verifAuMoinsUn,
    une: verifAuMoinsUn,
  },
  uniquement: {
    activiteAutre: fabriqueSatisfaitUniquement("activites", estActiviteAutre),
  },
  ...ValeursNomChampsFormulaire.reduce(
    (acc, nom) => ({ ...acc, [nom]: fabriquePredicatChamp(nom) }),
    {} as ChampsAvecPredicats,
  ),
};

export const verifieCompletudeDonneesCommunes = et(
  exactementUn("designationOperateurServicesEssentiels"),
  exactementUn("appartenancePaysUnionEuropeenne"),
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
export const contientServiceTicOuFournisseurNum: PredicatDonneesFormulaireSimulateur =
  isMatching({
    secteurActivite: P.union(
      ["gestionServicesTic"],
      ["fournisseursNumeriques"],
    ),
  });
export const contientSecteurALocaliser = ou(
  estInfranumDnsOuRegistre,
  et(non(contientPetiteEntreprise), contientServiceTicOuFournisseurNum),
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
  ValeursSecteursAvecBesoinLocalisationRepresentant.some((s) =>
    predicatDonneesFormulaire.secteurActivite.contient(s)(
      d as DonneesFormulaireSimulateur,
    ),
  );
export const contientUniquementSecteurNecessitantLocalisation = (
  d: DonneesSectorielles,
) =>
  d.secteurActivite.every((s) =>
    ValeursSecteursAvecBesoinLocalisationRepresentant.includes(
      s as SecteurAvecBesoinLocalisationRepresentant,
    ),
  );
export const contientOperateurServicesEssentiels: PredicatDonneesFormulaireSimulateur =
  isMatching({
    designationOperateurServicesEssentiels: ["oui"],
  });

export const contientInfrastructureNumerique: PredicatDonneesFormulaireSimulateur =
  isMatching({
    secteurActivite: ["infrastructureNumerique"],
  });
export const contientAutreSecteurActiviteUniquement = (
  donneesFormulaire: DonneesFormulaireSimulateur,
) =>
  donneesFormulaire.secteurActivite.length === 1 &&
  donneesFormulaire.secteurActivite[0] === "autreSecteurActivite";

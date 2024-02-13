import { match, P } from "ts-pattern";
import { GuardP } from "ts-pattern/dist/types/Pattern";
import {
  ens,
  ensembleNeutre,
  union,
} from "../../../../../../utils/services/sets.operations";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../DonneesFormulaire.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { activiteEstDansSecteur } from "../Activite/Activite.predicats";
import {
  estSecteurAutre,
  estUnSecteurAvecDesSousSecteurs,
  estUnSecteurSansDesSousSecteurs,
} from "../SecteurActivite/SecteurActivite.predicats";
import {
  InformationSecteurPossible,
  ReponseEtatappartenancePaysUnionEuropeenne,
  ReponseEtatDesignationOperateurServicesEssentiels,
  ReponseEtatSecteurActiviteComplet,
  ReponseEtatStructure,
  ReponseEtatVide,
  UnionReponseEtat,
} from "./Reponse.definitions";

const exactementUnElement = <T extends string>(a: T[]) => a.length === 1;
const auMoinsUnElement = <T extends string>(a: T[]) => a.length >= 1;

const reponseEtatVide: ReponseEtatVide = { _tag: "ReponseEtatVide" };

const champsAvecUneValeur = (...champs: NomsChampsSimulateur[]) =>
  champs.reduce(
    (patt, champ) => ({
      ...patt,
      [champ]: P.when(exactementUnElement) as GuardP<
        DonneesFormulaireSimulateur[typeof champ],
        never
      >,
    }),
    {},
  );

const champsNonVides = (...champs: NomsChampsSimulateur[]) =>
  champs.reduce(
    (patt, champ) => ({
      ...patt,
      [champ]: P.when(auMoinsUnElement) as GuardP<
        DonneesFormulaireSimulateur[typeof champ],
        never
      >,
    }),
    {},
  );

/*
union<DonneesFormulaireSimulateur, readonly [{
    readonly designationOperateurServicesEssentiels: GuardP<("oui" | "non" | "nsp")[], never>;
    readonly appartenancePaysUnionEuropeenne: GuardP<...>;
    readonly typeStructure: GuardP<...>;
    readonly typeEntitePublique: GuardP<...>;
    readonly trancheNombreEmployes: GuardP<...>;
}, {
    ...;
}]
 */
const champsMinimauxStructure = champsAvecUneValeur(
  "designationOperateurServicesEssentiels",
  "appartenancePaysUnionEuropeenne",
  "typeStructure",
);
const champsSpecifiquesStructurePublique = champsAvecUneValeur(
  "typeStructure",
  "typeEntitePublique",
  "trancheNombreEmployes",
);
const champsSpecifiquesStructurePrivee = champsAvecUneValeur(
  "typeStructure",
  "trancheChiffreAffaire",
  "trancheNombreEmployes",
);

export const ReponseEtat = {
  construitReponseEtatVide: () => reponseEtatVide,
  construitEtatsDesignationOse: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatDesignationOperateurServicesEssentiels => ({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels: {
      designationOperateurServicesEssentiels:
        donnees.designationOperateurServicesEssentiels[0],
    },
  }),

  construitEtatappartenancePaysUnionEuropeenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatappartenancePaysUnionEuropeenne => ({
    ...ReponseEtat.construitEtatsDesignationOse(donnees),
    _tag: "appartenancePaysUnionEuropeenne",
    appartenancePaysUnionEuropeenne: {
      appartenancePaysUnionEuropeenne:
        donnees.appartenancePaysUnionEuropeenne[0],
    },
  }),

  construitEtatStructurePrivee: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatStructure => ({
    ...ReponseEtat.construitEtatappartenancePaysUnionEuropeenne(donnees),
    _tag: "Structure",
    Structure: {
      typeStructure: "privee",
      trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    },
  }),

  construitEtatStructurePublique: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatStructure => ({
    ...ReponseEtat.construitEtatappartenancePaysUnionEuropeenne(donnees),
    _tag: "Structure",
    Structure: {
      typeStructure: "publique",
      typeEntitePublique: donnees.typeEntitePublique[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    },
  }),

  construitEtatStructure: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatStructure =>
    donnees.typeStructure[0] === "publique"
      ? ReponseEtat.construitEtatStructurePublique(donnees)
      : ReponseEtat.construitEtatStructurePrivee(donnees),

  construitSecteurAutre: () => (): Set<InformationSecteurPossible> =>
    ens({
      secteurActivite: "autreSecteurActivite",
    }),

  construitSecteurSimple:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteurActivite): Set<InformationSecteurPossible> =>
      ens({
        secteurActivite: secteur,
        activites: ens(
          ...donnees.activites.filter(activiteEstDansSecteur(secteur)),
        ),
      }),
  construitSecteurSousSecteur:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteurActivite): Set<InformationSecteurPossible> =>
      ens({
        secteurActivite: secteur,
        sousSecteurActivite: donnees.sousSecteurActivite[0],
        activites: ens(...donnees.activites),
      }),

  construitSecteur: (
    donnees: DonneesFormulaireSimulateur,
    secteurActivite: SecteurActivite,
  ): Set<InformationSecteurPossible> =>
    match(secteurActivite)
      .when(estSecteurAutre, ReponseEtat.construitSecteurAutre())
      .when(
        estUnSecteurSansDesSousSecteurs,
        ReponseEtat.construitSecteurSimple(donnees),
      )
      .when(
        estUnSecteurAvecDesSousSecteurs,
        ReponseEtat.construitSecteurSousSecteur(donnees),
      )
      .otherwise(() => ensembleNeutre as Set<InformationSecteurPossible>),

  construitListeSecteurs: (donnees: DonneesFormulaireSimulateur) =>
    donnees.secteurActivite.reduce(
      (liste, secteur) =>
        union(liste, ReponseEtat.construitSecteur(donnees, secteur)),
      new Set<InformationSecteurPossible>([]),
    ),
  construitEtatInformationsSecteurs: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatSecteurActiviteComplet => ({
    ...ReponseEtat.construitEtatStructure(donnees),
    _tag: "SecteurActiviteComplet",
    SecteurActiviteComplet: {
      secteurs: ReponseEtat.construitListeSecteurs(donnees),
    },
  }),

  depuisDonneesFormulaireSimulateur: (
    donnees: DonneesFormulaireSimulateur,
  ): UnionReponseEtat =>
    match(donnees)
      .with(
        P.intersection(
          champsMinimauxStructure,
          P.union(
            champsSpecifiquesStructurePublique,
            champsSpecifiquesStructurePrivee,
          ),
          P.union(
            champsNonVides(
              "secteurActivite",
              "sousSecteurActivite",
              "activites",
            ),
            champsNonVides("secteurActivite", "activites"),
            champsNonVides("secteurActivite"),
          ),
        ),
        ReponseEtat.construitEtatInformationsSecteurs,
      )
      .with(
        P.intersection(
          champsMinimauxStructure,
          P.union(
            champsSpecifiquesStructurePublique,
            champsSpecifiquesStructurePrivee,
          ),
        ),
        ReponseEtat.construitEtatStructure,
      )
      .with(
        champsAvecUneValeur(
          "designationOperateurServicesEssentiels",
          "appartenancePaysUnionEuropeenne",
        ),
        ReponseEtat.construitEtatappartenancePaysUnionEuropeenne,
      )
      .with(
        champsAvecUneValeur("designationOperateurServicesEssentiels"),
        ReponseEtat.construitEtatsDesignationOse,
      )
      .otherwise(ReponseEtat.construitReponseEtatVide),
};
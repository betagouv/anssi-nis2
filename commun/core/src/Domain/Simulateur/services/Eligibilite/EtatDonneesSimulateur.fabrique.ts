import { match, P } from "ts-pattern";
import { GuardP } from "ts-pattern/dist/types/Pattern";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../DonneesFormulaire.definitions";
import { FabriqueSectorisation } from "../../fabriques/Sectorisation.fabrique";
import {
  ReponseEtatappartenancePaysUnionEuropeenne,
  ReponseEtatDesignationOperateurServicesEssentiels,
  ReponseEtatSecteurActiviteComplet,
  ReponseEtatStructure,
  ReponseEtatVide,
  UnionReponseEtat,
} from "./Reponse.definitions";

const exactementUnElement = <T extends string>(a: T[]) => a.length === 1;
const auMoinsUnElement = <T extends string>(a: T[]) => a.length >= 1;

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

export const FabriqueEtatDonneesSimulateur = {
  vide: (): ReponseEtatVide => ({
    _tag: "ReponseEtatVide",
  }),
  designationOperateurServicesEssentiels: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatDesignationOperateurServicesEssentiels => ({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels: {
      designationOperateurServicesEssentiels:
        donnees.designationOperateurServicesEssentiels[0],
    },
  }),

  appartenancePaysUnionEuropeenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatappartenancePaysUnionEuropeenne => ({
    ...FabriqueEtatDonneesSimulateur.designationOperateurServicesEssentiels(
      donnees,
    ),
    _tag: "AppartenancePaysUnionEuropeenne",
    AppartenancePaysUnionEuropeenne: {
      appartenancePaysUnionEuropeenne:
        donnees.appartenancePaysUnionEuropeenne[0],
    },
  }),

  structurePrivee: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatStructure => ({
    ...FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(donnees),
    _tag: "Structure",
    Structure: {
      typeStructure: "privee",
      trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    },
  }),

  structurePublique: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatStructure => ({
    ...FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(donnees),
    _tag: "Structure",
    Structure: {
      typeStructure: "publique",
      typeEntitePublique: donnees.typeEntitePublique[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    },
  }),

  structure: (donnees: DonneesFormulaireSimulateur): ReponseEtatStructure =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueEtatDonneesSimulateur.structurePublique(donnees)
      : FabriqueEtatDonneesSimulateur.structurePrivee(donnees),

  informationsSecteurs: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatSecteurActiviteComplet => ({
    ...FabriqueEtatDonneesSimulateur.structure(donnees),
    _tag: "SecteurActiviteComplet",
    SecteurActiviteComplet: {
      secteurs:
        FabriqueSectorisation.listeSecteursDepuisDonneesSimulateur(donnees),
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
        FabriqueEtatDonneesSimulateur.informationsSecteurs,
      )
      .with(
        P.intersection(
          champsMinimauxStructure,
          P.union(
            champsSpecifiquesStructurePublique,
            champsSpecifiquesStructurePrivee,
          ),
        ),
        FabriqueEtatDonneesSimulateur.structure,
      )
      .with(
        champsAvecUneValeur(
          "designationOperateurServicesEssentiels",
          "appartenancePaysUnionEuropeenne",
        ),
        FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenne,
      )
      .with(
        champsAvecUneValeur("designationOperateurServicesEssentiels"),
        FabriqueEtatDonneesSimulateur.designationOperateurServicesEssentiels,
      )
      .otherwise(FabriqueEtatDonneesSimulateur.vide),
};

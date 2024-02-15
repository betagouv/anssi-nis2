import { match, P } from "ts-pattern";
import { GuardP } from "ts-pattern/dist/types/Pattern";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../DonneesFormulaire.definitions";
import { FabriqueInformationsSecteur } from "../../fabriques/InformationsSecteur.fabrique";
import { FabriqueInformationsStructure } from "../../fabriques/InformationsStructure.fabrique";
import { contientPetiteEntreprise } from "../DonneesFormulaire/DonneesFormulaire.predicats";
import {
  ReponseEtatAppartenancePaysUnionEuropeenne,
  ReponseEtatDesignationOperateurServicesEssentiels,
  ReponseEtatInformationsSecteur,
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
  ): ReponseEtatAppartenancePaysUnionEuropeenne => ({
    ...FabriqueEtatDonneesSimulateur.designationOperateurServicesEssentiels(
      donnees,
    ),
    _tag: "AppartenancePaysUnionEuropeenne",
    AppartenancePaysUnionEuropeenne: {
      appartenancePaysUnionEuropeenne:
        donnees.appartenancePaysUnionEuropeenne[0],
    },
  }),

  structure: (donnees: DonneesFormulaireSimulateur): ReponseEtatStructure => ({
    ...FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(donnees),
    _tag: "Structure",
    Structure: FabriqueInformationsStructure.structure(donnees),
  }),

  informationsSecteursPetit: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatInformationsSecteur => ({
    ...FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(donnees),
    _tag: "InformationsSecteur",
    Structure: FabriqueInformationsStructure.structurePetite(donnees),
    InformationsSecteur:
      FabriqueInformationsSecteur.informationsSecteursPetit(donnees),
  }),

  informationsSecteursGrand: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatInformationsSecteur => ({
    ...FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(donnees),
    _tag: "InformationsSecteur",
    Structure: FabriqueInformationsStructure.structureGrande(donnees),
    InformationsSecteur:
      FabriqueInformationsSecteur.informationsSecteursGrand(donnees),
  }),

  informationsSecteurs: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatInformationsSecteur =>
    contientPetiteEntreprise(donnees)
      ? FabriqueEtatDonneesSimulateur.informationsSecteursPetit(donnees)
      : FabriqueEtatDonneesSimulateur.informationsSecteursGrand(donnees),

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

import { match, P } from "ts-pattern";
import { GuardP } from "ts-pattern/dist/types/Pattern";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
} from "../../ChampsSimulateur.definitions";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../DonneesFormulaire.definitions";
import { FabriqueInformationsSecteur } from "../../fabriques/InformationsSecteur.fabrique";
import { FabriqueInformationsStructure } from "../../fabriques/InformationsStructure.fabrique";
import { contientPetiteEntreprise } from "../DonneesFormulaire/DonneesFormulaire.predicats";
import {
  ReponseStructure,
  ReponseStructurePetit,
  ReponseInformationsSecteurPetit,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
} from "./Reponse.definitions";
import {
  ReponseEtatAppartenancePaysUnionEuropeenne,
  ReponseEtatDesignationOperateurServicesEssentiels,
  ReponseEtatInformationsSecteur,
  ReponseEtatInformationsSecteurPetit,
  ReponseEtatStructure,
  ReponseEtatStructurePetit,
  ReponseEtatVide,
  UnionReponseEtat,
} from "./ReponseEtat.definitions";

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
  designationOperateurServicesEssentiels: (
    designationOperateurServicesEssentiels: DesignationOperateurServicesEssentiels,
  ): ReponseEtatDesignationOperateurServicesEssentiels => ({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels: {
      designationOperateurServicesEssentiels,
    },
  }),
  appartenancePaysUnionEuropeenne: (
    designationOperateurServicesEssentiels: ReponseEtatDesignationOperateurServicesEssentiels,
    appartenancePaysUnionEuropeenne: AppartenancePaysUnionEuropeenne,
  ): ReponseEtatAppartenancePaysUnionEuropeenne => ({
    ...designationOperateurServicesEssentiels,
    _tag: "AppartenancePaysUnionEuropeenne",
    AppartenancePaysUnionEuropeenne: {
      appartenancePaysUnionEuropeenne,
    },
  }),

  appartenancePaysUnionEuropeenneChaine: (
    designationOperateurServicesEssentiel: ReponseDesignationOperateurServicesEssentiels,
    appartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne,
  ) =>
    FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(
      FabriqueEtatDonneesSimulateur.designationOperateurServicesEssentiels(
        designationOperateurServicesEssentiel.designationOperateurServicesEssentiels,
      ),
      appartenancePaysUnionEuropeenne.appartenancePaysUnionEuropeenne,
    ),

  structureChaine: (
    designationOperateurServicesEssentiel: ReponseDesignationOperateurServicesEssentiels,
    appartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne,
    structure: ReponseStructure,
  ): ReponseEtatStructure => ({
    ...FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenneChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
    ),
    _tag: "Structure",
    Structure: structure,
  }),

  structurePetitChaine: (
    designationOperateurServicesEssentiel: ReponseDesignationOperateurServicesEssentiels,
    appartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne,
    structure: ReponseStructurePetit,
  ): ReponseEtatStructurePetit => ({
    ...FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenneChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
    ),
    _tag: "Structure",
    Structure: structure,
  }),

  informationsSecteurPetitChaine: (
    designationOperateurServicesEssentiel: ReponseDesignationOperateurServicesEssentiels,
    appartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne,
    structure: ReponseStructurePetit,
    informationsSecteur: ReponseInformationsSecteurPetit,
  ): ReponseEtatInformationsSecteurPetit => ({
    ...FabriqueEtatDonneesSimulateur.structurePetitChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
    ),
    _tag: "InformationsSecteur",
    InformationsSecteur: informationsSecteur,
  }),
};

export const ConvertisseurDonneesBrutesVersEtatDonneesSimulateur = {
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
    ...ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.designationOperateurServicesEssentiels(
      donnees,
    ),
    _tag: "AppartenancePaysUnionEuropeenne",
    AppartenancePaysUnionEuropeenne: {
      appartenancePaysUnionEuropeenne:
        donnees.appartenancePaysUnionEuropeenne[0],
    },
  }),

  structure: (donnees: DonneesFormulaireSimulateur): ReponseEtatStructure => ({
    ...ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(
      donnees,
    ),
    _tag: "Structure",
    Structure: FabriqueInformationsStructure.structure(donnees),
  }),

  informationsSecteursPetit: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatInformationsSecteur => ({
    ...ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(
      donnees,
    ),
    _tag: "InformationsSecteur",
    Structure: FabriqueInformationsStructure.structurePetite(donnees),
    InformationsSecteur:
      FabriqueInformationsSecteur.informationsSecteursPetit(donnees),
  }),

  informationsSecteursGrand: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatInformationsSecteur => ({
    ...ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(
      donnees,
    ),
    _tag: "InformationsSecteur",
    Structure: FabriqueInformationsStructure.structureGrande(donnees),
    InformationsSecteur:
      FabriqueInformationsSecteur.informationsSecteursGrand(donnees),
  }),

  informationsSecteurs: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatInformationsSecteur =>
    contientPetiteEntreprise(donnees)
      ? ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.informationsSecteursPetit(
          donnees,
        )
      : ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.informationsSecteursGrand(
          donnees,
        ),

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
        ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.informationsSecteurs,
      )
      .with(
        P.intersection(
          champsMinimauxStructure,
          P.union(
            champsSpecifiquesStructurePublique,
            champsSpecifiquesStructurePrivee,
          ),
        ),
        ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.structure,
      )
      .with(
        champsAvecUneValeur(
          "designationOperateurServicesEssentiels",
          "appartenancePaysUnionEuropeenne",
        ),
        ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.appartenancePaysUnionEuropeenne,
      )
      .with(
        champsAvecUneValeur("designationOperateurServicesEssentiels"),
        ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.designationOperateurServicesEssentiels,
      )
      .otherwise(ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.vide),
};

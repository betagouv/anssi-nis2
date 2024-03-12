import { match, P } from "ts-pattern";
import {
  fabriquePatternAuMoinsUnElement,
  fabriquePatternExactementUnElement,
} from "../../../../../../utils/services/array.operations";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TypeStructure,
} from "../../ChampsSimulateur.definitions";
import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import { FabriqueInformationsSecteur } from "../../fabriques/InformationsSecteur.fabrique";
import { FabriqueInformationsStructure } from "../../fabriques/InformationsStructure.fabrique";
import {
  contientMoyenneEntreprise,
  contientPetiteEntreprise,
} from "../DonneesFormulaire/DonneesFormulaire.predicats";
import { ReponseAppartenancePaysUnionEuropeenne } from "./ReponseAppartenancePaysUnionEuropeenne.definition";
import { ReponseDesignationOperateurServicesEssentiels } from "./ReponseDesignationOperateurServicesEssentiels.definitino";
import {
  ReponseEtatAppartenancePaysUnionEuropeenne,
  ReponseEtatDesignationOperateurServicesEssentiels,
  ReponseEtatInformationsSecteur,
  ReponseEtatStructure,
  ReponseEtatVide,
  UnionReponseEtat,
} from "./ReponseEtat.definitions";
import { ReponseInformationsSecteur } from "./ReponseInformationsSecteur.definitions";
import {
  CategorieTaille,
  ReponseStructure,
} from "./ReponseStructure.definitions";

const champsMinimauxStructure = fabriquePatternExactementUnElement(
  "designationOperateurServicesEssentiels",
  "appartenancePaysUnionEuropeenne",
  "typeStructure",
);
const champsSpecifiquesStructurePublique = fabriquePatternExactementUnElement(
  "typeStructure",
  "typeEntitePublique",
  "trancheNombreEmployes",
);
const champsSpecifiquesStructurePrivee = fabriquePatternExactementUnElement(
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

  structureChaineGen: <S extends TypeStructure, T extends CategorieTaille>(
    designationOperateurServicesEssentiel: ReponseDesignationOperateurServicesEssentiels,
    appartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne,
    structure: ReponseStructure<S, T>,
  ): ReponseEtatStructure<S, T> => ({
    ...FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenneChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
    ),
    _tag: "Structure",
    Structure: structure,
  }),
  informationsSecteurChaine: <
    S extends TypeStructure = TypeStructure,
    T extends CategorieTaille = CategorieTaille,
  >(
    designationOperateurServicesEssentiel: ReponseDesignationOperateurServicesEssentiels,
    appartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne,
    structure: ReponseStructure<S, T>,
    informationsSecteur: ReponseInformationsSecteur<T>,
  ): ReponseEtatInformationsSecteur<T> => ({
    ...FabriqueEtatDonneesSimulateur.structureChaineGen<S, T>(
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

  informationsSecteursMoyen: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatInformationsSecteur => ({
    ...ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(
      donnees,
    ),
    _tag: "InformationsSecteur",
    Structure: FabriqueInformationsStructure.structureMoyenne(donnees),
    InformationsSecteur:
      FabriqueInformationsSecteur.informationsSecteursMoyen(donnees),
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
      : contientMoyenneEntreprise(donnees)
        ? ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.informationsSecteursMoyen(
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
            fabriquePatternAuMoinsUnElement(
              "secteurActivite",
              "sousSecteurActivite",
              "activites",
            ),
            fabriquePatternAuMoinsUnElement("secteurActivite", "activites"),
            fabriquePatternAuMoinsUnElement("secteurActivite"),
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
        fabriquePatternExactementUnElement(
          "designationOperateurServicesEssentiels",
          "appartenancePaysUnionEuropeenne",
        ),
        ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.appartenancePaysUnionEuropeenne,
      )
      .with(
        fabriquePatternExactementUnElement(
          "designationOperateurServicesEssentiels",
        ),
        ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.designationOperateurServicesEssentiels,
      )
      .otherwise(ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.vide),
};

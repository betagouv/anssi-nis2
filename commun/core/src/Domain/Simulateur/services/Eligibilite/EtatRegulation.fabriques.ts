import { TypeStructure } from "../../ChampsSimulateur.definitions";
import {
  fabriqueRegule,
  resultatReguleOSE,
} from "../../fabriques/ResultatRegulation.fabrique";
import { resultatIncertain } from "../../Regulation.constantes";
import {
  ResultatRegulationEntite,
  TypeEntite,
} from "../../Regulation.definitions";
import {
  EtapeEvaluation,
  EtapeEvaluationActive,
  EtatEvaluationEnSuspens,
  EtatRegulation,
  EtatRegulationAvecReponses,
  EtatRegulationDefinitif,
  EtatRegulationInconnu,
} from "./EtatRegulation.definitions";
import { ReponseAppartenancePaysUnionEuropeenne } from "./ReponseAppartenancePaysUnionEuropeenne.definition";
import { ReponseDesignationOperateurServicesEssentiels } from "./ReponseDesignationOperateurServicesEssentiels.definitino";
import { UnionReponseEtatNonVide } from "./ReponseEtat.definitions";
import { FabriqueEtatDonneesSimulateur } from "./ReponseEtat.fabriques";
import { propReponseEtat } from "./ReponseEtat.operations";
import { ReponseInformationsSecteur } from "./ReponseInformationsSecteur.definitions";
import {
  CategorieTaille,
  ReponseStructure,
} from "./ReponseStructure.definitions";

export const fabriqueResultatEvaluationInconnu = (
  reponse: UnionReponseEtatNonVide,
  etapeEvaluee: EtapeEvaluation = "NonEvalue",
): EtatRegulationInconnu => ({
  ...reponse,
  _resultatEvaluationRegulation: "Inconnu",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationEnSuspens = (
  etapeEvaluee: EtapeEvaluationActive,
  resulat: ResultatRegulationEntite,
  reponse: UnionReponseEtatNonVide,
): EtatEvaluationEnSuspens => ({
  ...resulat,
  ...reponse,
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationDefinitif = (
  etapeEvaluee: EtapeEvaluationActive,
  resulat: ResultatRegulationEntite,
): EtatRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resulat,
});
export const fabriqueResultatEvaluationReguleOse =
  (): EtatRegulationDefinitif =>
    fabriqueResultatEvaluationDefinitif(
      "DesignationOperateurServicesEssentiels",
      resultatReguleOSE,
    );

export const propageResultatIncertainEnSuspens =
  (etapeEvaluee: EtapeEvaluationActive) =>
  (reponse: EtatRegulation): EtatEvaluationEnSuspens =>
    fabriqueResultatEvaluationEnSuspens(
      etapeEvaluee,
      resultatIncertain,
      reponse as EtatRegulationAvecReponses,
    );
export const fabriqueResultatEvaluationRegulationDefinitif = (
  resultatRegulation: ResultatRegulationEntite,
  etapeEvaluee: EtapeEvaluation,
): EtatRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resultatRegulation,
});
export const propageDonneesEvaluees =
  (etape: EtapeEvaluationActive) => (reponse: EtatRegulation) => ({
    ...reponse,
    etapeEvaluee: etape,
  });
export const fabriqueResultatEvaluationDefinitifCarSecteur = (
  reponse: EtatEvaluationEnSuspens,
  typeEntite: TypeEntite,
) =>
  fabriqueResultatEvaluationDefinitif(
    "InformationsSecteur",
    fabriqueRegule(
      {
        ...propReponseEtat(reponse)("Structure"),
        ...propReponseEtat(reponse)("InformationsSecteur"),
      },
      typeEntite,
    ),
  );
export const fabriqueResultatEvaluationInconnuOse = (
  designationOperateurServicesEssentiels: ReponseDesignationOperateurServicesEssentiels,
) =>
  fabriqueResultatEvaluationInconnu({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels:
      designationOperateurServicesEssentiels,
  });
export const fabriqueResultatEvaluationEnSuspensAppUE = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "AppartenancePaysUnionEuropeenne",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenneChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
    ),
  );
export const fabriqueResultatEvaluationEnSuspensStructure = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructure<TypeStructure, CategorieTaille>,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "AppartenancePaysUnionEuropeenne",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.structureChaineGen(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
    ),
  );
export const fabriqueResultatEvaluationEnSuspensSecteurPetit = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
  informationsSecteur,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructure<TypeStructure, "Petit">,
  ReponseInformationsSecteur<"Petit">,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "Structure",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.informationsSecteurChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
      informationsSecteur,
    ),
  );
export const fabriqueResultatEvaluationEnSuspensSecteur = <
  S extends TypeStructure,
  T extends CategorieTaille,
>([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
  informationsSecteur,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructure<S, T>,
  ReponseInformationsSecteur<T>,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "Structure",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.informationsSecteurChaine<S, T>(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
      informationsSecteur,
    ) as UnionReponseEtatNonVide,
  );

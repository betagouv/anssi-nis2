import { fc } from "@fast-check/vitest";
import { TypeStructure } from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { EtatRegulation } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { fabriqueResultatEvaluationEnSuspensSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import { ReponseInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import {
  CategorieTaille,
  ReponseStructure,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import {
  arbReponseStructure_ToujoursPrivee_ToujoursGE,
  arbReponseStructure_ToujoursPrivee_ToujoursME,
  arbReponseStructure_ToujoursPrivee_ToujoursPE,
} from "../Domaine/arbitraires/ReponseStructure.arbitraires";
import { arbTuple_JamaisOse_ToujoursFrance } from "../Domaine/arbitraires/ResultatEvaluationRegulation.arbitraire";
import { FabriqueArbReponseSimulateurParams } from "../Domaine/arbitraires/ResultatEvaluationRegulation.arbitraires.definitions";

export const mapTupleArbitrairesToujoursFrance =
  <Structure extends TypeStructure, Taille extends CategorieTaille>(
    fabrique: (
      arr: FabriqueArbReponseSimulateurParams<Taille>,
    ) => EtatRegulation,
  ) =>
  (arbStructure: fc.Arbitrary<ReponseStructure<Structure, Taille>>) =>
  (arbInformationsSecteur: fc.Arbitrary<ReponseInformationsSecteur<Taille>>) =>
    fc
      .tuple<FabriqueArbReponseSimulateurParams<Taille>>(
        ...arbTuple_JamaisOse_ToujoursFrance,
        arbStructure,
        arbInformationsSecteur,
      )
      .map(fabrique);

export const fabriqueArbJamaisOse_ToujoursFrance =
  mapTupleArbitrairesToujoursFrance(fabriqueResultatEvaluationEnSuspensSecteur);
export const fabriqueArbJamaisOse_ToujoursFrance_StructurePetit =
  fabriqueArbJamaisOse_ToujoursFrance(
    arbReponseStructure_ToujoursPrivee_ToujoursPE,
  );
export const fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen =
  fabriqueArbJamaisOse_ToujoursFrance(
    arbReponseStructure_ToujoursPrivee_ToujoursME,
  );
export const fabriqueArbJamaisOse_ToujoursFrance_StructureGrand =
  fabriqueArbJamaisOse_ToujoursFrance(
    arbReponseStructure_ToujoursPrivee_ToujoursGE,
  );

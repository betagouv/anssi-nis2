import { fc } from "@fast-check/vitest";
import { TypeStructure } from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { EtatRegulation } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationEnSuspensSecteur,
  fabriqueResultatEvaluationEnSuspensSecteurPetit,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import { ReponseInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import {
  CategorieTaille,
  ReponseStructure,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import {
  arbReponseStructure_ToujoursGrand,
  arbReponseStructure_ToujoursMoyen,
  arbStructurePetitPrive,
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
export const fabriqueArbJamaisOse_ToujoursFrance_Petit =
  mapTupleArbitrairesToujoursFrance(
    fabriqueResultatEvaluationEnSuspensSecteurPetit,
  );
export const fabriqueArbJamaisOse_ToujoursFrance_StructurePetit =
  fabriqueArbJamaisOse_ToujoursFrance_Petit(arbStructurePetitPrive);
export const fabriqueArbJamaisOse_ToujoursFrance =
  mapTupleArbitrairesToujoursFrance(fabriqueResultatEvaluationEnSuspensSecteur);
export const fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen =
  fabriqueArbJamaisOse_ToujoursFrance(arbReponseStructure_ToujoursMoyen);
export const fabriqueArbJamaisOse_ToujoursFrance_StructureGrand =
  fabriqueArbJamaisOse_ToujoursFrance(arbReponseStructure_ToujoursGrand);

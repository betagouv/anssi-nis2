import { fc } from "@fast-check/vitest";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  ValeursPetitMoyenGrand,
  ValeursTypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";

export const arbDesignationOperateurServicesEssentiels_ToujoursNon =
  fc.constant<DesignationOperateurServicesEssentiels>("non");
export const arbDesignationOperateurServicesEssentiels_ToujoursNeSaitPas =
  fc.constant<DesignationOperateurServicesEssentiels>("nsp");

export const arbAppartenancePaysUnionEuropeenne_ToujoursFrance =
  fc.constant<AppartenancePaysUnionEuropeenne>("france");
export const arbAppartenancePaysUnionEuropeenne_ToujoursAutreUe =
  fc.constant<AppartenancePaysUnionEuropeenne>("autre");
export const arbAppartenancePaysUnionEuropeenne_ToujoursHorsUe =
  fc.constant<AppartenancePaysUnionEuropeenne>("horsue");

export const arbTranchePetitMoyenGrand_ToutesValeurs = fc.constantFrom(
  ...ValeursPetitMoyenGrand
);
export const arbTranchePetitMoyenGrand_PetitMoyen = fc.constantFrom<
  "petit" | "moyen"
>("petit", "moyen");

export const arbTranchePetitMoyenGrand_ToujoursMoyen =
  fc.constant<"moyen">("moyen");
export const arbTranchePetitMoyenGrand_ToujoursGrand =
  fc.constant<"grand">("grand");
export const arbCategorieTaille_ToujoursMoyen = fc.constant("Moyen" as const);
export const arbCategorieTaille_ToujoursGrand = fc.constant("Grand" as const);
export const arbTypeStructure_Privee = fc.constant("privee" as const);
export const arbTypeStructure_Publique = fc.constant("publique" as const);
export const arbTypeEntitePublique = fc.constantFrom<TypeEntitePublique>(
  ...ValeursTypeEntitePublique
);

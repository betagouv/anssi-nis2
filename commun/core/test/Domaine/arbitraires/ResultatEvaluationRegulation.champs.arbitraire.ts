import { fc } from "@fast-check/vitest";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursPetitMoyenGrand } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";

export const arbDesignationOperateurServicesEssentiels_ToujoursOui =
  fc.constant<DesignationOperateurServicesEssentiels>("oui");
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
  ...ValeursPetitMoyenGrand,
);
export const arbTranchePetitMoyenGrand_MoyenGrand = fc.constantFrom(
  "moyen" as const,
  "grand" as const,
);

export const arbLocalisationRepresentant_JamaisFrance = fc.constantFrom(
  "autre" as const,
  "horsue" as const,
);
export const arbLocalisationRepresentant_ToujoursFrance = fc.constant(
  "france" as const,
);
export const arbLocalisationRepresentant_ToujoursAutre = fc.constant(
  "autre" as const,
);
export const arbLocalisationRepresentant_ToujoursHorsUE = fc.constant(
  "horsue" as const,
);
export const arbFournitServiceUnionEuropeenne_ToujoursOui = fc.constant(
  "oui" as const,
);
export const arbFournitServiceUnionEuropeenne_ToujoursNon = fc.constant(
  "non" as const,
);
export const arbCategorieTaille_Grand = fc.constant("Grand" as const);
export const arbTypeStructure_Privee = fc.constant("privee" as const);
export const arbTypeStructure_Publique = fc.constant("publique" as const);

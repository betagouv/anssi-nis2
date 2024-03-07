import { fc } from "@fast-check/vitest";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  FournitServicesUnionEuropeenne,
  TypeEntitePublique,
  TypeStructure,
  UnionPetitMoyenGrand,
  ValeurChampSimulateur,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  ValeursappartenancePaysUnionEuropeenne,
  ValeursPetitMoyenGrand,
  ValeursTypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { fabriqueArbSingleton } from "../../utilitaires/manipulationArbitraires.fabriques";

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
export const arbTranchePetitMoyenGrand_PetitMoyen = fc.constantFrom<
  "petit" | "moyen"
>("petit", "moyen");

export const arbTranchePetitMoyenGrand_ToujoursMoyen =
  fc.constant<"moyen">("moyen");
export const arbTranchePetitMoyenGrand_ToujoursGrand =
  fc.constant<"grand">("grand");

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
export const arbCategorieTaille_ToujoursMoyen = fc.constant("Moyen" as const);
export const arbCategorieTaille_ToujoursGrand = fc.constant("Grand" as const);
export const arbTypeStructure_Privee = fc.constant("privee" as const);
export const arbTypeStructure_Publique = fc.constant("publique" as const);
export const arbTypeEntitePublique = fc.constantFrom<TypeEntitePublique>(
  ...ValeursTypeEntitePublique,
);
export const arbDesigneOperateurServicesEssentiels: ArbitraireChampFormulaire<DesignationOperateurServicesEssentiels> =
  {
    oui: fc.constant<DesignationOperateurServicesEssentiels[]>(["oui"]),
    non: fc.constant<DesignationOperateurServicesEssentiels[]>(["non"]),
    nsp: fc.constant<DesignationOperateurServicesEssentiels[]>(["nsp"]),
  };
export const arbTypeStructure: ArbitraireChampFormulaire<TypeStructure> = {
  privee: fc.constant<TypeStructure[]>(["privee"]),
  publique: fc.constant<TypeStructure[]>(["publique"]),
};
export const arbTranche: ArbitraireChampFormulaire<UnionPetitMoyenGrand> = {
  petit: fc.constant<UnionPetitMoyenGrand[]>(["petit"]),
  moyen: fc.constant<UnionPetitMoyenGrand[]>(["moyen"]),
  grand: fc.constant<UnionPetitMoyenGrand[]>(["grand"]),
};
export const arbappartenancePaysUnionEuropeenne: ArbitraireChampFormulaire<
  AppartenancePaysUnionEuropeenne,
  "franceOuAutre" | "tout" | "horsFrance"
> = {
  france: fc.constant(["france"]),
  horsue: fc.constant(["horsue"]),
  autre: fc.constant(["autre"]),
  franceOuAutre: fabriqueArbSingleton(["france", "autre"]),
  horsFrance: fabriqueArbSingleton(["horsue", "autre"]),
  tout: fabriqueArbSingleton(ValeursappartenancePaysUnionEuropeenne),
};
export const arbLocalisationRepresentant = arbappartenancePaysUnionEuropeenne;
export const arbFournitServiceUnionEuropeenne: ArbitraireChampFormulaire<FournitServicesUnionEuropeenne> =
  {
    non: fc.constant<FournitServicesUnionEuropeenne[]>(["non"]),
    oui: fc.constant<FournitServicesUnionEuropeenne[]>(["oui"]),
  };
export type ArbitraireChampFormulaire<
  T extends ValeurChampSimulateur,
  TypesAdditionnelles extends string = T,
> = Record<T | TypesAdditionnelles, fc.Arbitrary<T[]>>;

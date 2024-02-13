import { fc } from "@fast-check/vitest";
import {
  appartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  FournitServicesUnionEuropeenne,
  TypeEntitePublique,
  TypeStructure,
  UnionPetitMoyenGrand,
  ValeurChampSimulateur,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursappartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";

import { fabriqueArbSingleton } from "../../utilitaires/manipulationArbitraires.fabriques";

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
export const arbTypeEntitePublique: ArbitraireChampFormulaire<TypeEntitePublique> =
  {
    administrationCentrale: fc.constant<TypeEntitePublique[]>([
      "administrationCentrale",
    ]),
    collectiviteTerritoriale: fc.constant<TypeEntitePublique[]>([
      "collectiviteTerritoriale",
    ]),
    autreStructurePublique: fc.constant<TypeEntitePublique[]>([
      "autreStructurePublique",
    ]),
  };
export const arbTranche: ArbitraireChampFormulaire<UnionPetitMoyenGrand> = {
  petit: fc.constant<UnionPetitMoyenGrand[]>(["petit"]),
  moyen: fc.constant<UnionPetitMoyenGrand[]>(["moyen"]),
  grand: fc.constant<UnionPetitMoyenGrand[]>(["grand"]),
};
export const arbappartenancePaysUnionEuropeenne: ArbitraireChampFormulaire<
  appartenancePaysUnionEuropeenne,
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

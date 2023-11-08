import { fc } from "@fast-check/vitest";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TypeEntitePublique,
  TypeStructure,
  UnionPetitMoyenGrand,
} from "../../../src/Domaine/Simulateur/ChampsSimulateur.definitions";
import { ArbitraireChampFormulaire } from "./arbitraireChampFormulaire.d";
import { fabriqueArbSingleton } from "../../utilitaires/manipulationArbitraires";

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
export const arbAppartenancePaysUnionEuropeenne: ArbitraireChampFormulaire<
  AppartenancePaysUnionEuropeenne,
  "franceOuAutre"
> = {
  france: fc.constant(["france"]),
  horsue: fc.constant(["horsue"]),
  autre: fc.constant(["autre"]),
  franceOuAutre: fabriqueArbSingleton(["france", "autre"]),
};

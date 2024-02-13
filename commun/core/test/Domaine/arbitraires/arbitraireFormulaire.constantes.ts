import { fc } from "@fast-check/vitest";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";

export const arbFormulaireVide: ArbitraireFormulaire = fc.record({
  activites: fc.constant([]),
  designationOperateurServicesEssentiels: fc.constant([]),
  appartenancePaysUnionEuropeenne: fc.constant([]),
  fournitServicesUnionEuropeenne: fc.constant([]),
  localisationRepresentant: fc.constant([]),
  secteurActivite: fc.constant([]),
  sousSecteurActivite: fc.constant([]),
  trancheChiffreAffaire: fc.constant([]),
  trancheNombreEmployes: fc.constant([]),
  typeEntitePublique: fc.constant([]),
  typeStructure: fc.constant([]),
});

import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";

export const arbFormulaireVide: fc.Arbitrary<DonneesFormulaireSimulateur> =
  fc.record({
    activites: fc.constant([]),
    designationOperateurServicesEssentiels: fc.constant([]),
    appartenancePaysUnionEuropeenne: fc.constant([]),
    secteurActivite: fc.constant([]),
    sousSecteurActivite: fc.constant([]),
    trancheChiffreAffaire: fc.constant([]),
    trancheNombreEmployes: fc.constant([]),
    typeEntitePublique: fc.constant([]),
    typeStructure: fc.constant([]),
    localisationFournitureServicesNumeriques: fc.constant([]),
    paysDecisionsCyber: fc.constant([]),
    paysOperationsCyber: fc.constant([]),
    paysPlusGrandNombreSalaries: fc.constant([]),
  });

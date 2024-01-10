import { fc } from "@fast-check/vitest";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../src/Domain/Simulateur/DonneesFormulaire.definitions";

export type ArbitraireFormulaire = fc.Arbitrary<DonneesFormulaireSimulateur>;
export type ArbitraireSurTousLesChamps = Record<
  NomsChampsSimulateur,
  ArbitraireFormulaire
>;

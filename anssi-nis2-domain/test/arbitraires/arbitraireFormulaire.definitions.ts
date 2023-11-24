import { fc } from "@fast-check/vitest";
import {
  IDonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../src/Simulateur/DonneesFormulaire";

export type ArbitraireFormulaire = fc.Arbitrary<IDonneesFormulaireSimulateur>;
export type ArbitraireSurTousLesChamps = Record<
  NomsChampsSimulateur,
  ArbitraireFormulaire
>;
import { fc } from "@fast-check/vitest";
import {
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";


export type ArbitraireFormulaire = fc.Arbitrary<IDonneesBrutesFormulaireSimulateur>;
export type ArbitraireSurTousLesChamps = Record<
  NomsChampsSimulateur,
  ArbitraireFormulaire
>;

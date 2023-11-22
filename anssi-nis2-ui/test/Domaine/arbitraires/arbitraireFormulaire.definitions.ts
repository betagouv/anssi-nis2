import { fc } from "@fast-check/vitest";
import { IDonneesFormulaireSimulateur } from "../../../src/Domaine/Simulateur/DonneesFormulaire";

export type ArbitraireFormulaire = fc.Arbitrary<IDonneesFormulaireSimulateur>;

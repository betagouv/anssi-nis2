import { fc } from "@fast-check/vitest";
import {
  IDonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire";

export type ArbitraireFormulaire = fc.Arbitrary<IDonneesFormulaireSimulateur>;
export type ArbitraireSurTousLesChamps = Record<
  NomsChampsSimulateur,
  ArbitraireFormulaire
>;

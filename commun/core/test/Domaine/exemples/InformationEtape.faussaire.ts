import { vi } from "vitest";
import { TypeEtape } from "../../../src/Domain/Simulateur/InformationsEtape";
import { ValidationReponses } from "../../../src/Domain/Simulateur/services/ChampSimulateur/champs.domaine";

export const fausseValidationReponse: ValidationReponses = {
  message: "Fausse validation",
  validateur: vi.fn(),
};
export const FauxSimulateurEtapeComposant: TypeEtape =
  "designationOperateurServicesEssentiels";

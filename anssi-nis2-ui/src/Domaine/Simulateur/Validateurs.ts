import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "./DonneesFormulaire.ts";

export const valideAuMoinsUn =
  (nomChamp: NomsChampsSimulateur) =>
  (donneesFormulaireSimulateur: DonneesFormulaireSimulateur) =>
    donneesFormulaireSimulateur[nomChamp].length > 0;

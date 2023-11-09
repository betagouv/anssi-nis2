import { jest } from "@storybook/jest";
import { IDonneesBrutesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

export const mockSendFormData = jest.fn(
  async (donnees: IDonneesBrutesFormulaireSimulateur) =>
    console.log(
      "Appel de mockSendFormData avec arguments: ",
      JSON.stringify(donnees),
    ),
);

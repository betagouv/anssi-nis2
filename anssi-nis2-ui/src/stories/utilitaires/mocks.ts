import { jest } from "@storybook/jest";
import { IDonneesBrutesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

export const mockSendFormData = jest.fn(
  async (donnees: IDonneesBrutesFormulaireSimulateur) => {
    const donneesEnvoyees = JSON.stringify(donnees);
    console.log("Appel de mockSendFormData avec arguments: ", donneesEnvoyees);
    return donneesEnvoyees;
  },
);

import { jest } from "@storybook/jest";
import {
  AggregatInformationsEmail,
  InformationsEmail,
} from "../../../../commun/core/src/Domain/Contact/InformationsEmail.definitions.ts";
import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";

export const mockSendFormData = jest.fn(
  async (donnees: DonneesFormulaireSimulateur) => {
    const donneesEnvoyees = JSON.stringify(donnees);
    console.log("Appel de mockSendFormData avec arguments: ", donneesEnvoyees);
    return donneesEnvoyees;
  },
);
export const mockEnregistreInformationsEmail = jest.fn(
  async (informations: InformationsEmail) => {
    const donneesEnvoyees = JSON.stringify(informations);
    console.log(
      "Appel de mockEnregistreInformationsEmail avec arguments: ",
      donneesEnvoyees,
    );
    return { ...informations, id: 0 } as AggregatInformationsEmail;
  },
);

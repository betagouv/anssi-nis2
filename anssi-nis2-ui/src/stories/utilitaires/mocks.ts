import { jest } from "@storybook/jest";
import { IDonneesBrutesFormulaireSimulateur } from "../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import {
  AggregatInformationsEmail,
  InformationsEmail
} from "../../../../anssi-nis2-domain/src/Contact/InformationsEmail.definitions";

export const mockSendFormData = jest.fn(
  async (donnees: IDonneesBrutesFormulaireSimulateur) => {
    const donneesEnvoyees = JSON.stringify(donnees);
    console.log("Appel de mockSendFormData avec arguments: ", donneesEnvoyees);
    return donneesEnvoyees;
  }
);
export const mockEnregistreInformationsEmail = jest.fn(
  async (informations: InformationsEmail) => {
    const donneesEnvoyees = JSON.stringify(informations);
    console.log(
      "Appel de mockEnregistreInformationsEmail avec arguments: ",
      donneesEnvoyees
    );
    return { ...informations, id: 0 } as AggregatInformationsEmail;
  }
);

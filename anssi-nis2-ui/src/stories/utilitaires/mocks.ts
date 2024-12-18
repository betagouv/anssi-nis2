import { jest } from "@storybook/jest";
import {
  AggregatInformationsEmail,
  InformationsEmail,
} from "../../InformationsEmail/InformationsEmail.ts";

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

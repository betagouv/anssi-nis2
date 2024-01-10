import { StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
import { within } from "@storybook/testing-library";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";

export const scenarioEtapeSecteurFabricationSuivant: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement, step }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);

  step("Va jusqu'à l'étape Secteurs d'activité", async () => {
    await cliqueSurDebuterLeTest(canvas);

    await passeEtape([["designeOperateurServicesEssentiels", "oui"]]);
    await passeEtape([["appartenancePaysUnionEurpopeenne", "france"]]);
    await passeEtape([
      ["typeStructure", "publique"],
      ["typeEntitePublique", "administrationCentrale"],
    ]);
    await passeEtape([["trancheNombreEmployes", "petit"]]);
  });

  await passeEtape([["secteurActivite", "fabrication"]]);
};

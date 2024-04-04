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
>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);

  await cliqueSurDebuterLeTest(canvas);

  await passeEtape([["designationOperateurServicesEssentiels", "oui"]]);
  await passeEtape([["appartenancePaysUnionEuropeenne", "france"]]);
  await passeEtape([["typeStructure", "privee"]]);
  await passeEtape([
    ["trancheNombreEmployes", "grand"],
    ["trancheChiffreAffaire", "grand"],
  ]);

  await passeEtape([["secteurActivite", "fabrication"]]);
};

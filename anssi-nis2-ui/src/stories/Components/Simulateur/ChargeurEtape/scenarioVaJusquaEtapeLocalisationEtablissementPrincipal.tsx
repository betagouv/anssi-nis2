import { StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { within } from "@storybook/testing-library";

export const scenarioVaJusquaEtapeLocalisationEtablissementPrincipal: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);

  await cliqueSurDebuterLeTest(canvas);

  await passeEtape([["designationOperateurServicesEssentiels", "non"]]);
  await passeEtape([["appartenancePaysUnionEuropeenne", "france"]]);
  await passeEtape([["typeStructure", "privee"]]);

  await passeEtape([
    ["trancheNombreEmployes", "petit"],
    ["trancheChiffreAffaire", "petit"],
  ]);
  await passeEtape([["secteurActivite", "infrastructureNumerique"]]);
  await passeEtape([["activites", "registresNomsDomainesPremierNiveau"]]);
};

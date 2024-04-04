import { expect } from "@storybook/jest";
import { StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { fabriqueDonneesFormulaire } from "../../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique.ts";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";

export const scenarioDerniereEtapeEstResultat: StoryObj<
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
    ["trancheNombreEmployes", "petit"],
    ["trancheChiffreAffaire", "petit"],
  ]);
  await passeEtape([["secteurActivite", "espace"]]);
  await passeEtape([
    [
      "activites",
      "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
    ],
  ]);

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    expect.objectContaining(
      fabriqueDonneesFormulaire({
        activites: [
          "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
        ],
        designationOperateurServicesEssentiels: ["oui"],
        appartenancePaysUnionEuropeenne: ["france"],
        secteurActivite: ["espace"],
        sousSecteurActivite: [],
        trancheChiffreAffaire: ["petit"],
        trancheNombreEmployes: ["petit"],
        typeStructure: ["privee"],
      }),
    ),
  );
};

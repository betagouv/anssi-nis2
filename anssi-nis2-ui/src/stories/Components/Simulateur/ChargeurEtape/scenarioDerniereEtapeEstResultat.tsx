import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
import { contenusResultatEligiblePetitEntreprise } from "../../../../References/contenusResultatEligibilite.ts";
import { DonneesFormulaireSimulateur } from "../../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";

export const scenarioDerniereEtapeEstResultat: StoryObj<typeof ChargeurEtape>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);

  await cliqueSurDebuterLeTest(canvas);

  await passeEtape([["designeOperateurServicesEssentiels", "oui"]]);
  await passeEtape([["etatMembre", "france"]]);
  await passeEtape([["typeStructure", "privee"]]);

  await passeEtape([
    ["trancheNombreEmployes", "petit"],
    ["trancheCA", "petit"],
  ]);
  await passeEtape([["secteurActivite", "espace"]]);
  await passeEtape([
    [
      "activites",
      "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
    ],
  ]);

  await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    new DonneesFormulaireSimulateur({
      activites: [
        "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
      ],
      designeOperateurServicesEssentiels: ["oui"],
      etatMembre: ["france"],
      secteurActivite: ["espace"],
      sousSecteurActivite: [],
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
    })
  );
};

import { StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
import { contenusResultatEligiblePetitEntreprise } from "../../../../References/contenusResultatEligibilite.ts";
import { DonneesFormulaireSimulateur } from "../../../../Domaine/Simulateur/DonneesFormulaire.ts";

export const scenarioIgnoreEtapeActivitePourSecteurActiviteAutre: StoryObj<typeof ChargeurEtape>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);

  await cliqueSurDebuterLeTest(canvas);

  await passeEtape([
    ["designeOperateurServicesEssentiels", "oui"],
  ]);
  await passeEtape([["etatMembre", "france"]]);
  await passeEtape([["typeStructure", "privee"]]);

  await passeEtape([
    ["trancheNombreEmployes", "petit"],
    ["trancheCA", "petit"],
  ]);
  await passeEtape([["secteurActivite", "autreSecteurActivite"]]);

  await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    new DonneesFormulaireSimulateur({
      activites: [],
      designeOperateurServicesEssentiels: ["oui"],
      etatMembre: ["france"],
      secteurActivite: ["autreSecteurActivite"],
      sousSecteurActivite: [],
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
    })
  );
};

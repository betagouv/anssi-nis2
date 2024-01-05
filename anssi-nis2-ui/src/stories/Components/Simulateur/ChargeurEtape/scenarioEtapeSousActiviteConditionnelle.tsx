import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
  cocheEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
import { contenusResultatEligiblePetitEntreprise } from "../../../../References/contenusResultatEligibilite.ts";
import { DonneesFormulaireSimulateur } from "../../../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.ts";
import { StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";

export const scenarioEtapeSousActiviteConditionnelle: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement, step }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);
  const passeEtapeValidableAvecUnSeulCheck = cocheEtPasseEtape(1)(canvas);

  step("Va jusqu'à l'étape Secteurs d'activité", async () => {
    await cliqueSurDebuterLeTest(canvas);
    await passeEtape([["designeOperateurServicesEssentiels", "oui"]]);
    await passeEtape([["etatMembre", "france"]]);
    await passeEtape([["typeStructure", "privee"]]);
    await passeEtape([
      ["trancheNombreEmployes", "petit"],
      ["trancheCA", "petit"],
    ]);
  });

  await passeEtape([["secteurActivite", "energie"]]);
  await expect(mockSendFormData).not.toHaveBeenCalled();

  await canvas.findByText("Précisez les sous-secteurs concernés :");
  await passeEtapeValidableAvecUnSeulCheck([
    ["sousSecteurActivite", "electricite"],
    ["sousSecteurActivite", "gaz"],
  ]);
  await expect(mockSendFormData).not.toHaveBeenCalled();

  await passeEtape([
    ["activites", "entrepriseElectriciteRemplissantFonctionFourniture"],
    ["activites", "gestionnaireReseauDistribution"],
  ]);
  await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    new DonneesFormulaireSimulateur({
      activites: [
        "entrepriseElectriciteRemplissantFonctionFourniture",
        "gestionnaireReseauDistribution",
      ],
      designeOperateurServicesEssentiels: ["oui"],
      etatMembre: ["france"],
      secteurActivite: ["energie"],
      sousSecteurActivite: ["electricite", "gaz"],
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
    }),
  );
};

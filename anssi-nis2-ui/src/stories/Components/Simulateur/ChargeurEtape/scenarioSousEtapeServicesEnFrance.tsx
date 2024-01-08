import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { nettoieBrMd } from "../../../../Services/Markdown/nettoieMarkdown.operation.ts";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
import { contenusResultatEligiblePetitEntreprise } from "../../../../References/contenusResultatEligibilite.ts";
import { DonneesFormulaireSimulateur } from "../../../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.ts";
import { StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";

export const scenarioSousEtapeServicesEnFrance: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement, step }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);

  step("Va jusqu'à l'étape Secteurs d'activité", async () => {
    await cliqueSurDebuterLeTest(canvas);
    await passeEtape([["designeOperateurServicesEssentiels", "non"]]);
    await passeEtape([["etatMembre", "france"]]);
    await passeEtape([["typeStructure", "privee"]]);
    await passeEtape([
      ["trancheNombreEmployes", "petit"],
      ["trancheCA", "petit"],
    ]);
  });

  await passeEtape([["secteurActivite", "infrastructureNumerique"]]);
  await expect(mockSendFormData).not.toHaveBeenCalled();

  await passeEtape([["activites", "fournisseurServicesDNS"]]);

  await passeEtape([
    ["fournitServicesUnionEuropeenne", "oui"],
    ["localisationRepresentant", "france"],
  ]);

  await canvas.findByText(
    nettoieBrMd(contenusResultatEligiblePetitEntreprise.titre),
  );

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    new DonneesFormulaireSimulateur({
      activites: ["fournisseurServicesDNS"],
      designeOperateurServicesEssentiels: ["non"],
      etatMembre: ["france"],
      secteurActivite: ["infrastructureNumerique"],
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
      fournitServicesUnionEuropeenne: ["oui"],
      localisationRepresentant: ["france"],
    }),
  );
};

import { StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
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
import { TypeStructure } from "../../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";

export const scenarioTypeEntitePublique: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const typeStructure: TypeStructure = "publique";

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);

  await cliqueSurDebuterLeTest(canvas);
  await passeEtape([["designeOperateurServicesEssentiels", "oui"]]);
  await passeEtape([["etatMembre", "france"]]);
  await passeEtape([
    ["typeStructure", typeStructure],
    ["typeEntitePublique", "administrationCentrale"],
  ]);

  await passeEtape([["trancheNombreEmployes", "petit"]]);
  await passeEtape([["secteurActivite", "energie"]]);
  await passeEtape([["sousSecteurActivite", "autreSousSecteurEnergie"]]);

  await canvas.findByText(
    nettoieBrMd(contenusResultatEligiblePetitEntreprise.titre),
  );

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    new DonneesFormulaireSimulateur({
      activites: [],
      designeOperateurServicesEssentiels: ["oui"],
      etatMembre: ["france"],
      secteurActivite: ["energie"],
      sousSecteurActivite: ["autreSousSecteurEnergie"],
      trancheCA: [],
      trancheNombreEmployes: ["petit"],
      typeStructure: [typeStructure],
      typeEntitePublique: ["administrationCentrale"],
    }),
  );
};

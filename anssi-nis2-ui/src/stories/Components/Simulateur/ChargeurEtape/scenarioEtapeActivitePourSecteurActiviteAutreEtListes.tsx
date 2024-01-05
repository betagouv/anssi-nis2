import { StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
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

export const scenarioEtapeActivitePourSecteurActiviteAutreEtListes: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);
  const passeEtapeValidableAvecUnSeulCheck = cocheEtPasseEtape(1)(canvas);

  await cliqueSurDebuterLeTest(canvas);

  await passeEtape([["designeOperateurServicesEssentiels", "oui"]]);
  await passeEtape([["etatMembre", "france"]]);
  await passeEtape([["typeStructure", "privee"]]);

  await passeEtape([
    ["trancheNombreEmployes", "petit"],
    ["trancheCA", "petit"],
  ]);
  await passeEtapeValidableAvecUnSeulCheck([
    ["secteurActivite", "eauPotable"],
    ["secteurActivite", "autreSecteurActivite"],
  ]);
  await passeEtape([
    ["activites", "fournisseursDistributeursEauxConsommation"],
  ]);

  await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    new DonneesFormulaireSimulateur({
      activites: ["fournisseursDistributeursEauxConsommation"],
      designeOperateurServicesEssentiels: ["oui"],
      etatMembre: ["france"],
      secteurActivite: ["eauPotable", "autreSecteurActivite"],
      sousSecteurActivite: [],
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
    }),
  );
};

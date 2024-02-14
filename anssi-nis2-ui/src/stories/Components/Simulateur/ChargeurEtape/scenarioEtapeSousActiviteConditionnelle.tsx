import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { fabriqueDonneesFormulaire } from "../../../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";

import { libelleTitreRegule } from "../../../../References/LibellesResultatsEligibilite.ts";
import { nettoieBrMd } from "../../../../Services/Markdown/TransformeMarkdown.operations.ts";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
  cocheEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
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
    await passeEtape([["designationOperateurServicesEssentiels", "oui"]]);
    await passeEtape([["appartenancePaysUnionEuropeenne", "france"]]);
    await passeEtape([["typeStructure", "privee"]]);
    await passeEtape([
      ["trancheNombreEmployes", "petit"],
      ["trancheChiffreAffaire", "petit"],
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

  await canvas.findByText(nettoieBrMd(libelleTitreRegule));

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    fabriqueDonneesFormulaire({
      activites: [
        "entrepriseElectriciteRemplissantFonctionFourniture",
        "gestionnaireReseauDistribution",
      ],
      designationOperateurServicesEssentiels: ["oui"],
      appartenancePaysUnionEuropeenne: ["france"],
      secteurActivite: ["energie"],
      sousSecteurActivite: ["electricite", "gaz"],
      trancheChiffreAffaire: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
    }),
  );
};

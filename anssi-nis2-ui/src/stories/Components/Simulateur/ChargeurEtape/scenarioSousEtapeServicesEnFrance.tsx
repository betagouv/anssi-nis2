import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { fabriqueDonneesFormulaire } from "../../../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";

import { libelleTitreRegule } from "../../../../References/LibellesResultatsEligibilite.ts";
import { nettoieBrMd } from "../../../../Services/Markdown/TransformeMarkdown.operations.ts";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
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
    await passeEtape([["appartenancePaysUnionEurpopeenne", "france"]]);
    await passeEtape([["typeStructure", "privee"]]);
    await passeEtape([
      ["trancheNombreEmployes", "petit"],
      ["trancheChiffreAffaire", "petit"],
    ]);
  });

  await passeEtape([["secteurActivite", "infrastructureNumerique"]]);
  await expect(mockSendFormData).not.toHaveBeenCalled();

  await passeEtape([["activites", "fournisseurServicesDNS"]]);

  await passeEtape([
    ["fournitServicesUnionEuropeenne", "oui"],
    ["localisationRepresentant", "france"],
  ]);

  await canvas.findByText(nettoieBrMd(libelleTitreRegule));

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    fabriqueDonneesFormulaire({
      activites: ["fournisseurServicesDNS"],
      designeOperateurServicesEssentiels: ["non"],
      appartenancePaysUnionEurpopeenne: ["france"],
      secteurActivite: ["infrastructureNumerique"],
      trancheChiffreAffaire: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
      fournitServicesUnionEuropeenne: ["oui"],
      localisationRepresentant: ["france"],
    }),
  );
};

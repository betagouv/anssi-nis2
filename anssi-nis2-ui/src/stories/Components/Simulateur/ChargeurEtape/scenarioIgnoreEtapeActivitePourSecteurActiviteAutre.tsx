import { StoryObj } from "@storybook/react";
import { fabriqueDonneesFormulaire } from "../../../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { libelleTitreRegule } from "../../../../References/LibellesResultatsEligibilite.ts";
import { nettoieBrMd } from "../../../../Services/Markdown/TransformeMarkdown.operations.ts";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";

export const scenarioIgnoreEtapeActivitePourSecteurActiviteAutre: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);

  await cliqueSurDebuterLeTest(canvas);

  await passeEtape([["designeOperateurServicesEssentiels", "oui"]]);
  await passeEtape([["appartenancePaysUnionEurpopeenne", "france"]]);
  await passeEtape([["typeStructure", "privee"]]);

  await passeEtape([
    ["trancheNombreEmployes", "petit"],
    ["trancheChiffreAffaire", "petit"],
  ]);
  await passeEtape([["secteurActivite", "autreSecteurActivite"]]);

  await canvas.findByText(nettoieBrMd(libelleTitreRegule));

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    fabriqueDonneesFormulaire({
      activites: [],
      designeOperateurServicesEssentiels: ["oui"],
      appartenancePaysUnionEurpopeenne: ["france"],
      secteurActivite: ["autreSecteurActivite"],
      sousSecteurActivite: [],
      trancheChiffreAffaire: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
    }),
  );
};

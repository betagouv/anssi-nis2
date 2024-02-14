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
  cocheEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";

export const scenarioEtapeActivitePourSecteurActiviteAutreEtListes: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);
  const passeEtapeValidableAvecUnSeulCheck = cocheEtPasseEtape(1)(canvas);

  await cliqueSurDebuterLeTest(canvas);

  await passeEtape([["designationOperateurServicesEssentiels", "oui"]]);
  await passeEtape([["appartenancePaysUnionEuropeenne", "france"]]);
  await passeEtape([["typeStructure", "privee"]]);

  await passeEtape([
    ["trancheNombreEmployes", "petit"],
    ["trancheChiffreAffaire", "petit"],
  ]);
  await passeEtapeValidableAvecUnSeulCheck([
    ["secteurActivite", "eauPotable"],
    ["secteurActivite", "autreSecteurActivite"],
  ]);
  await passeEtape([
    ["activites", "fournisseursDistributeursEauxConsommation"],
  ]);

  await canvas.findByText(nettoieBrMd(libelleTitreRegule));

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    fabriqueDonneesFormulaire({
      activites: ["fournisseursDistributeursEauxConsommation"],
      designationOperateurServicesEssentiels: ["oui"],
      appartenancePaysUnionEuropeenne: ["france"],
      secteurActivite: ["eauPotable", "autreSecteurActivite"],
      sousSecteurActivite: [],
      trancheChiffreAffaire: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
    }),
  );
};

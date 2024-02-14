import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Activite } from "../../../../../../commun/core/src/Domain/Simulateur/Activite.definitions.ts";
import { fabriqueDonneesFormulaire } from "../../../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";
import { SecteurActivite } from "../../../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";

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

  const trancheCA = "grand";
  const trancheNbEmp = "petit";
  const secteur: SecteurActivite = "gestionServicesTic";
  const activite: Activite = "fournisseurServicesGeres";
  step("Va jusqu'à l'étape Secteurs d'activité", async () => {
    await cliqueSurDebuterLeTest(canvas);
    await passeEtape([["designationOperateurServicesEssentiels", "non"]]);
    await passeEtape([["appartenancePaysUnionEuropeenne", "france"]]);
    await passeEtape([["typeStructure", "privee"]]);
    await passeEtape([
      ["trancheNombreEmployes", trancheNbEmp],
      ["trancheChiffreAffaire", trancheCA],
    ]);
  });

  await passeEtape([["secteurActivite", secteur]]);
  await expect(mockSendFormData).not.toHaveBeenCalled();

  await passeEtape([["activites", activite]]);

  await passeEtape([
    ["fournitServicesUnionEuropeenne", "oui"],
    ["localisationRepresentant", "france"],
  ]);

  await canvas.findByText(nettoieBrMd(libelleTitreRegule));

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    fabriqueDonneesFormulaire({
      activites: [activite],
      designationOperateurServicesEssentiels: ["non"],
      appartenancePaysUnionEuropeenne: ["france"],
      secteurActivite: [secteur],
      trancheChiffreAffaire: [trancheCA],
      trancheNombreEmployes: [trancheNbEmp],
      typeStructure: ["privee"],
      fournitServicesUnionEuropeenne: ["oui"],
      localisationRepresentant: ["france"],
    }),
  );
};

import { StoryObj } from "@storybook/react";
import { fabriqueDonneesFormulaire } from "../../../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { libelleTitreReguleEntiteEssentielle } from "../../../../References/LibellesResultatsEligibilite.ts";
import { nettoieBrMd } from "../../../../Services/Markdown/TransformeMarkdown.operations.ts";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
import { TypeStructure } from "../../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";

export const scenarioTypeEntitePublique: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const typeStructure: TypeStructure = "publique";

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);

  await cliqueSurDebuterLeTest(canvas);
  await passeEtape([["designationOperateurServicesEssentiels", "oui"]]);
  await passeEtape([["appartenancePaysUnionEuropeenne", "france"]]);
  await passeEtape([
    ["typeStructure", typeStructure],
    ["typeEntitePublique", "administrationCentrale"],
  ]);

  await passeEtape([["trancheNombreEmployes", "petit"]]);
  await passeEtape([["secteurActivite", "energie"]]);
  await passeEtape([["sousSecteurActivite", "autreSousSecteurEnergie"]]);

  await canvas.findByText(nettoieBrMd(libelleTitreReguleEntiteEssentielle));

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    fabriqueDonneesFormulaire({
      activites: [],
      designationOperateurServicesEssentiels: ["oui"],
      appartenancePaysUnionEuropeenne: ["france"],
      secteurActivite: ["energie"],
      sousSecteurActivite: ["autreSousSecteurEnergie"],
      trancheChiffreAffaire: [],
      trancheNombreEmployes: ["petit"],
      typeStructure: [typeStructure],
      typeEntitePublique: ["administrationCentrale"],
    }),
  );
};

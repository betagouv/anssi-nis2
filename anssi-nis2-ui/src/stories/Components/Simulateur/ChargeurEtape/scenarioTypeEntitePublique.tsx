import { StoryObj } from "@storybook/react";
import { fabriqueDonneesFormulaire } from "../../../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";
import { PrecisionsResultatRegulation } from "../../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { nettoieBrMd } from "../../../../Services/Markdown/TransformeMarkdown.operations.ts";
import {
  cliqueSurDebuterLeTest,
  cocheAuMoinsUnEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
import { titresPourPrecisionResultat } from "../../../../References/contenusResultatEligibilite.ts";
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
  await passeEtape([["appartenancePaysUnionEurpopeenne", "france"]]);
  await passeEtape([
    ["typeStructure", typeStructure],
    ["typeEntitePublique", "administrationCentrale"],
  ]);

  await passeEtape([["trancheNombreEmployes", "petit"]]);
  await passeEtape([["secteurActivite", "energie"]]);
  await passeEtape([["sousSecteurActivite", "autreSousSecteurEnergie"]]);

  await canvas.findByText(
    nettoieBrMd(
      titresPourPrecisionResultat[PrecisionsResultatRegulation.ReguleStandard],
    ),
  );

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    fabriqueDonneesFormulaire({
      activites: [],
      designeOperateurServicesEssentiels: ["oui"],
      appartenancePaysUnionEurpopeenne: ["france"],
      secteurActivite: ["energie"],
      sousSecteurActivite: ["autreSousSecteurEnergie"],
      trancheChiffreAffaire: [],
      trancheNombreEmployes: ["petit"],
      typeStructure: [typeStructure],
      typeEntitePublique: ["administrationCentrale"],
    }),
  );
};

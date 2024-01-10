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
  cocheEtPasseEtape,
} from "../../../utilitaires/Simulateur.actions.ts";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";
import { titresPourPrecisionResultat } from "../../../../References/contenusResultatEligibilite.ts";

export const scenarioEtapeActivitePourSecteurActiviteAutreEtListes: StoryObj<
  typeof ChargeurEtape
>["play"] = async ({ canvasElement }) => {
  mockSendFormData.mockClear();

  const canvas = within(canvasElement);
  const passeEtape = cocheAuMoinsUnEtPasseEtape(canvas);
  const passeEtapeValidableAvecUnSeulCheck = cocheEtPasseEtape(1)(canvas);

  await cliqueSurDebuterLeTest(canvas);

  await passeEtape([["designeOperateurServicesEssentiels", "oui"]]);
  await passeEtape([["appartenancePaysUnionEurpopeenne", "france"]]);
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

  await canvas.findByText(
    nettoieBrMd(
      titresPourPrecisionResultat[PrecisionsResultatRegulation.ReguleStandard],
    ),
  );

  await expect(mockSendFormData).toHaveBeenCalledTimes(1);
  await expect(mockSendFormData).toHaveBeenCalledWith(
    fabriqueDonneesFormulaire({
      activites: ["fournisseursDistributeursEauxConsommation"],
      designeOperateurServicesEssentiels: ["oui"],
      appartenancePaysUnionEurpopeenne: ["france"],
      secteurActivite: ["eauPotable", "autreSecteurActivite"],
      sousSecteurActivite: [],
      trancheChiffreAffaire: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
    }),
  );
};

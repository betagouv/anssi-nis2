import { nettoieBrMd } from "../../Services/Markdown/TransformeMarkdown.operations.ts";
import {
  BlocResultatSpecifiques,
  ContenusResultatEligibilite,
} from "../../Services/Simulateur/Props/ContenusResultatEligibilite.declaration.ts";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const titreDeSections: Record<BlocResultatSpecifiques, string> = {
  bienDebuterAvecPdf: "Pour bien débuter",
  enSavoirPlus: "En savoir plus",
  etMaintenant: "Et Maintenant ?",
};
export const verifieContenuResultatDansPage = async (
  canvasElement: HTMLElement,
  contenusResultat: ContenusResultatEligibilite,
) => {
  const canvas = within(canvasElement);
  const icone = canvasElement.querySelector(
    `span.${contenusResultat.classIcone}`,
  );
  expect(icone).toBeInTheDocument();

  expect(
    canvas.getByText(nettoieBrMd(contenusResultat.titre)),
  ).toBeInTheDocument();

  contenusResultat.blocs.has("etMaintenant") &&
    (await canvas.findByText(titreDeSections.etMaintenant));
  contenusResultat.blocs.has("enSavoirPlus") &&
    (await canvas.findByText(titreDeSections.enSavoirPlus));
  contenusResultat.blocs.has("bienDebuterAvecPdf") &&
    (await canvas.findByText(titreDeSections.bienDebuterAvecPdf));
};

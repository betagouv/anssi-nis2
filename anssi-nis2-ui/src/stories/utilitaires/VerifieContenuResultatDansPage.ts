import {
  BlocResultatSpecifiques,
  ContenusResultatEligibilite,
} from "../../Services/Simulateur/Props/contenusResultatEligibilite";
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
  expect(canvas.getByText(contenusResultat.titre)).toBeInTheDocument();
  expect(
    canvasElement.querySelector("div.fr-nis2-resultat")?.className,
  ).toContain(contenusResultat.classeDivResultat);

  contenusResultat.afficheBlocs.etMaintenant &&
    (await canvas.findByText(titreDeSections.etMaintenant));
  contenusResultat.afficheBlocs.enSavoirPlus &&
    (await canvas.findByText(titreDeSections.enSavoirPlus));
  contenusResultat.afficheBlocs.bienDebuterAvecPdf &&
    (await canvas.findByText(titreDeSections.bienDebuterAvecPdf));
};

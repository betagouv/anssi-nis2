import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { titreDeSections } from "../../../../References/LibellesResultatsEligibilite.ts";
import {
  BlocsAffiches,
  ValeursLigneResultatSpecifique,
} from "../../../../Services/Simulateur/Props/ContenusResultatEligibilite.declaration.ts";

export const verifieTitresSectionsPresentes = async (
  canvasElement: HTMLElement,
  sections: BlocsAffiches,
) => {
  const canvas = within(canvasElement);
  for (const nomLigne of ValeursLigneResultatSpecifique) {
    if (sections.has(nomLigne)) {
      await canvas.findByText(titreDeSections[nomLigne]);
    } else {
      await expect(
        canvas.queryByText(titreDeSections[nomLigne]),
      ).not.toBeInTheDocument();
    }
  }
};

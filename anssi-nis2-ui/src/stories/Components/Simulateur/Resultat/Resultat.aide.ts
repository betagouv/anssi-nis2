import { within } from "@storybook/testing-library";
import { titreDeSections } from "../../../../References/LibellesResultatsEligibilite.ts";
import { BlocsAffiches } from "../../../../Services/Simulateur/Props/ContenusResultatEligibilite.declaration.ts";

export const verifieTitresSectionsPresentes = async (
  canvasElement: HTMLElement,
  sections: BlocsAffiches,
) => {
  const canvas = within(canvasElement);
  sections.has("etMaintenant") &&
    (await canvas.findByText(titreDeSections.etMaintenant));
  sections.has("enSavoirPlus") &&
    (await canvas.findByText(titreDeSections.enSavoirPlus));
  sections.has("bienDebuter") &&
    (await canvas.findByText(titreDeSections.bienDebuter));
};

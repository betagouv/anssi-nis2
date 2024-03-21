import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { attendTexteCharge } from "../../../utilitaires/interaction.facilitateurs.ts";

export const verifieAucunBlocDepliable = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  expect(canvas.queryByText("Plus d'informations")).not.toBeInTheDocument();
  expect(canvas.queryByText("Moins d'informations")).not.toBeInTheDocument();
};
export const verifieIcone = (canvasElement: HTMLElement, classeIcone: string) =>
  expect(
    canvasElement.querySelector(`span.${classeIcone}`),
  ).toBeInTheDocument();
export const verifieClasseBlocResultat = (
  canvasElement: HTMLElement,
  classeAttendue: string,
) => {
  expect(
    canvasElement.querySelector("div.fr-nis2-resultat")?.className,
  ).toContain(classeAttendue);
};
export const verifieTexteEnAnnexe = async (
  canvasElement: HTMLElement,
  texteEnAnnexe: string,
) => {
  const canvas = within(canvasElement);
  await attendTexteCharge(canvasElement, texteEnAnnexe);
  expect(await canvas.findByText(texteEnAnnexe)).not.toBeVisible();

  await userEvent.click(await canvas.findByText("Plus d'informations"));
  await expect(canvas.queryByText(texteEnAnnexe)).toBeVisible();

  const moinsInformations = await canvas.findByText("Moins d'informations");
  await expect(moinsInformations).toBeVisible();
  await userEvent.click(moinsInformations);
  await expect(canvas.queryByText(texteEnAnnexe)).not.toBeVisible();
  await canvas.findByText("Plus d'informations");
};
export const verifieTexteAvertissementPresent = async (
  canvasElement: HTMLElement,
) => {
  const canvas = within(canvasElement);
  expect(await canvas.findByText("strictement indicatif"));
  expect(await canvas.findByText("susceptible d'évoluer"));
};
export const verifieTexteAvertissementAbsent = (canvasElement: HTMLElement) => {
  expect(
    within(canvasElement).queryByText("susceptible d'évoluer"),
  ).not.toBeInTheDocument();
};

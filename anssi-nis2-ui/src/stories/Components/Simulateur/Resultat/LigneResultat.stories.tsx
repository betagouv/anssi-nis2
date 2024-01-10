// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { PrecisionsResultatRegulation } from "../../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
import { LigneResultat } from "../../../../Components/Simulateur/Resultats/LigneResultat.tsx";
import { attendTexteCharge } from "../../../utilitaires/interaction.facilitateurs.ts";

const meta: Meta<typeof LigneResultat> = {
  title: "Composants/Simulateur/Ligne Résultat",
  component: LigneResultat,
};
export default meta;

type Story = StoryObj<typeof LigneResultat>;

const verifieAucunBlocDepliable = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  expect(canvas.queryByText("Plus d'informations")).not.toBeInTheDocument();
  expect(canvas.queryByText("Moins d'informations")).not.toBeInTheDocument();
};

const verifieIcone = (canvasElement: HTMLElement, classeIcone: string) =>
  expect(
    canvasElement.querySelector(`span.${classeIcone}`),
  ).toBeInTheDocument();

const verifieClasseBlocResultat = (
  canvasElement: HTMLElement,
  classeAttendue: string,
) => {
  expect(
    canvasElement.querySelector("div.fr-nis2-resultat")?.className,
  ).toContain(classeAttendue);
};

const verifieTexteEnAnnexe = async (
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

export const ReguleStandard: Story = {
  args: {
    precisionResultatRegulation: PrecisionsResultatRegulation.ReguleStandard,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);

    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const ReguleDORA: Story = {
  args: {
    precisionResultatRegulation: PrecisionsResultatRegulation.ReguleDORA,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "DORA";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const ReguleEnregistrementDeNomsDeDomaines: Story = {
  args: {
    precisionResultatRegulation:
      PrecisionsResultatRegulation.ReguleEnregistrementDeNomsDeDomaine,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Enregistrement de noms de domaines";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const NonReguleStandard: Story = {
  args: {
    precisionResultatRegulation: PrecisionsResultatRegulation.NonReguleStandard,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Critères de possible inclusion";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const NonReguleHorsUE: Story = {
  args: {
    precisionResultatRegulation:
      PrecisionsResultatRegulation.NonReguleHorsUnionEuropeenne,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Ce résultat est présenté au vu des éléments saisis.";
    await attendTexteCharge(canvasElement, texteEnAnnexe);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const IncertainStandard: Story = {
  args: {
    precisionResultatRegulation: PrecisionsResultatRegulation.IncertainStandard,
  },
  play: async ({ canvasElement }) => {
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain");
    verifieIcone(canvasElement, "fr-nis2-icon-in-progress");
  },
};

export const IncertainAutrePaysUE: Story = {
  args: {
    precisionResultatRegulation:
      PrecisionsResultatRegulation.IncertainAutrePaysUnionEuropeenne,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe =
      "Veuillez-vous rapprocher de votre autorité nationale compétente.";
    await attendTexteCharge(canvasElement, texteEnAnnexe);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain-UE");
    verifieIcone(canvasElement, "fr-icon-question-fill");
  },
};

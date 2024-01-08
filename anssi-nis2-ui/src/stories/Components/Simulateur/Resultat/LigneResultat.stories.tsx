import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { LigneResultat } from "../../../../Components/Simulateur/Resultats/LigneResultat.tsx";
import {
  contenusResultatEligibleGrandeEntreprise,
  contenusResultatEligiblePetitEntreprise,
  contenusResultatIncertain,
  contenusResultatNonEligible,
} from "../../../../References/contenusResultatEligibilite.ts";

const meta: Meta<typeof LigneResultat> = {
  title: "Composants/Simulateur/Résultat",
  component: LigneResultat,
};
export default meta;

type Story = StoryObj<typeof LigneResultat>;

export const LigneResultatPetiteEntreprise: Story = {
  args: {
    contenuResultat: contenusResultatEligiblePetitEntreprise,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByText("REC")).not.toBeVisible();

    await userEvent.click(await canvas.findByText("Plus d'informations"));
    await expect(await canvas.findByText("REC")).toBeVisible();
    const moinsInformations = await canvas.findByText("Moins d'informations");
    await expect(moinsInformations).toBeVisible();
    await userEvent.click(moinsInformations);
    await expect(await canvas.queryByText("REC")).not.toBeVisible();
    await canvas.findByText("Plus d'informations");
  },
};

export const LigneResultatMoyenneGrandeEntreprise: Story = {
  args: {
    contenuResultat: contenusResultatEligibleGrandeEntreprise,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByText("REC")).not.toBeVisible();

    await userEvent.click(await canvas.findByText("Plus d'informations"));
    await expect(await canvas.findByText("REC")).toBeVisible();
    const moinsInformations = await canvas.findByText("Moins d'informations");
    await expect(moinsInformations).toBeVisible();
    await userEvent.click(moinsInformations);
    await expect(await canvas.queryByText("REC")).not.toBeVisible();
    await canvas.findByText("Plus d'informations");
  },
};

export const LigneResultatNonEligible: Story = {
  args: {
    contenuResultat: contenusResultatNonEligible,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      await canvas.findByText("Critères de possible inclusion"),
    ).not.toBeVisible();

    await userEvent.click(await canvas.findByText("Plus d'informations"));
    await expect(
      await canvas.findByText("Critères de possible inclusion"),
    ).toBeVisible();
    const moinsInformations = await canvas.findByText("Moins d'informations");
    await expect(moinsInformations).toBeVisible();
    await userEvent.click(moinsInformations);
    await expect(
      await canvas.queryByText("Critères de possible inclusion"),
    ).not.toBeVisible();
    await canvas.findByText("Plus d'informations");
  },
};

export const LigneResultatIncertain: Story = {
  args: {
    contenuResultat: contenusResultatIncertain,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      await canvas.queryByText("Plus d'informations"),
    ).not.toBeInTheDocument();
    expect(
      await canvas.queryByText("Moins d'informations"),
    ).not.toBeInTheDocument();
  },
};

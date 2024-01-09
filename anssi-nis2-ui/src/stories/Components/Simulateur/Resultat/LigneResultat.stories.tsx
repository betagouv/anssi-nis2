// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { PrecisionsResultat } from "../../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
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
    precisionResultat: PrecisionsResultat.ReguleStandard,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const texteEnAnnexe = "REC";
    await waitFor(async () => canvas.queryByText(texteEnAnnexe));
    expect(await canvas.findByText(texteEnAnnexe)).not.toBeVisible();

    await userEvent.click(await canvas.findByText("Plus d'informations"));
    await expect(canvas.queryByText(texteEnAnnexe)).toBeVisible();

    const moinsInformations = await canvas.findByText("Moins d'informations");
    await expect(moinsInformations).toBeVisible();
    await userEvent.click(moinsInformations);
    await expect(canvas.queryByText(texteEnAnnexe)).not.toBeVisible();
    await canvas.findByText("Plus d'informations");
  },
};

export const LigneResultatMoyenneGrandeEntreprise: Story = {
  args: {
    contenuResultat: contenusResultatEligibleGrandeEntreprise,
    precisionResultat: PrecisionsResultat.ReguleStandard,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const texteEnAnnexe = "REC";
    await waitFor(async () => canvas.queryByText(texteEnAnnexe));
    expect(await canvas.findByText(texteEnAnnexe)).not.toBeVisible();

    await userEvent.click(await canvas.findByText("Plus d'informations"));
    await expect(canvas.queryByText(texteEnAnnexe)).toBeVisible();

    const moinsInformations = await canvas.findByText("Moins d'informations");
    await expect(moinsInformations).toBeVisible();
    await userEvent.click(moinsInformations);
    await expect(canvas.queryByText(texteEnAnnexe)).not.toBeVisible();
    await canvas.findByText("Plus d'informations");
  },
};

export const LigneResultatNonEligible: Story = {
  args: {
    contenuResultat: contenusResultatNonEligible,
    precisionResultat: PrecisionsResultat.NonReguleStandard,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const texteEnAnnexe = "Critères de possible inclusion";
    await waitFor(async () => canvas.queryByText(texteEnAnnexe));
    expect(await canvas.findByText(texteEnAnnexe)).not.toBeVisible();

    await userEvent.click(await canvas.findByText("Plus d'informations"));
    await expect(canvas.queryByText(texteEnAnnexe)).toBeVisible();

    const moinsInformations = await canvas.findByText("Moins d'informations");
    await expect(moinsInformations).toBeVisible();
    await userEvent.click(moinsInformations);
    await expect(canvas.queryByText(texteEnAnnexe)).not.toBeVisible();
    await canvas.findByText("Plus d'informations");
  },
};

export const LigneResultatIncertain: Story = {
  args: {
    contenuResultat: contenusResultatIncertain,
    precisionResultat: PrecisionsResultat.Incertain,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.queryByText("Plus d'informations"),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByText("Moins d'informations"),
    ).not.toBeInTheDocument();
  },
};

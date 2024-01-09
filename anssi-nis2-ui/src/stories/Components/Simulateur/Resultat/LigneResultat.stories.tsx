// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { PrecisionsResultat } from "../../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
import { LigneResultat } from "../../../../Components/Simulateur/Resultats/LigneResultat.tsx";
import {
  contenusResultatEligibleGrandeEntreprise,
  contenusResultatIncertain,
  contenusResultatNonEligible,
} from "../../../../References/contenusResultatEligibilite.ts";
import { CanvasObject } from "../../../utilitaires/Canvas.d.tsx";

const meta: Meta<typeof LigneResultat> = {
  title: "Composants/Simulateur/Ligne Résultat",
  component: LigneResultat,
};
export default meta;

type Story = StoryObj<typeof LigneResultat>;

const verifieTexteEnAnnexe = async (
  canvas: CanvasObject,
  texteEnAnnexe: string,
) => {
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
    contenuResultat: contenusResultatEligibleGrandeEntreprise,
    precisionResultat: PrecisionsResultat.ReguleStandard,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvas, texteEnAnnexe);
  },
};

export const ReguleDORA: Story = {
  args: {
    contenuResultat: contenusResultatEligibleGrandeEntreprise,
    precisionResultat: PrecisionsResultat.ReguleDORA,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const texteEnAnnexe = "DORA";
    await verifieTexteEnAnnexe(canvas, texteEnAnnexe);
  },
};

export const ReguleEnregistrementDeNomsDeDomaines: Story = {
  args: {
    contenuResultat: contenusResultatEligibleGrandeEntreprise,
    precisionResultat: PrecisionsResultat.ReguleEnregistrementDeNomsDeDomaine,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const texteEnAnnexe = "Enregistrement de noms de domaines";
    await verifieTexteEnAnnexe(canvas, texteEnAnnexe);
  },
};

export const NonReguleStandard: Story = {
  args: {
    contenuResultat: contenusResultatNonEligible,
    precisionResultat: PrecisionsResultat.NonReguleStandard,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const texteEnAnnexe = "Critères de possible inclusion";
    await verifieTexteEnAnnexe(canvas, texteEnAnnexe);
  },
};

export const NonReguleHorsUE: Story = {
  args: {
    contenuResultat: contenusResultatNonEligible,
    precisionResultat: PrecisionsResultat.NonReguleHorsUnionEuropeenne,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const texteEnAnnexe = "Ce résultat est présenté au vu des éléments saisis.";
    await canvas.findByText(texteEnAnnexe);
    expect(canvas.queryByText("Plus d'informations")).not.toBeInTheDocument();
  },
};

export const Incertain: Story = {
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

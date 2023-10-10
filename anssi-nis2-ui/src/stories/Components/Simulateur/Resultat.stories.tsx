import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtapeResult } from "../../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { within } from "@storybook/testing-library";

import { contenusResultatEligible } from "../../../References/contenusResultatEligibilite.ts";

const meta: Meta<typeof SimulateurEtapeResult> = {
  component: SimulateurEtapeResult,
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur({}),
  },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtapeResult>;

export const ResultatEligible: Story = {
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur({
      designeOperateurServicesEssentiels: ["oui"],
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icone = canvasElement.querySelector(
      `span.${contenusResultatEligible.classIcone}`,
    );
    expect(icone).toBeInTheDocument();
    expect(
      canvas.getByText(contenusResultatEligible.titre),
    ).toBeInTheDocument();
  },
};
export const ResultatNonEligible: Story = {};

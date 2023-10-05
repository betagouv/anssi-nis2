import type { Meta, StoryObj } from "@storybook/react";
import { EtapeOSE } from "../../../Components/Simulateur";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { libellesDesigneOSE } from "../../../Domaine/References/Libelles.ts";

const meta: Meta<typeof EtapeOSE> = {
  component: EtapeOSE,
  argTypes: {
    propageActionSimulateur: { action: true },
  },
};

export default meta;
type Story = StoryObj<typeof EtapeOSE>;

const creeActionPropagationFormulaireSimu = (newValue: string) => {
  const actionTypique = {
    type: "checkSingle",
    name: "designeOSE",
  };
  return {
    ...actionTypique,
    newValue: newValue,
  };
};

export const CliqueSurLesOptions: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    const optionsATester = [
      {
        libelle: libellesDesigneOSE["oui"],
        newValue: "oui",
      },
      {
        libelle: libellesDesigneOSE["non"],
        newValue: "non",
      },
      {
        libelle: libellesDesigneOSE["nsp"],
        newValue: "nsp",
      },
    ];

    for (const { libelle, newValue } of optionsATester) {
      const actionPropagee = creeActionPropagationFormulaireSimu(newValue);
      await step(
        `Clique sur '${libelle}' déclanche le dispatch d'action '${actionPropagee.type}' sur le champs '${actionPropagee.name}' pour une valeur '${newValue}'`,
        async () => {
          await userEvent.click(await canvas.findByText(libelle));
          await expect(propageActionSimulateur).toHaveBeenCalledWith(
            actionPropagee,
          );
        },
      );
    }
  },
};

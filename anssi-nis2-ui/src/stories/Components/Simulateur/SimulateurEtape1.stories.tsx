import type { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtape1 } from "../../../Components/Simulateur";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SimulateurEtape1> = {
  component: SimulateurEtape1,
  argTypes: { propageActionSimulateur: { action: true } },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtape1>;

export const CliqueSurLesOptions: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    await step("Clique sur 'France'", async () => {
      await userEvent.click(await canvas.findByText("France"));
      await expect(propageActionSimulateur).toHaveBeenCalledWith({
        type: "checkSingle",
        name: "etatMembre",
        newValue: "france",
      });
    });
    await step("Clique sur 'Autre état membre'", async () => {
      await userEvent.click(await canvas.findByText("Autre état membre"));
      await expect(propageActionSimulateur).toHaveBeenCalledWith({
        type: "checkSingle",
        name: "etatMembre",
        newValue: "autre",
      });
    });
  },
};

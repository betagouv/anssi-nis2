import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { SimulateurEtape1 } from "../../../Components/Simulateur";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SimulateurEtape1> = {
  component: SimulateurEtape1,
  argTypes: { handleChange: { action: true } },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtape1>;

export const ClickOptionFrance: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Click on option", async () => {
      await userEvent.click(await canvas.getByText("France"));
    });
  },
};

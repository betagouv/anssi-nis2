import type { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtape1 } from "../../../Components/Simulateur";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SimulateurEtape1> = {
  component: SimulateurEtape1,
  argTypes: { handleChange: { action: "clicked" } },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtape1>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtape } from "../../../Components/Simulateur";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SimulateurEtape> = {
  component: SimulateurEtape,
};

export default meta;
type Story = StoryObj<typeof SimulateurEtape>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

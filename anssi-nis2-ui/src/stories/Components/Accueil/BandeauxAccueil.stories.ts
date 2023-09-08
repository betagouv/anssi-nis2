import type { Meta, StoryObj } from "@storybook/react";
import { BandeauAccueil } from "../../../Components/Accueil";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauAccueil> = {
  component: BandeauAccueil,
};

export default meta;
type Story = StoryObj<typeof BandeauAccueil>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

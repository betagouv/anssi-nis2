import type { Meta, StoryObj } from "@storybook/react";
import { BandeauAccueil } from "../../../Components/Accueil";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauAccueil> = {
  title: "Composants/Accueil",
  component: BandeauAccueil,
};

export default meta;
type Story = StoryObj<typeof BandeauAccueil>;

export const HautAccueil: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

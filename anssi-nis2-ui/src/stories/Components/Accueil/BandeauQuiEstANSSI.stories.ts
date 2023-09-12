import type { Meta, StoryObj } from "@storybook/react";
import { BandeauQuiEstANSSI } from "../../../Components/Accueil";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauQuiEstANSSI> = {
  component: BandeauQuiEstANSSI,
};

export default meta;
type Story = StoryObj<typeof BandeauQuiEstANSSI>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

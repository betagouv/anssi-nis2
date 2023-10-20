import type { Meta, StoryObj } from "@storybook/react";
import { BandeauQuiEstANSSI } from "../../../Components/Accueil";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauQuiEstANSSI> = {
  title: "Composants/Accueil",
  component: BandeauQuiEstANSSI,
};

export default meta;
type Story = StoryObj<typeof BandeauQuiEstANSSI>;

export const QuiEstANSSI: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

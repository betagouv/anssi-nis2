import type { Meta, StoryObj } from "@storybook/react";
import { BandeauNis2EU } from "../../../Components/Accueil";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauNis2EU> = {
  component: BandeauNis2EU,
};

export default meta;
type Story = StoryObj<typeof BandeauNis2EU>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

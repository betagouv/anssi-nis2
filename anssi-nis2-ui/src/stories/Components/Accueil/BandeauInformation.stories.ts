import type { Meta, StoryObj } from "@storybook/react";
import { BandeauInformation } from "../../../Components/Accueil";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauInformation> = {
  component: BandeauInformation,
};

export default meta;
type Story = StoryObj<typeof BandeauInformation>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

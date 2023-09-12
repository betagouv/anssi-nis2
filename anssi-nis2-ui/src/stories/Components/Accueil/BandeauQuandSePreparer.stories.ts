import type { Meta, StoryObj } from "@storybook/react";
import { BandeauQuandSePreparer } from "../../../Components/Accueil";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauQuandSePreparer> = {
  component: BandeauQuandSePreparer,
};

export default meta;
type Story = StoryObj<typeof BandeauQuandSePreparer>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { BandeauConcerne } from "../../../Components/Accueil";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauConcerne> = {
  component: BandeauConcerne,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof BandeauConcerne>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import Accueil from "../../Accueil.tsx";
import { pageDecorator } from "../../.storybook/PageDecorator.tsx";

const meta: Meta<typeof Accueil> = {
  component: Accueil,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof Accueil>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import Accueil from "../../Accueil.tsx";
import { pageDecorator } from "../utilitaires/PageDecorator.tsx";

const meta: Meta<typeof Accueil> = {
  title: "Pages",
  component: Accueil,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof Accueil>;

export const PageCompleteAccueil: Story = {
  name: "Accueil",
  args: {
    //👇 The args you need here will depend on your component
  },
};

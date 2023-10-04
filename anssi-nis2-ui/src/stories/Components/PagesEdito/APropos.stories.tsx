import type { Meta, StoryObj } from "@storybook/react";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";
import APropos from "../../../Components/PagesEdito/APropos.tsx";

const meta: Meta<typeof APropos> = {
  component: APropos,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof APropos>;

export const AffichageSimple: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

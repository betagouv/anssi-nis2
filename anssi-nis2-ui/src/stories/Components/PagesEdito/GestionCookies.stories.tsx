import type { Meta, StoryObj } from "@storybook/react";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";
import GestionCookies from "../../../Components/PagesEdito/GestionCookies.tsx";

const meta: Meta<typeof GestionCookies> = {
  component: GestionCookies,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof GestionCookies>;

export const AffichageSimple: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

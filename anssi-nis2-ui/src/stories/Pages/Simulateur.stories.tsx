import type { Meta, StoryObj } from "@storybook/react";
import { pageDecorator } from "../utilitaires/PageDecorator.tsx";
import Simulateur from "../../Simulateur.tsx";

const meta: Meta<typeof Simulateur> = {
  title: "Pages",
  component: Simulateur,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof Simulateur>;

export const SimulationEligibilite: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

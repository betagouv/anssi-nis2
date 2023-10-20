import { Meta, StoryObj } from "@storybook/react";
import { BandeauConcerneSimulateur } from "../../../Components/Simulateur/BandeauConcerneSimulateur.tsx";

const meta: Meta<typeof BandeauConcerneSimulateur> = {
  title: "Composants/Simulateur/BandeauConcerneSimulateur",
  component: BandeauConcerneSimulateur,
};

export default meta;
type Story = StoryObj<typeof BandeauConcerneSimulateur>;

export const Affiche: Story = {};

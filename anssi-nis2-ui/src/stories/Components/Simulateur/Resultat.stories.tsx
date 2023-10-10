import { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtapeResult } from "../../../Components/Simulateur/SimulateurEtapeResult.tsx";

const meta: Meta<typeof SimulateurEtapeResult> = {
  component: SimulateurEtapeResult,
};

export default meta;
type Story = StoryObj<typeof SimulateurEtapeResult>;

export const Affiche: Story = {};

import { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtapePrealable } from "../Components/Simulateur/SimulateurEtapePrealable";

const meta = {
  title: "EtapeSousSecteursActivite/SimulateurEtapePrealable",
  component: SimulateurEtapePrealable,
} satisfies Meta<typeof SimulateurEtapePrealable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SimulateurEtapePrealableStory: Story = {
  name: "Default",
};

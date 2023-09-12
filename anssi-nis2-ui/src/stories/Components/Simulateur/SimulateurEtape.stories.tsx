import { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtape } from "../../../Components/Simulateur/SimulateurEtape.tsx";
import { etapesQuestionnaire } from "../../../EtapesQuestionnaire.ts";

const meta: Meta<typeof SimulateurEtape> = {
  component: SimulateurEtape,
  argTypes: {
    soumissionEtape: { action: true },
    etapeCourante: { control: { type: "range", min: 0, max: 5 } },
  },
  args: {
    etapeCourante: 0,
    listeEtapes: etapesQuestionnaire,
  },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtape>;

export const AfficheEtape: Story = {};

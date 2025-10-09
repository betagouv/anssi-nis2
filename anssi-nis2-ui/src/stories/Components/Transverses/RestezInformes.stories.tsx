import { Meta, StoryObj } from "@storybook/react-vite";
import RestezInformes from "../../../Components/RestezInformes.tsx";

const meta: Meta<typeof RestezInformes> = {
  title: "Composants/Transverses/Restez informés",
  component: RestezInformes,
  parameters: {
    actions: {
      handles: ["enregistreInformationsEmail"],
    },
  },
  argTypes: {
    mode: {
      options: ["simple", "complet"],
      control: { type: "radio" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RestezInformes>;

export const RestezInformesSimple: Story = {};

import { Meta, StoryObj } from "@storybook/react";
import RestezInformes from "../../../Components/RestezInformes.tsx";
import { genereDecorateurPourContexte } from "../../utilitaires/generateursDecorateurs.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { Contexte } from "../../../Services/contexte";

const enregistreEmailContexte: Contexte = {
  ...defaultContext,
};

const meta: Meta<typeof RestezInformes> = {
  title: "Composants/Transverses/Restez informés",
  component: RestezInformes,
  decorators: [genereDecorateurPourContexte(enregistreEmailContexte)],
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

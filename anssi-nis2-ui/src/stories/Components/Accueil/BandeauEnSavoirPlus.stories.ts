import type { Meta, StoryObj } from "@storybook/react";
import BandeauEnSavoirPlus from "../../../Components/Accueil/BandeauEnSavoirPlus.tsx";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauEnSavoirPlus> = {
  title: "Composants/Accueil",
  component: BandeauEnSavoirPlus,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof BandeauEnSavoirPlus>;

export const EnSavoirPlus: Story = {};

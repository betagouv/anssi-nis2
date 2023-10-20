import type { Meta, StoryObj } from "@storybook/react";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";
import MentionsLegales from "../../../Components/PagesEdito/MentionsLegales.tsx";

const meta: Meta<typeof MentionsLegales> = {
  title: "Composants/Pages édito",
  component: MentionsLegales,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof MentionsLegales>;

export const EditoMentions: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

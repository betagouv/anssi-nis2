import type { Meta, StoryObj } from "@storybook/react";
import { pageDecorator } from "../utilitaires/PageDecorator.tsx";
import { PageEdito } from "../../Components/PagesEdito/PageEdito.tsx";
import APropos from "../../Components/PagesEdito/APropos.tsx";
import MentionsLegales from "../../Components/PagesEdito/MentionsLegales.tsx";

const meta: Meta<typeof PageEdito> = {
  component: PageEdito,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof PageEdito>;

export const PageAPropos: Story = {
  args: {
    titre: "A propos",
    children: <APropos />,
  },
};

export const PageMentionsLegales: Story = {
  args: {
    titre: "Mentions légales",
    children: <MentionsLegales />,
  },
};

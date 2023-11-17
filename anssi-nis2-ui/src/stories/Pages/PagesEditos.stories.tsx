import type { Meta, StoryObj } from "@storybook/react";
import { pageDecorator } from "../utilitaires/PageDecorator.tsx";
import PageEdito from "../../Components/PagesEdito/PageEdito.tsx";
import APropos from "../../Components/PagesEdito/APropos.tsx";
import MentionsLegales from "../../Components/PagesEdito/MentionsLegales.tsx";
import GestionCookies from "../../Components/PagesEdito/GestionCookies.tsx";
import RestezInformes from "../../Components/RestezInformes.tsx";

const meta: Meta<typeof PageEdito> = {
  title: "Pages/Edito",
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

export const PageGestionCookies: Story = {
  args: {
    titre: "Mentions légales",
    children: <GestionCookies />,
  },
};

export const PageRestezInformes: Story = {
  args: {
    titre: "Restez informés",
    children: <RestezInformes />,
  },
};

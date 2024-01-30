import { Meta, StoryObj } from "@storybook/react";
import { PageFaq } from "../../../Components/PageFaq.tsx";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";

const meta: Meta<typeof PageFaq> = {
  title: "Composants/Transverses/FAQ",
  component: PageFaq,
  decorators: [pageDecorator],
};

export default meta;

type Story = StoryObj<typeof PageFaq>;

export const PageFAQPincipale: Story = {};

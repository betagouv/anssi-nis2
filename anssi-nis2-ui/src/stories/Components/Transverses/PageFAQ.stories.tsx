import { Meta, StoryObj } from "@storybook/react";
import { PageFaq } from "../../../Components/PageFaq.tsx";

const meta: Meta<typeof PageFaq> = {
  title: "Composants/Transverses/FAQ",
  component: PageFaq,
};

export default meta;

type Story = StoryObj<typeof PageFaq>;

export const PageFAQPincipale: Story = {};

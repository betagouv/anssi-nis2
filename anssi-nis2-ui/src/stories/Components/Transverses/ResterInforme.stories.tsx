import { Meta, StoryObj } from "@storybook/react";
import ResterInformee from "../../../Components/ResterInformee.tsx";

const meta: Meta<typeof ResterInformee> = {
  title: "Composants/Transverses/Rester informé",
  component: ResterInformee,
};

export default meta;

type Story = StoryObj<typeof ResterInformee>;

export const ResterInformeSimple: Story = {};

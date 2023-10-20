import { Meta, StoryObj } from "@storybook/react";
import { AidezNousAmeliorerService } from "../../Components/AidezNousAmeliorerService.tsx";

const meta: Meta<typeof AidezNousAmeliorerService> = {
  title: "Composants/Aidez-nous à améliorer le service",
  component: AidezNousAmeliorerService,
};

export default meta;

type Story = StoryObj<typeof AidezNousAmeliorerService>;

export const AidezNousAmeliorerServiceAffiche: Story = {};

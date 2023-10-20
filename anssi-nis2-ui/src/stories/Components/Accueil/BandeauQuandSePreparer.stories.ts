import type { Meta, StoryObj } from "@storybook/react";
import { BandeauQuandSePreparer } from "../../../Components/Accueil";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BandeauQuandSePreparer> = {
  title: "Composants/Accueil",
  component: BandeauQuandSePreparer,
  decorators: [pageDecorator],
};

export default meta;
type Story = StoryObj<typeof BandeauQuandSePreparer>;

export const QuandSePreparer: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};

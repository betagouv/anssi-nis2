import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { AppContext, Context } from "../../../AppContext.tsx";
import { defaultContext } from "../../../.storybook/PageDecorator.tsx";
import { userEvent, within } from "@storybook/testing-library";
import { expect, jest } from "@storybook/jest";
import { Component } from "@storybook/blocks";
import { CanvasFindByRole } from "../../utilitaires/Canvas.d.tsx";

const genereDecorateurPourContexte = (context: Context) =>
  function StoryDecoree(StoryADecorer: Component) {
    return (
      <AppContext.Provider value={context}>
        <StoryADecorer />
      </AppContext.Provider>
    );
  };

const meta: Meta<typeof ChargeurEtape> = {
  component: ChargeurEtape,
  decorators: [genereDecorateurPourContexte(defaultContext)],
};

export default meta;
type Story = StoryObj<typeof ChargeurEtape>;

const cliqueSurSuivant = async (canvas: CanvasFindByRole) => {
  const element = await canvas.findByRole("button", { name: "Suivant" });
  await userEvent.click(element as HTMLElement);
};

const mockSendFormData = jest.fn(async () => "");
const simulateurContext: Context = {
  ...defaultContext,
  sendFormData: mockSendFormData,
};

export const DerniereEtapeEstResultat: Story = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await cliqueSurSuivant(canvas);
    await cliqueSurSuivant(canvas);
    await cliqueSurSuivant(canvas);
    await cliqueSurSuivant(canvas);
    await cliqueSurSuivant(canvas);

    await canvas.findByText(
      "La directive s'appliquerait à votre entité au vu des éléments saisis",
    );
    await expect(mockSendFormData).toHaveBeenCalled();
  },
};

export const EtapeSousActiviteConditionnelle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await cliqueSurSuivant(canvas);
    await cliqueSurSuivant(canvas);
    await cliqueSurSuivant(canvas);

    await userEvent.click(await canvas.findByText("Énergie"));
    await canvas.findByText("Énergie");

    await cliqueSurSuivant(canvas);

    await canvas.findByText("Précisez les sous-secteurs concernés :");
  },
};

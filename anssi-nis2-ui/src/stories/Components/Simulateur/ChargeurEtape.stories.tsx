import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { AppContext, Context } from "../../../AppContext.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { userEvent, within } from "@storybook/testing-library";
import { expect, jest } from "@storybook/jest";
import { Component } from "@storybook/blocks";
import { CanvasFindByRole, CanvasObject } from "../../utilitaires/Canvas.d.tsx";

import { donneesFormulaireSimulateurVide } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";

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

export const Simple: Story = {};

const passeEtapeOSE = async (canvas: CanvasObject) => {
  const element = await canvas.findByRole("button", { name: "Suivant" });
  expect(element).not.toBeEnabled();
  await userEvent.click(await canvas.findByText("Oui"));
  expect(element).toBeEnabled();
  await userEvent.click(element);
};

const passeEtapeLocalisation = async (canvas: CanvasFindByRole) => {
  await cliqueSurSuivant(canvas);
};

const passeEtapeTypeStructure = async (canvas: CanvasFindByRole) => {
  await cliqueSurSuivant(canvas);
};

const passeEtapeTaille = async (canvas: CanvasFindByRole) => {
  await cliqueSurSuivant(canvas);
};

const passeEtapeSecteurActivite = async (canvas: CanvasFindByRole) => {
  await cliqueSurSuivant(canvas);
};

const passeEtapeActivite = async (canvas: CanvasFindByRole) => {
  await cliqueSurSuivant(canvas);
};

export const DerniereEtapeEstResultat: Story = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await passeEtapeOSE(canvas);
    await passeEtapeLocalisation(canvas);
    await passeEtapeTypeStructure(canvas);
    await passeEtapeTaille(canvas);
    await passeEtapeSecteurActivite(canvas);
    await passeEtapeActivite(canvas);

    await canvas.findByText(
      "La directive s'appliquerait à votre entité au vu des éléments saisis",
    );
    await expect(mockSendFormData).toHaveBeenCalled();
    await expect(mockSendFormData).toHaveBeenCalledWith(
      donneesFormulaireSimulateurVide,
    );
  },
};

export const EtapeSousActiviteConditionnelle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await passeEtapeOSE(canvas);
    await passeEtapeLocalisation(canvas);
    await passeEtapeTypeStructure(canvas);
    await passeEtapeTaille(canvas);

    await userEvent.click(await canvas.findByText("Énergie"));
    await canvas.findByText("Énergie");

    await cliqueSurSuivant(canvas);

    await canvas.findByText("Précisez les sous-secteurs concernés :");
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { AppContext, Context } from "../../../AppContext.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { userEvent, within } from "@storybook/testing-library";
import { expect, jest } from "@storybook/jest";
import { Component } from "@storybook/blocks";
import { CanvasFindByRole, CanvasObject } from "../../utilitaires/Canvas.d.tsx";

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

const passeEtapeOSE = async (
  canvas: CanvasObject,
  boutonSuivant: HTMLElement,
) => {
  expect(boutonSuivant).not.toBeEnabled();
  await userEvent.click(await canvas.findByText("Oui"));
  expect(boutonSuivant).toBeEnabled();
  await userEvent.click(boutonSuivant);
};

const passeEtapeLocalisation = async (
  canvas: CanvasObject,
  boutonSuivant: HTMLElement,
) => {
  expect(boutonSuivant).not.toBeEnabled();
  await userEvent.click(await canvas.findByText("France"));
  expect(boutonSuivant).toBeEnabled();
  await userEvent.click(boutonSuivant);
};

const passeEtapeTypeStructure = async (
  canvas: CanvasObject,
  boutonSuivant: HTMLElement,
) => {
  expect(boutonSuivant).not.toBeEnabled();
  await userEvent.click(await canvas.findByText("Organisation publique"));
  expect(boutonSuivant).toBeEnabled();
  await userEvent.click(boutonSuivant);
};

const passeEtapeTaille = async (
  canvas: CanvasObject,
  boutonSuivant: HTMLElement,
) => {
  expect(boutonSuivant).not.toBeEnabled();
  await userEvent.click(await canvas.findByText("1 à 49"));
  await userEvent.click(await canvas.findByText("< 10 millions €"));
  expect(boutonSuivant).toBeEnabled();
  await userEvent.click(boutonSuivant);
};

const passeEtapeSecteurActivite = async (
  canvas: CanvasObject,
  boutonSuivant: HTMLElement,
) => {
  expect(boutonSuivant).not.toBeEnabled();
  await userEvent.click(await canvas.findByText("Espace"));
  expect(boutonSuivant).toBeEnabled();
  await userEvent.click(boutonSuivant);
};

const passeEtapeActivite = async (
  canvas: CanvasObject,
  boutonSuivant: HTMLElement,
) => {
  expect(boutonSuivant).not.toBeEnabled();
  await userEvent.click(
    await canvas.findByText(
      "Exploitants d’infrastructures terrestres, détenues, gérées et exploitées par des États membres ou par des parties privées, qui soutiennent la fourniture de services spatiaux, à l’exclusion des fournisseurs de réseaux de communications électroniques publics",
    ),
  );
  expect(boutonSuivant).toBeEnabled();
  await userEvent.click(boutonSuivant);
};

export const DerniereEtapeEstResultat: Story = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const boutonSuivant = await canvas.findByRole("button", {
      name: "Suivant",
    });

    await passeEtapeOSE(canvas, boutonSuivant);
    await passeEtapeLocalisation(canvas, boutonSuivant);
    await passeEtapeTypeStructure(canvas, boutonSuivant);
    await passeEtapeTaille(canvas, boutonSuivant);
    await passeEtapeSecteurActivite(canvas, boutonSuivant);
    await passeEtapeActivite(canvas, boutonSuivant);

    await canvas.findByText(
      "La directive s'appliquerait à votre entité au vu des éléments saisis",
    );
    await expect(mockSendFormData).toHaveBeenCalledTimes(1);
    await expect(mockSendFormData).toHaveBeenCalledWith({
      activites: [
        "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
      ],
      designeOSE: ["non"],
      etatMembre: ["france"],
      secteurActivite: ["espace"],
      sousSecteurActivite: [],
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["publique"],
    });
  },
};

export const EtapeSousActiviteConditionnelle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const boutonSuivant = await canvas.findByRole("button", {
      name: "Suivant",
    });

    await passeEtapeOSE(canvas, boutonSuivant);
    await passeEtapeLocalisation(canvas, boutonSuivant);
    await passeEtapeTypeStructure(canvas, boutonSuivant);
    await passeEtapeTaille(canvas, boutonSuivant);

    await userEvent.click(await canvas.findByText("Énergie"));
    await canvas.findByText("Énergie");

    await cliqueSurSuivant(canvas);

    await canvas.findByText("Précisez les sous-secteurs concernés :");
  },
};

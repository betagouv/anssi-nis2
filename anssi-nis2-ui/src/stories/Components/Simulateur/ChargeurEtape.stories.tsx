import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { AppContext, Context } from "../../../AppContext.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { userEvent, waitFor, within } from "@storybook/testing-library";
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

const passeEtapeEnCliquantSur = async (
  libelles: string[],
  canvas: CanvasObject,
) => {
  const boutonSuivant = await canvas.findByRole("button", {
    name: "Suivant",
  });
  expect(boutonSuivant).not.toBeEnabled();
  libelles.map(
    async (libelle) => await userEvent.click(await canvas.findByText(libelle)),
  );
  await waitFor(() => expect(boutonSuivant).toBeEnabled());
  await userEvent.click(boutonSuivant);
};

export const DerniereEtapeEstResultat: Story = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await passeEtapeEnCliquantSur(["Oui"], canvas);
    await passeEtapeEnCliquantSur(["France"], canvas);
    await passeEtapeEnCliquantSur(["Organisation publique"], canvas);
    await passeEtapeEnCliquantSur(["1 à 49", "< 10 millions €"], canvas);
    await passeEtapeEnCliquantSur(["Espace"], canvas);
    await passeEtapeEnCliquantSur(
      [
        "Exploitants d’infrastructures terrestres, détenues, gérées et " +
          "exploitées par des États membres ou par des parties privées, " +
          "qui soutiennent la fourniture de services spatiaux, à l’exclusion " +
          "des fournisseurs de réseaux de communications électroniques publics",
      ],
      canvas,
    );

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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const boutonSuivant = await canvas.findByRole("button", {
      name: "Suivant",
    });
    step("Va jusqu'à l'étape Secteurs d'activité", async () => {
      await passeEtapeEnCliquantSur(["Oui"], canvas);
      await passeEtapeEnCliquantSur(["France"], canvas);
      await passeEtapeEnCliquantSur(["Organisation publique"], canvas);
      await passeEtapeEnCliquantSur(["1 à 49", "< 10 millions €"], canvas);
    });

    await userEvent.click(await canvas.findByText("Énergie"));
    await canvas.findByText("Énergie");

    await cliqueSurSuivant(canvas);

    await canvas.findByText("Précisez les sous-secteurs concernés :");
    expect(boutonSuivant).not.toBeEnabled();
    await userEvent.click(await canvas.findByText("Électricité"));
    expect(boutonSuivant).toBeEnabled();
    await cliqueSurSuivant(canvas);
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { passeEtapeEnCochant } from "../../utilitaires/Simulateur.actions.ts";
import { genereDecorateurPourContexte } from "../../utilitaires/generateursDecorateurs.tsx";
import { mockSendFormData } from "../../utilitaires/mocks.ts";
import { Context } from "../../../Services/context";

const meta: Meta<typeof ChargeurEtape> = {
  component: ChargeurEtape,
  decorators: [genereDecorateurPourContexte(defaultContext)],
};

export default meta;
type Story = StoryObj<typeof ChargeurEtape>;

const simulateurContext: Context = {
  ...defaultContext,
  sendFormData: mockSendFormData,
};

export const Simple: Story = {};

export const DerniereEtapeEstResultat: Story = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement }) => {
    mockSendFormData.mockClear();

    const canvas = within(canvasElement);

    await passeEtapeEnCochant(canvas, [["designeOSE", "oui"]]);
    await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
    await passeEtapeEnCochant(canvas, [["typeStructure", "publique"]]);

    await passeEtapeEnCochant(canvas, [
      ["trancheNombreEmployes", "petit"],
      ["trancheCA", "petit"],
    ]);
    await passeEtapeEnCochant(canvas, [["secteurActivite", "espace"]]);
    await passeEtapeEnCochant(canvas, [
      [
        "activites",
        "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
      ],
    ]);

    await canvas.findByText(
      "La directive s'appliquerait à votre entité au vu des éléments saisis",
    );
    await expect(mockSendFormData).toHaveBeenCalledTimes(1);
    await expect(mockSendFormData).toHaveBeenCalledWith({
      activites: [
        "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
      ],
      designeOSE: ["oui"],
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
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement, step }) => {
    mockSendFormData.mockClear();

    const canvas = within(canvasElement);

    step("Va jusqu'à l'étape Secteurs d'activité", async () => {
      await passeEtapeEnCochant(canvas, [["designeOSE", "oui"]]);
      await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
      await passeEtapeEnCochant(canvas, [["typeStructure", "publique"]]);
      await passeEtapeEnCochant(canvas, [
        ["trancheNombreEmployes", "petit"],
        ["trancheCA", "petit"],
      ]);
    });

    await passeEtapeEnCochant(canvas, [["secteurActivite", "energie"]]);

    await canvas.findByText("Précisez les sous-secteurs concernés :");
    await passeEtapeEnCochant(
      canvas,
      [
        ["sousSecteurActivite", "electricite"],
        ["sousSecteurActivite", "gaz"],
      ],
      1,
    );
    await passeEtapeEnCochant(canvas, [
      ["activites", "entrepriseElectriciteRemplissantFonctionFourniture"],
      ["activites", "gestionnaireReseauDistribution"],
    ]);
    await canvas.findByText(
      "La directive s'appliquerait à votre entité au vu des éléments saisis",
    );
    await expect(mockSendFormData).toHaveBeenCalledTimes(1);
    await expect(mockSendFormData).toHaveBeenCalledWith({
      activites: [
        "entrepriseElectriciteRemplissantFonctionFourniture",
        "gestionnaireReseauDistribution",
      ],
      designeOSE: ["oui"],
      etatMembre: ["france"],
      secteurActivite: ["energie"],
      sousSecteurActivite: ["electricite", "gaz"],
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["publique"],
    });
  },
};

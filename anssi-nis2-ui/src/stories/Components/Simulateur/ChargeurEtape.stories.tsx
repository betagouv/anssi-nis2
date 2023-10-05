import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { Context } from "../../../AppContext.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  cliqueSurSuivant,
  passeEtapeEnCochant,
} from "../../utilitaires/Simulateur.actions.ts";
import { genereDecorateurPourContexte } from "../../utilitaires/generateursDecorateurs.tsx";
import { mockSendFormData } from "../../utilitaires/mocks.ts";
import { libellesSimulateur as libelles } from "../../../Domaine/References/Libelles.ts";

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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const boutonSuivant = await canvas.findByRole("button", {
      name: "Suivant",
    });
    step("Va jusqu'à l'étape Secteurs d'activité", async () => {
      await passeEtapeEnCochant(canvas, [["designeOSE", "oui"]]);
      await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
      await passeEtapeEnCochant(canvas, [["typeStructure", "publique"]]);
      await passeEtapeEnCochant(canvas, [
        ["trancheNombreEmployes", "petit"],
        ["trancheCA", "petit"],
      ]);
    });

    // await passeEtapeEnCliquantSurConfigurable(canvas, [
    //   ["secteurActivite", "energie"],
    // ]);
    await userEvent.click(
      await canvas.findByText(libelles.secteurActivite["energie"]),
    );
    await canvas.findByText(libelles.secteurActivite["energie"]);

    await cliqueSurSuivant(canvas);

    await canvas.findByText("Précisez les sous-secteurs concernés :");
    expect(boutonSuivant).not.toBeEnabled();
    await userEvent.click(
      await canvas.findByText(libelles.sousSecteurActivite["electricite"]),
    );
    expect(boutonSuivant).toBeEnabled();
    await cliqueSurSuivant(canvas);
  },
};

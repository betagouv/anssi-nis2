import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { Context } from "../../../AppContext.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  cliqueSurSuivant,
  passeEtapeEnCliquantSur,
} from "../../utilitaires/Simulateur.actions.ts";
import { genereDecorateurPourContexte } from "../../utilitaires/generateursDecorateurs.tsx";
import { mockSendFormData } from "../../utilitaires/mocks.ts";

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

import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { passeEtapeEnCochant } from "../../utilitaires/Simulateur.actions.ts";
import { genereDecorateurPourContexte } from "../../utilitaires/generateursDecorateurs.tsx";
import { mockSendFormData } from "../../utilitaires/mocks.ts";

import { Contexte } from "../../../Services/contexte";
import { contenusResultatEligiblePetitEntreprise } from "../../../References/contenusResultatEligibilite.ts";

const meta: Meta<typeof ChargeurEtape> = {
  component: ChargeurEtape,
  decorators: [genereDecorateurPourContexte(defaultContext)],
};

export default meta;
type Story = StoryObj<typeof ChargeurEtape>;

const simulateurContext: Contexte = {
  ...defaultContext,
  envoieDonneesFormulaire: mockSendFormData,
};

export const Simple: Story = {};

export const DerniereEtapeEstResultat: Story = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement }) => {
    mockSendFormData.mockClear();

    const canvas = within(canvasElement);

    await passeEtapeEnCochant(canvas, [
      ["designeOperateurServicesEssentiels", "oui"],
    ]);
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

    await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);
    await expect(mockSendFormData).toHaveBeenCalledTimes(1);
    await expect(mockSendFormData).toHaveBeenCalledWith({
      activites: [
        "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
      ],
      designeOperateurServicesEssentiels: ["oui"],
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
      await passeEtapeEnCochant(canvas, [
        ["designeOperateurServicesEssentiels", "oui"],
      ]);
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
    await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);
    await expect(mockSendFormData).toHaveBeenCalledTimes(1);
    await expect(mockSendFormData).toHaveBeenCalledWith({
      activites: [
        "entrepriseElectriciteRemplissantFonctionFourniture",
        "gestionnaireReseauDistribution",
      ],
      designeOperateurServicesEssentiels: ["oui"],
      etatMembre: ["france"],
      secteurActivite: ["energie"],
      sousSecteurActivite: ["electricite", "gaz"],
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["publique"],
    });
  },
};

export const EtapeSecteurFabricationSuivant: Story = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement, step }) => {
    mockSendFormData.mockClear();

    const canvas = within(canvasElement);

    step("Va jusqu'à l'étape Secteurs d'activité", async () => {
      await passeEtapeEnCochant(canvas, [
        ["designeOperateurServicesEssentiels", "oui"],
      ]);
      await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
      await passeEtapeEnCochant(canvas, [["typeStructure", "publique"]]);
      await passeEtapeEnCochant(canvas, [
        ["trancheNombreEmployes", "petit"],
        ["trancheCA", "petit"],
      ]);
    });

    await passeEtapeEnCochant(canvas, [["secteurActivite", "fabrication"]]);
  },
};

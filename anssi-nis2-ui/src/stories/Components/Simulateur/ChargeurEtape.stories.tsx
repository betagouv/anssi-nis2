import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  cliqueSurDebuterLeTest,
  passeEtapeEnCochant,
} from "../../utilitaires/Simulateur.actions.ts";
import { genereDecorateurPourContexte } from "../../utilitaires/generateursDecorateurs.tsx";
import { mockSendFormData } from "../../utilitaires/mocks.ts";

import { Contexte } from "../../../Services/contexte";
import { contenusResultatEligiblePetitEntreprise } from "../../../References/contenusResultatEligibilite.ts";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { TypeStructure } from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";

const meta: Meta<typeof ChargeurEtape> = {
  title: "Composants/Simulateur/ChargeurEtape",
  component: ChargeurEtape,
  decorators: [genereDecorateurPourContexte(defaultContext)],
  parameters: {
    actions: {
      handles: ["envoieDonneesFormulaire"],
    },
  },
};
export default meta;
type StoryChargeurEtape = StoryObj<typeof ChargeurEtape>;
export const Simple: StoryChargeurEtape = {};

const simulateurContext: Contexte = {
  ...defaultContext,
  envoieDonneesFormulaire: mockSendFormData,
};

export const DerniereEtapeEstResultat: StoryChargeurEtape = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement }) => {
    mockSendFormData.mockClear();

    const canvas = within(canvasElement);
    await cliqueSurDebuterLeTest(canvas);

    await passeEtapeEnCochant(canvas, [
      ["designeOperateurServicesEssentiels", "oui"],
    ]);
    await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
    await passeEtapeEnCochant(canvas, [["typeStructure", "privee"]]);

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

    await expect(mockSendFormData).toHaveBeenCalledWith(
      new DonneesFormulaireSimulateur({
        activites: [
          "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
        ],
        designeOperateurServicesEssentiels: ["oui"],
        etatMembre: ["france"],
        secteurActivite: ["espace"],
        sousSecteurActivite: [],
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        typeStructure: ["privee"],
      }),
    );
  },
};

export const EtapeSousActiviteConditionnelle: StoryChargeurEtape = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement, step }) => {
    mockSendFormData.mockClear();

    const canvas = within(canvasElement);

    step("Va jusqu'à l'étape Secteurs d'activité", async () => {
      await cliqueSurDebuterLeTest(canvas);
      await passeEtapeEnCochant(canvas, [
        ["designeOperateurServicesEssentiels", "oui"],
      ]);
      await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
      await passeEtapeEnCochant(canvas, [["typeStructure", "privee"]]);
      await passeEtapeEnCochant(canvas, [
        ["trancheNombreEmployes", "petit"],
        ["trancheCA", "petit"],
      ]);
    });

    await passeEtapeEnCochant(canvas, [["secteurActivite", "energie"]]);
    await expect(mockSendFormData).not.toHaveBeenCalled();

    await canvas.findByText("Précisez les sous-secteurs concernés :");
    await passeEtapeEnCochant(
      canvas,
      [
        ["sousSecteurActivite", "electricite"],
        ["sousSecteurActivite", "gaz"],
      ],
      1,
    );
    await expect(mockSendFormData).not.toHaveBeenCalled();

    await passeEtapeEnCochant(canvas, [
      ["activites", "entrepriseElectriciteRemplissantFonctionFourniture"],
      ["activites", "gestionnaireReseauDistribution"],
    ]);
    await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);
    await expect(mockSendFormData).toHaveBeenCalledTimes(1);
    await expect(mockSendFormData).toHaveBeenCalledWith(
      new DonneesFormulaireSimulateur({
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
        typeStructure: ["privee"],
      }),
    );
  },
};

export const EtapeSecteurFabricationSuivant: StoryChargeurEtape = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement, step }) => {
    mockSendFormData.mockClear();

    const canvas = within(canvasElement);

    step("Va jusqu'à l'étape Secteurs d'activité", async () => {
      await cliqueSurDebuterLeTest(canvas);

      await passeEtapeEnCochant(canvas, [
        ["designeOperateurServicesEssentiels", "oui"],
      ]);
      await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
      await passeEtapeEnCochant(canvas, [
        ["typeStructure", "publique"],
        ["typeEntitePublique", "administrationCentrale"],
      ]);
      await passeEtapeEnCochant(canvas, [["trancheNombreEmployes", "petit"]]);
    });

    await passeEtapeEnCochant(canvas, [["secteurActivite", "fabrication"]]);
  },
};

export const IgnoreEtapeActivitePourSecteurActiviteAutre: StoryChargeurEtape = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement }) => {
    mockSendFormData.mockClear();

    const canvas = within(canvasElement);
    await cliqueSurDebuterLeTest(canvas);

    await passeEtapeEnCochant(canvas, [
      ["designeOperateurServicesEssentiels", "oui"],
    ]);
    await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
    await passeEtapeEnCochant(canvas, [["typeStructure", "privee"]]);

    await passeEtapeEnCochant(canvas, [
      ["trancheNombreEmployes", "petit"],
      ["trancheCA", "petit"],
    ]);
    await passeEtapeEnCochant(canvas, [
      ["secteurActivite", "autreSecteurActivite"],
    ]);

    await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);
    await expect(mockSendFormData).toHaveBeenCalledTimes(1);
    await expect(mockSendFormData).toHaveBeenCalledWith(
      new DonneesFormulaireSimulateur({
        activites: [],
        designeOperateurServicesEssentiels: ["oui"],
        etatMembre: ["france"],
        secteurActivite: ["autreSecteurActivite"],
        sousSecteurActivite: [],
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        typeStructure: ["privee"],
      }),
    );
  },
};

export const IgnoreEtapeActivitePourSousSecteurActiviteAutre: StoryChargeurEtape =
  {
    decorators: [genereDecorateurPourContexte(simulateurContext)],

    play: async ({ canvasElement }) => {
      mockSendFormData.mockClear();

      const canvas = within(canvasElement);
      await cliqueSurDebuterLeTest(canvas);

      await passeEtapeEnCochant(canvas, [
        ["designeOperateurServicesEssentiels", "oui"],
      ]);
      await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
      await passeEtapeEnCochant(canvas, [["typeStructure", "privee"]]);

      await passeEtapeEnCochant(canvas, [
        ["trancheNombreEmployes", "petit"],
        ["trancheCA", "petit"],
      ]);
      await passeEtapeEnCochant(canvas, [["secteurActivite", "energie"]]);
      await passeEtapeEnCochant(canvas, [
        ["sousSecteurActivite", "autreSousSecteurEnergie"],
      ]);

      await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);
      await expect(mockSendFormData).toHaveBeenCalledTimes(1);
      await expect(mockSendFormData).toHaveBeenCalledWith(
        new DonneesFormulaireSimulateur({
          activites: [],
          designeOperateurServicesEssentiels: ["oui"],
          etatMembre: ["france"],
          secteurActivite: ["energie"],
          sousSecteurActivite: ["autreSousSecteurEnergie"],
          trancheCA: ["petit"],
          trancheNombreEmployes: ["petit"],
          typeStructure: ["privee"],
        }),
      );
    },
  };

export const EtapeActivitePourSecteurActiviteAutreEtListes: StoryChargeurEtape =
  {
    decorators: [genereDecorateurPourContexte(simulateurContext)],

    play: async ({ canvasElement }) => {
      mockSendFormData.mockClear();

      const canvas = within(canvasElement);
      await cliqueSurDebuterLeTest(canvas);

      await passeEtapeEnCochant(canvas, [
        ["designeOperateurServicesEssentiels", "oui"],
      ]);
      await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
      await passeEtapeEnCochant(canvas, [["typeStructure", "privee"]]);

      await passeEtapeEnCochant(canvas, [
        ["trancheNombreEmployes", "petit"],
        ["trancheCA", "petit"],
      ]);
      await passeEtapeEnCochant(
        canvas,
        [
          ["secteurActivite", "eauPotable"],
          ["secteurActivite", "autreSecteurActivite"],
        ],
        1,
      );
      await passeEtapeEnCochant(canvas, [
        ["activites", "fournisseursDistributeursEauxConsommation"],
      ]);

      await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);
      await expect(mockSendFormData).toHaveBeenCalledTimes(1);
      await expect(mockSendFormData).toHaveBeenCalledWith(
        new DonneesFormulaireSimulateur({
          activites: ["fournisseursDistributeursEauxConsommation"],
          designeOperateurServicesEssentiels: ["oui"],
          etatMembre: ["france"],
          secteurActivite: ["eauPotable", "autreSecteurActivite"],
          sousSecteurActivite: [],
          trancheCA: ["petit"],
          trancheNombreEmployes: ["petit"],
          typeStructure: ["privee"],
        }),
      );
    },
  };

export const TypeEntitePublique: StoryChargeurEtape = {
  decorators: [genereDecorateurPourContexte(simulateurContext)],

  play: async ({ canvasElement }) => {
    mockSendFormData.mockClear();

    const typeStructure: TypeStructure = "publique";

    const canvas = within(canvasElement);

    await cliqueSurDebuterLeTest(canvas);
    await passeEtapeEnCochant(canvas, [
      ["designeOperateurServicesEssentiels", "oui"],
    ]);
    await passeEtapeEnCochant(canvas, [["etatMembre", "france"]]);
    await passeEtapeEnCochant(canvas, [
      ["typeStructure", typeStructure],
      ["typeEntitePublique", "administrationCentrale"],
    ]);

    await passeEtapeEnCochant(canvas, [["trancheNombreEmployes", "petit"]]);
    await passeEtapeEnCochant(canvas, [["secteurActivite", "energie"]]);
    await passeEtapeEnCochant(canvas, [
      ["sousSecteurActivite", "autreSousSecteurEnergie"],
    ]);

    await canvas.findByText(contenusResultatEligiblePetitEntreprise.titre);
    await expect(mockSendFormData).toHaveBeenCalledTimes(1);
    await expect(mockSendFormData).toHaveBeenCalledWith(
      new DonneesFormulaireSimulateur({
        activites: [],
        designeOperateurServicesEssentiels: ["oui"],
        etatMembre: ["france"],
        secteurActivite: ["energie"],
        sousSecteurActivite: ["autreSousSecteurEnergie"],
        trancheCA: [],
        trancheNombreEmployes: ["petit"],
        typeStructure: [typeStructure],
        typeEntitePublique: ["administrationCentrale"],
      }),
    );
  },
};

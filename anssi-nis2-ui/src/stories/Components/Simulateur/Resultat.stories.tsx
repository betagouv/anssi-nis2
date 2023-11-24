import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtapeResult } from "../../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { DonneesFormulaireSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";

import { contenusResultats } from "../../../References/contenusResultatEligibilite.ts";
import { verifieContenuResultatDansPage } from "../../utilitaires/VerifieContenuResultatDansPage.ts";

const archetypeDonneesFormulaire = new DonneesFormulaireSimulateur({
  designeOperateurServicesEssentiels: ["non"],
  etatMembre: ["france"],
  typeStructure: ["privee"],
  trancheCA: ["petit"],
  trancheNombreEmployes: ["petit"],
  secteurActivite: ["infrastructureNumerique"],
  sousSecteurActivite: [],
  activites: ["fournisseurReseauxCommunicationElectroniquesPublics"],
});

const meta: Meta<typeof SimulateurEtapeResult> = {
  title: "Composants/Simulateur/ConteneursEtape",
  component: SimulateurEtapeResult,
  args: {
    donneesFormulaire: archetypeDonneesFormulaire,
  },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtapeResult>;

export const ResultatEligibleOSE: Story = {
  args: {
    donneesFormulaire: archetypeDonneesFormulaire.avec({
      designeOperateurServicesEssentiels: ["oui"],
      trancheNombreEmployes: ["petit"],
      trancheCA: ["petit"],
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await verifieContenuResultatDansPage(
      canvasElement,
      contenusResultats.EligiblePetiteEntreprise,
    );
    expect(await canvas.findByText("Points d'attention")).toBeInTheDocument();

    await canvas.findByText("Et Maintenant ?");
  },
};
export const ResultatEligiblePetiteEntreprise: Story = {
  args: {
    donneesFormulaire: archetypeDonneesFormulaire.avec({
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await verifieContenuResultatDansPage(
      canvasElement,
      contenusResultats.EligiblePetiteEntreprise,
    );

    const titrePrecisions = await canvas.findByText("Points d'attention");
    expect(titrePrecisions).toBeInTheDocument();
    expect(titrePrecisions.tagName).toBe("H4");

    await canvas.findByText(
      "Dans l’attente des exigences françaises pour votre organisation, " +
        "retrouvez les guides essentiels de bonne pratique de l’ANSSI pour " +
        "débuter dès à présent votre montée en maturité cyber.",
    );
  },
};
export const ResultatEligibleGrandeEntreprise: Story = {
  args: {
    donneesFormulaire: archetypeDonneesFormulaire.avec({
      trancheCA: ["grand"],
      trancheNombreEmployes: ["grand"],
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await verifieContenuResultatDansPage(
      canvasElement,
      contenusResultats.EligibleMoyenneGrandeEntreprise,
    );

    const titrePrecisions = await canvas.findByText("Points d'attention");
    expect(titrePrecisions).toBeInTheDocument();
    expect(titrePrecisions.tagName).toBe("H4");

    await canvas.findByText(
      "Dans l’attente des exigences françaises pour votre organisation, " +
        "retrouvez sur le site de l’ANSSI l’ensemble des guides de bonnes " +
        "pratiques ainsi que les mesures cyber préventives prioritaires.",
    );
  },
};

export const ResultatNonEligible: Story = {
  args: {
    donneesFormulaire: archetypeDonneesFormulaire.avec({
      designeOperateurServicesEssentiels: ["non"],
      typeStructure: ["privee"],
      secteurActivite: ["autreSecteurActivite"],
      activites: [],
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await verifieContenuResultatDansPage(
      canvasElement,
      contenusResultats.NonEligible,
    );

    const titrePrecisions = await canvas.findByText(
      "Critères de possible inclusion",
    );
    expect(titrePrecisions).toBeInTheDocument();
    expect(titrePrecisions.tagName).toBe("H5");
  },
};

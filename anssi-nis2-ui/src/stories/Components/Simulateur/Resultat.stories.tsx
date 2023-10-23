import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtapeResult } from "../../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { within } from "@storybook/testing-library";

import {
  contenusResultatEligibleGrandeEntreprise,
  contenusResultatEligiblePetitEntreprise,
  contenusResultatNonEligible,
} from "../../../References/contenusResultatEligibilite.ts";
import {
  BlocResultatSpecifiques,
  ContenusResultatEligibilite,
} from "../../../Services/Simulateur/Props/contenusResultatEligibilite";

const meta: Meta<typeof SimulateurEtapeResult> = {
  title: "Composants/Simulateur/ConteneursEtape",
  component: SimulateurEtapeResult,
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur({}),
  },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtapeResult>;

const titreDeSections: Record<BlocResultatSpecifiques, string> = {
  bienDebuterAvecPdf: "Pour bien débuter",
  enSavoirPlus: "En savoir plus",
  etMaintenant: "Et Maintenant ?",
};
const verifieContenuResultatDansPage = async (
  canvasElement: HTMLElement,
  contenusResultat: ContenusResultatEligibilite,
) => {
  const canvas = within(canvasElement);
  const icone = canvasElement.querySelector(
    `span.${contenusResultat.classIcone}`,
  );
  expect(icone).toBeInTheDocument();
  expect(canvas.getByText(contenusResultat.titre)).toBeInTheDocument();
  expect(
    canvasElement.querySelector("div.fr-nis2-resultat")?.className,
  ).toContain(contenusResultat.classeDivResultat);

  contenusResultat.afficheBlocs.etMaintenant &&
    (await canvas.findByText(titreDeSections.etMaintenant));
  contenusResultat.afficheBlocs.enSavoirPlus &&
    (await canvas.findByText(titreDeSections.enSavoirPlus));
  contenusResultat.afficheBlocs.bienDebuterAvecPdf &&
    (await canvas.findByText(titreDeSections.bienDebuterAvecPdf));
};

const archetypeDonneesFormulaire = new DonneesFormulaireSimulateur({
  designeOperateurServicesEssentiels: ["non"],
  etatMembre: ["france"],
  typeStructure: ["privee"],
  trancheCA: ["petit"],
  trancheNombreEmployes: ["petit"],
  secteurActivite: ["infrastructureNumerique"],
  activites: ["fournisseurPointEchangeInternet"],
});

export const ResultatEligibleOSE: Story = {
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur({
      designeOperateurServicesEssentiels: ["oui"],
      trancheNombreEmployes: ["petit"],
      trancheCA: ["petit"],
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await verifieContenuResultatDansPage(
      canvasElement,
      contenusResultatEligiblePetitEntreprise,
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
      contenusResultatEligiblePetitEntreprise,
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
      contenusResultatEligibleGrandeEntreprise,
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
      contenusResultatNonEligible,
    );

    const titrePrecisions = await canvas.findByText(
      "Critères de possible inclusion",
    );
    expect(titrePrecisions).toBeInTheDocument();
    expect(titrePrecisions.tagName).toBe("H5");
  },
};

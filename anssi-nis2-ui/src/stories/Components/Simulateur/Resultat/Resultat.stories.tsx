// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { expect } from "@storybook/jest";

import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { fabriqueDonneesFormulaire } from "../../../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";
import { SimulateurEtapeResult } from "../../../../Components/Simulateur/SimulateurEtapeResult.tsx";

import { texteIntroductionPdfPetiteEntite } from "../../../../References/LibellesResultatsEligibilite.ts";
import { attendTexteCharge } from "../../../utilitaires/interaction.facilitateurs.ts";
import { verifieTitresSectionsPresentes } from "./Resultat.aide.ts";

const archetypeDonneesFormulaire = fabriqueDonneesFormulaire({
  designeOperateurServicesEssentiels: ["non"],
  appartenancePaysUnionEurpopeenne: ["france"],
  typeStructure: ["privee"],
  trancheChiffreAffaire: ["petit"],
  trancheNombreEmployes: ["petit"],
  secteurActivite: ["eauPotable"],
  sousSecteurActivite: [],
  activites: ["fournisseursDistributeursEauxConsommation"],
});

const meta: Meta<typeof SimulateurEtapeResult> = {
  title: "Composants/Simulateur/Resultat",
  component: SimulateurEtapeResult,
  args: {
    donneesFormulaire: archetypeDonneesFormulaire,
  },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtapeResult>;

const pointsDAttention = "Points d'attention";

export const ResultatEligibleOSE: Story = {
  args: {
    donneesFormulaire: {
      ...archetypeDonneesFormulaire,
      designeOperateurServicesEssentiels: ["oui"],
      trancheNombreEmployes: ["petit"],
      trancheChiffreAffaire: ["petit"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await attendTexteCharge(canvasElement, pointsDAttention);

    await verifieTitresSectionsPresentes(
      canvasElement,
      new Set(["etMaintenant", "enSavoirPlus", "bienDebuter"]),
    );

    expect(await canvas.findByText(pointsDAttention)).toBeInTheDocument();

    await canvas.findByText("Et Maintenant ?");
  },
};
export const ResultatEligiblePetiteEntreprise: Story = {
  args: {
    donneesFormulaire: {
      ...archetypeDonneesFormulaire,
      trancheChiffreAffaire: ["petit"],
      trancheNombreEmployes: ["petit"],
      secteurActivite: ["infrastructureNumerique"],
      activites: ["registresNomsDomainesPremierNiveau"],
      fournitServicesUnionEuropeenne: ["oui"],
      localisationRepresentant: ["france"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await attendTexteCharge(canvasElement, pointsDAttention);
    await verifieTitresSectionsPresentes(
      canvasElement,
      new Set(["etMaintenant", "enSavoirPlus", "bienDebuter"]),
    );

    const titrePrecisions = await canvas.findByText(pointsDAttention);
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
    donneesFormulaire: {
      ...archetypeDonneesFormulaire,
      trancheChiffreAffaire: ["grand"],
      trancheNombreEmployes: ["grand"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await attendTexteCharge(canvasElement, pointsDAttention);

    await verifieTitresSectionsPresentes(
      canvasElement,
      new Set(["etMaintenant", "enSavoirPlus", "bienDebuter"]),
    );

    await expect(
      canvas.queryByText(texteIntroductionPdfPetiteEntite),
    ).not.toBeInTheDocument();

    const titrePrecisions = await canvas.findByText(pointsDAttention);
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
    donneesFormulaire: {
      ...archetypeDonneesFormulaire,
      designeOperateurServicesEssentiels: ["non"],
      typeStructure: ["privee"],
      secteurActivite: ["autreSecteurActivite"],
      activites: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await attendTexteCharge(canvasElement, pointsDAttention);

    await verifieTitresSectionsPresentes(canvasElement, new Set([]));

    const criteresDePossibleInclusion = "Critères de possible inclusion";

    const titrePrecisions = await canvas.findByText(
      criteresDePossibleInclusion,
    );
    expect(titrePrecisions).toBeInTheDocument();
    expect(titrePrecisions.tagName).toBe("H5");
  },
};

// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { expect } from "@storybook/jest";

import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { fabriqueDonneesFormulaire } from "../../../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";
import { SimulateurEtapeResult } from "../../../../Components/Simulateur/SimulateurEtapeResult.tsx";

import {
  texteIntroductionBienDebuterGrandeEntite,
  texteIntroductionBienDebuterPetiteEntite,
} from "../../../../References/LibellesResultatsEligibilite.ts";
import { attendTexteCharge } from "../../../utilitaires/interaction.facilitateurs.ts";
import { verifieTitresSectionsPresentes } from "./Resultat.aide.ts";

const archetypeDonneesFormulaire = fabriqueDonneesFormulaire({
  designationOperateurServicesEssentiels: ["non"],
  appartenancePaysUnionEuropeenne: ["france"],
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
      designationOperateurServicesEssentiels: ["oui"],
      trancheNombreEmployes: ["petit"],
      trancheChiffreAffaire: ["petit"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await attendTexteCharge(canvasElement, pointsDAttention);

    expect(
      await canvas.findByText(
        "Votre entité sera régulée par NIS 2 en tant qu’Entité Essentielle (EE)",
      ),
    );
    await verifieTitresSectionsPresentes(
      canvasElement,
      new Set(["etMaintenant", "enSavoirPlus", "bienDebuter"]),
    );

    expect(await canvas.findByText(pointsDAttention)).toBeInTheDocument();

    await canvas.findByText("Et Maintenant ?");
    await canvas.findByText(texteIntroductionBienDebuterPetiteEntite);
    await expect(
      canvas.queryByText(texteIntroductionBienDebuterGrandeEntite),
    ).not.toBeInTheDocument();
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
    expect(
      await canvas.findByText(
        "Votre entité sera régulée par NIS 2 en tant qu’Entité Essentielle (EE)",
      ),
    );
    await verifieTitresSectionsPresentes(
      canvasElement,
      new Set(["etMaintenant", "enSavoirPlus", "bienDebuter"]),
    );

    const titrePrecisions = await canvas.findByText(pointsDAttention);
    expect(titrePrecisions).toBeInTheDocument();
    expect(titrePrecisions.tagName).toBe("H4");

    await canvas.findByText(texteIntroductionBienDebuterPetiteEntite);
    await expect(
      canvas.queryByText(texteIntroductionBienDebuterGrandeEntite),
    ).not.toBeInTheDocument();
  },
};
export const ResultatNonReguleVoirAutrePaysUE: Story = {
  args: {
    donneesFormulaire: {
      ...archetypeDonneesFormulaire,
      trancheChiffreAffaire: ["moyen"],
      trancheNombreEmployes: ["moyen"],
      secteurActivite: ["infrastructureNumerique"],
      activites: ["registresNomsDomainesPremierNiveau"],
      fournitServicesUnionEuropeenne: ["oui"],
      localisationRepresentant: ["autre"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await attendTexteCharge(canvasElement, pointsDAttention);
    expect(
      await canvas.findByText(
        "Nous ne pouvons pas déterminer si votre " +
          "entité serait régulée par la directive NIS 2",
      ),
    );
    expect(
      await canvas.findByText(
        "Veuillez-vous rapprocher de votre autorité nationale compétente.",
      ),
    );
    // await verifieTitresSectionsPresentes(
    //   canvasElement,
    //   new Set(["etMaintenant", "enSavoirPlus", "bienDebuter"]),
    // );

    const titrePrecisions = await canvas.findByText(pointsDAttention);
    expect(titrePrecisions).toBeInTheDocument();
    expect(titrePrecisions.tagName).toBe("H4");

    await canvas.findByText(texteIntroductionBienDebuterPetiteEntite);
    await expect(
      canvas.queryByText(texteIntroductionBienDebuterGrandeEntite),
    ).not.toBeInTheDocument();
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

    expect(
      await canvas.findByText(
        "Votre entité sera régulée par NIS 2 en tant qu’Entité Essentielle (EE)",
      ),
    );

    await verifieTitresSectionsPresentes(
      canvasElement,
      new Set(["etMaintenant", "enSavoirPlus", "bienDebuter"]),
    );

    const titrePrecisions = await canvas.findByText(pointsDAttention);

    expect(titrePrecisions).toBeInTheDocument();
    expect(titrePrecisions.tagName).toBe("H4");

    await expect(
      canvas.queryByText(texteIntroductionBienDebuterPetiteEntite),
    ).not.toBeInTheDocument();
    await canvas.findByText(texteIntroductionBienDebuterGrandeEntite);
  },
};

export const ResultatNonEligible: Story = {
  args: {
    donneesFormulaire: {
      ...archetypeDonneesFormulaire,
      designationOperateurServicesEssentiels: ["non"],
      typeStructure: ["privee"],
      secteurActivite: ["autreSecteurActivite"],
      activites: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await attendTexteCharge(canvasElement, pointsDAttention);
    expect(
      await canvas.findByText("Votre entité ne sera pas régulée par NIS 2"),
    );

    await verifieTitresSectionsPresentes(
      canvasElement,
      new Set(["bienDebuter"]),
    );

    const criteresDePossibleInclusion = "Critères de possible inclusion";

    const titrePrecisions = await canvas.findByText(
      criteresDePossibleInclusion,
    );
    expect(titrePrecisions).toBeInTheDocument();
    expect(titrePrecisions.tagName).toBe("H5");
    await canvas.findByText(texteIntroductionBienDebuterPetiteEntite);
    await expect(
      canvas.queryByText(texteIntroductionBienDebuterGrandeEntite),
    ).not.toBeInTheDocument();
  },
};

import { expect } from "@storybook/jest";

import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { fabriqueDonneesFormulaire } from "anssi-nis2-core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique.ts";

import {
  texteIntroductionBienDebuterGrandeEntite,
  texteIntroductionBienDebuterPetiteEntite,
} from "../../../../References/LibellesResultatsEligibilite.ts";
import { attendTexteCharge } from "../../../utilitaires/interaction.facilitateurs.ts";
import { verifieTitresSectionsPresentes } from "../Resultat/Resultat.aide.ts";
import { EtapeResultat } from "../../../../Components/Simulateur/EtapesRefacto/EtapeResultat.tsx";
import { compareEtEnvoieVersSentry } from "../../../../Components/Simulateur/compareEtEnvoieVersSentry.tsx";

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

const meta: Meta<typeof EtapeResultat> = {
  title: "Composants/Simulateur/Resultat",
  component: EtapeResultat,
  args: {
    reponses: archetypeDonneesFormulaire,
    comparateurV1V2: compareEtEnvoieVersSentry,
  },
};

export default meta;
type Story = StoryObj<typeof EtapeResultat>;

const pointsDAttention = "Points d'attention";

export const ResultatEligibleOSE: Story = {
  args: {
    reponses: {
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
    reponses: {
      ...archetypeDonneesFormulaire,
      trancheChiffreAffaire: ["petit"],
      trancheNombreEmployes: ["petit"],
      secteurActivite: ["infrastructureNumerique"],
      activites: ["prestataireServiceConfianceQualifie"],
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
export const ResultatReguleAutrePaysUE: Story = {
  args: {
    reponses: {
      ...archetypeDonneesFormulaire,
      trancheChiffreAffaire: ["petit"],
      trancheNombreEmployes: ["petit"],
      secteurActivite: ["infrastructureNumerique"],
      activites: ["fournisseurServiceCommunicationElectroniquesPublics"],
      localisationFournitureServicesNumeriques: ["autre"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await attendTexteCharge(canvasElement, pointsDAttention);
    expect(await canvas.findByText("Votre entité sera régulée par NIS 2"));
    expect(
      await canvas.findByText(
        "Nous vous invitons à vous rapprocher de l’autorité nationale " +
          "compétente NIS 2 des autres États membres de l'UE dans lesquels " +
          "vous fournissez vos services.",
      ),
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
export const ResultatEligibleGrandeEntreprise: Story = {
  args: {
    reponses: {
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
    reponses: {
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

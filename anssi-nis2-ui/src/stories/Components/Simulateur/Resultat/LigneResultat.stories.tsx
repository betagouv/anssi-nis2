// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { LigneResultat } from "../../../../Components/Simulateur/Resultats/LigneResultat.tsx";
import { attendTexteCharge } from "../../../utilitaires/interaction.facilitateurs.ts";
import {
  etatRegulation_Incertain,
  etatRegulation_NonRegule,
  etatRegulation_Regule_DORA,
  etatRegulation_Regule_RegistreNomDeDomaines,
  etatRegulation_ReguleAutreEM,
  etatRegulation_ReguleAutreEMDontFrance,
  etatRegulation_ReguleEE,
  etatRegulation_ReguleEI,
  etatRegulation_ReguleTypeEntiteNonDefini,
} from "./EtatRegulation.exemples.ts";
import {
  verifieAucunBlocDepliable,
  verifieClasseBlocResultat,
  verifieIcone,
  verifieTexteAvertissementAbsent,
  verifieTexteAvertissementPresent,
  verifieTexteEnAnnexe,
} from "./LigneResultat.predicats.ts";

const meta: Meta<typeof LigneResultat> = {
  title: "Composants/Simulateur/Ligne Résultat",
  component: LigneResultat,
};
export default meta;

type Story = StoryObj<typeof LigneResultat>;

export const ReguleStandardEE: Story = {
  args: {
    etatRegulation: etatRegulation_ReguleEE,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    await verifieTexteAvertissementPresent(canvasElement);

    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const ReguleStandardEI: Story = {
  args: {
    etatRegulation: etatRegulation_ReguleEI,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    const canvas = within(canvasElement);
    expect(
      await canvas.findByText(
        "Votre entité sera régulée par NIS 2 en tant qu’Entité Importante (EI)",
      ),
    );
    await verifieTexteAvertissementPresent(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const ReguleFranceEtAutreEM: Story = {
  args: {
    etatRegulation: etatRegulation_ReguleAutreEMDontFrance,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      await canvas.findByText(
        "Votre entité sera régulée par NIS 2 en France " +
          "en tant qu’Entité Essentielle (EE)",
      ),
    );
    expect(
      await canvas.findByText(
        "En tant que fournisseur de réseaux de communications " +
          "électroniques publics ou fournisseur de services de communications " +
          "électroniques accessibles au public, nous vous invitons à vous " +
          "rapprocher de l’autorité nationale compétente NIS 2 des autres États " +
          "membres de l'UE dans lesquels vous fournissez vos services.",
      ),
    );
    await verifieTexteAvertissementPresent(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};
export const ReguleUniquementAutreEM: Story = {
  args: {
    etatRegulation: etatRegulation_ReguleAutreEM,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(await canvas.findByText("Votre entité sera régulée par NIS 2"));
    expect(
      await canvas.findByText(
        "Nous vous invitons à vous rapprocher de l’autorité nationale " +
          "compétente NIS 2 des autres États membres de l'UE dans lesquels " +
          "vous fournissez vos services.",
      ),
    );
    await verifieTexteAvertissementPresent(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};
export const ReguleDORA: Story = {
  args: {
    etatRegulation: etatRegulation_Regule_DORA,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "DORA";
    await verifieTexteAvertissementPresent(canvasElement);
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};
export const ReguleEnregistrementDeNomsDeDomaines: Story = {
  args: {
    etatRegulation: etatRegulation_Regule_RegistreNomDeDomaines,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Enregistrement de noms de domaines";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};
export const ReguleAvecTypeEntiteNonDefini: Story = {
  args: {
    etatRegulation: etatRegulation_ReguleTypeEntiteNonDefini,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Enregistrement de noms de domaines";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    const canvas = within(canvasElement);
    expect(await canvas.findByText("Votre entité sera régulée par NIS 2"));
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const NonReguleStandard: Story = {
  args: {
    etatRegulation: etatRegulation_NonRegule,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Critères de possible inclusion";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    await verifieTexteAvertissementPresent(canvasElement);

    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const NonReguleHorsUE: Story = {
  args: {
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: {
        _tag: "ConstructionTestEnCours",
        typeConstructionEnCours: "HorsUnionEuropeenne",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Ce résultat est présenté au vu des éléments saisis.";
    await attendTexteCharge(canvasElement, texteEnAnnexe);
    await verifieTexteAvertissementPresent(canvasElement);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const IncertainStandard: Story = {
  args: {
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: { _tag: "EnAttenteTranspositionLoiFrancaise" },
    },
  },
  play: async ({ canvasElement }) => {
    verifieTexteAvertissementAbsent(canvasElement);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain");
    verifieIcone(canvasElement, "fr-nis2-icon-in-progress");
  },
};

export const IncertainAutrePaysUE: Story = {
  args: {
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: { _tag: "DefiniDansUnAutreEtatMembre" },
    },
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe =
      "Veuillez-vous rapprocher de votre autorité nationale compétente.";
    await attendTexteCharge(canvasElement, texteEnAnnexe);
    await verifieTexteAvertissementPresent(canvasElement);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain-UE");
    verifieIcone(canvasElement, "fr-icon-question-fill");
  },
};

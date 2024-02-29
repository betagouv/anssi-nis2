// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";

import {
  CausesRegulation,
  Regulation,
} from "../../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { PrecisionsResultat } from "../../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
import { EtatRegulationDefinitif } from "../../../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import { ens } from "../../../../../../commun/utils/services/sets.operations.ts";
import { LigneResultat } from "../../../../Components/Simulateur/Resultats/LigneResultat.tsx";
import { attendTexteCharge } from "../../../utilitaires/interaction.facilitateurs.ts";
import {
  verifieAucunBlocDepliable,
  verifieClasseBlocResultat,
  verifieIcone,
  verifieTexteEnAnnexe,
} from "./LigneResultat.predicats.ts";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof LigneResultat> = {
  title: "Composants/Simulateur/Ligne Résultat",
  component: LigneResultat,
};
export default meta;

type Story = StoryObj<typeof LigneResultat>;

const etatRegulation_ReguleEI: EtatRegulationDefinitif = {
  decision: Regulation.Regule,
  _resultatEvaluationRegulation: "Definitif",
  typeEntite: "EntiteImportante",
  etapeEvaluee: "InformationsSecteur",
  causes: {
    _categorieTaille: "Grand",
    secteurs: ens({
      secteurActivite: "sante",
      activites: ens("laboratoireReferenceUE"),
    }),
  } as CausesRegulation,
};
const etatRegulation_NonRegule: EtatRegulationDefinitif = {
  decision: Regulation.NonRegule,
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee: "InformationsSecteur",
};
const etatRegulation_Incertain: EtatRegulationDefinitif = {
  decision: Regulation.Incertain,
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee: "InformationsSecteur",
};
export const ReguleStandard: Story = {
  args: {
    precision: PrecisionsResultat.Standard,
    etatRegulation: etatRegulation_ReguleEI,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);

    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};
export const ReguleStandardEI: Story = {
  args: {
    precision: PrecisionsResultat.Standard,
    etatRegulation: etatRegulation_ReguleEI,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    expect(
      await within(canvasElement).findByText(
        "Votre entité sera régulée par NIS 2 en tant qu’Entité Importante (EI)",
      ),
    );
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const ReguleDORA: Story = {
  args: {
    precision: PrecisionsResultat.DORA,
    etatRegulation: etatRegulation_ReguleEI,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "DORA";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const ReguleEnregistrementDeNomsDeDomaines: Story = {
  args: {
    precision: PrecisionsResultat.EnregistrementDeNomsDeDomaine,
    etatRegulation: etatRegulation_ReguleEI,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Enregistrement de noms de domaines";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const NonReguleStandard: Story = {
  args: {
    precision: PrecisionsResultat.Standard,
    etatRegulation: etatRegulation_NonRegule,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Critères de possible inclusion";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const NonReguleHorsUE: Story = {
  args: {
    precision: PrecisionsResultat.HorsUnionEuropeenne,
    etatRegulation: etatRegulation_NonRegule,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Ce résultat est présenté au vu des éléments saisis.";
    await attendTexteCharge(canvasElement, texteEnAnnexe);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const IncertainStandard: Story = {
  args: {
    precision: PrecisionsResultat.Standard,
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: { _tag: "ConstructionTestEnCours" },
    },
  },
  play: async ({ canvasElement }) => {
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain");
    verifieIcone(canvasElement, "fr-nis2-icon-in-progress");
  },
};

export const IncertainAutrePaysUE: Story = {
  args: {
    precision: PrecisionsResultat.AutrePaysUnionEuropeenne,
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: { _tag: "DefiniDansUnAutreEtatMembre" },
    },
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe =
      "Veuillez-vous rapprocher de votre autorité nationale compétente.";
    await attendTexteCharge(canvasElement, texteEnAnnexe);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain-UE");
    verifieIcone(canvasElement, "fr-icon-question-fill");
  },
};

// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { Meta, StoryObj } from "@storybook/react";
import { Regulation } from "../../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { PrecisionsResultat } from "../../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
import { LigneResultat } from "../../../../Components/Simulateur/Resultats/LigneResultat.tsx";
import { attendTexteCharge } from "../../../utilitaires/interaction.facilitateurs.ts";
import {
  verifieAucunBlocDepliable,
  verifieClasseBlocResultat,
  verifieIcone,
  verifieTexteEnAnnexe,
} from "./LigneResultat.predicats.ts";

const meta: Meta<typeof LigneResultat> = {
  title: "Composants/Simulateur/Ligne Résultat",
  component: LigneResultat,
};
export default meta;

type Story = StoryObj<typeof LigneResultat>;

export const ReguleStandard: Story = {
  args: {
    regulation: Regulation.Regule,
    precision: PrecisionsResultat.Standard,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);

    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const ReguleDORA: Story = {
  args: {
    regulation: Regulation.Regule,
    precision: PrecisionsResultat.DORA,
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
    regulation: Regulation.Regule,
    precision: PrecisionsResultat.EnregistrementDeNomsDeDomaine,
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
    regulation: Regulation.NonRegule,
    precision: PrecisionsResultat.Standard,
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
    regulation: Regulation.NonRegule,
    precision: PrecisionsResultat.HorsUnionEuropeenne,
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
    regulation: Regulation.Incertain,
    precision: PrecisionsResultat.Standard,
  },
  play: async ({ canvasElement }) => {
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain");
    verifieIcone(canvasElement, "fr-nis2-icon-in-progress");
  },
};

export const IncertainAutrePaysUE: Story = {
  args: {
    regulation: Regulation.Incertain,
    precision: PrecisionsResultat.AutrePaysUnionEuropeenne,
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

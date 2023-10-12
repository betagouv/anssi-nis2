import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtapeResult } from "../../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { within } from "@storybook/testing-library";

import {
  contenusResultatEligible,
  contenusResultatNonEligible,
} from "../../../References/contenusResultatEligibilite.ts";
import { ContenusResultatEligibilite } from "../../../Services/Simulateur/Props/contenusResultatEligibilite";

const meta: Meta<typeof SimulateurEtapeResult> = {
  component: SimulateurEtapeResult,
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur({}),
  },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtapeResult>;

const verifieContenuResultatDansPage = (
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
};

export const ResultatEligibleOSE: Story = {
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur({
      designeOperateurServicesEssentiels: ["oui"],
    }),
  },
  play: async ({ canvasElement }) => {
    verifieContenuResultatDansPage(canvasElement, contenusResultatEligible);
  },
};

const archetypeDonneesFormulaire = new DonneesFormulaireSimulateur({
  designeOperateurServicesEssentiels: ["non"],
  trancheCA: ["petit"],
  trancheNombreEmployes: ["petit"],
  etatMembre: ["france"],
  typeStructure: ["privee"],
  secteurActivite: ["fournisseursNumeriques"],
  activites: ["fournisseursPlaceMarcheEnLigne"],
});
export const ResultatEligiblePetiteEntreprise: Story = {
  args: {
    donneesFormulaire: archetypeDonneesFormulaire.avec({
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
    }),
  },
  play: async ({ canvasElement }) => {
    verifieContenuResultatDansPage(canvasElement, contenusResultatEligible);
  },
};

export const ResultatNonEligible: Story = {
  play: async ({ canvasElement }) => {
    verifieContenuResultatDansPage(canvasElement, contenusResultatNonEligible);
  },
};

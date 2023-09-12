import type { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtape1 } from "../../../Components/Simulateur";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { emptySimulateurFormData } from "../../../Services/simulateurFrontServices.ts";
import { ValeursClePaysUnionEuropeenne } from "../../../Domaine/DomaineSimulateur.ts";
import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";

class ParametresDonneesEtatMembre extends ParametresDonneesSpecifiqueField<ValeursClePaysUnionEuropeenne> {
  protected construitDonnees<ValeursClePaysUnionEuropeenne>(
    listeEtatsMembres: ValeursClePaysUnionEuropeenne[],
  ) {
    return this.construitDonneesPourField("etatMembre", listeEtatsMembres);
  }
}

class CollectionParametresDonneesEtatMembre extends CollectionParametresDonnees<ParametresDonneesEtatMembre> {}

const donneesFormulaireOptions: CollectionParametresDonneesEtatMembre =
  new CollectionParametresDonneesEtatMembre(
    new ParametresDonneesEtatMembre("France Uniquement", ["france"]),
    new ParametresDonneesEtatMembre("France et autre", ["france", "autre"]),
    new ParametresDonneesEtatMembre("France et Hors UE", ["france", "horsue"]),
    new ParametresDonneesEtatMembre("Tous", ["france", "autre", "horsue"]),
    new ParametresDonneesEtatMembre("Autre et Hors UE", ["autre", "horsue"]),
    new ParametresDonneesEtatMembre("Autre Uniquement", ["autre"]),
    new ParametresDonneesEtatMembre("Hors UE Uniquement", ["horsue"]),
  );

const meta: Meta<typeof SimulateurEtape1> = {
  component: SimulateurEtape1,
  argTypes: {
    propageActionSimulateur: { action: true },
    formData: donneesFormulaireOptions.getFormData(), //CollectionParametresDonneesEtatMembre
  },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtape1>;

const creeActionPropagationFormulaireSimu = (newValue: string) => {
  const actionTypique = {
    type: "checkMulti",
    name: "etatMembre",
  };
  return {
    ...actionTypique,
    newValue: newValue,
  };
};

export const CliqueSurLesOptions: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    const optionsATester = [
      { libelle: "France", newValue: "france" },
      { libelle: "Autre état membre", newValue: "autre" },
      { libelle: "Hors Union Européenne", newValue: "horsue" },
    ];

    for (const { libelle, newValue } of optionsATester) {
      const actionPropagee = creeActionPropagationFormulaireSimu(newValue);
      await step(
        `Clique sur '${libelle}' déclanche le dispatch d'action '${actionPropagee.type}' sur le champs '${actionPropagee.name}' pour une valeur '${newValue}'`,
        async () => {
          await userEvent.click(await canvas.findByText(libelle));
          await expect(propageActionSimulateur).toHaveBeenCalledWith(
            actionPropagee,
          );
        },
      );
    }
  },
};

export const CocheFrance: Story = {
  args: {
    formData: {
      ...emptySimulateurFormData,
      etatMembre: ["france"],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step("Il y a 3 cases à cocher", async () =>
      expect((await canvas.findAllByRole("checkbox")).length).toBe(3),
    );
    step("Seule la case France est cochée", async () => {
      const casesCochees = await canvas.findAllByRole("checkbox", {
        checked: true,
      });
      await expect(casesCochees.length).toBe(1);

      await expect(casesCochees[0].getAttribute("value")).toBe("france");
    });
  },
};

export const CocheFranceEtHorsUE: Story = {
  args: {
    formData: {
      ...emptySimulateurFormData,
      etatMembre: ["france", "horsue"],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step("Il y a 3 cases à cocher", async () =>
      expect((await canvas.findAllByRole("checkbox")).length).toBe(3),
    );
    step("Seule la case France est cochée", async () => {
      const casesCochees = await canvas.findAllByRole("checkbox", {
        checked: true,
      });
      await expect(casesCochees.length).toBe(2);

      await expect(casesCochees[0].getAttribute("value")).toBe("france");
      await expect(casesCochees[1].getAttribute("value")).toBe("horsue");
    });
  },
};

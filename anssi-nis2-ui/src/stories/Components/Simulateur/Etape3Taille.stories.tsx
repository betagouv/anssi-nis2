import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";
import {
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
} from "../../../Domaine/DomaineSimulateur.ts";
import { Etape3Taille } from "../../../Components/Simulateur";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { SimulateurFormData } from "../../../Services/Simulateur/FormData.ts";

class ParametresDonneesTrancheNombreEmployes extends ParametresDonneesSpecifiqueField<ValeursTrancheNombreEmployes> {
  protected construitDonnees<ValeursTrancheNombreEmployes>(
    valeurs: ValeursTrancheNombreEmployes[],
  ): SimulateurFormData {
    return this.construitDonneesPourField("trancheNombreEmployes", valeurs);
  }
}

class CollectionParametresDonneesTrancheNombreEmployes extends CollectionParametresDonnees<ParametresDonneesTrancheNombreEmployes> {}

const donneesFormulaireOptions: CollectionParametresDonneesTrancheNombreEmployes =
  new CollectionParametresDonneesTrancheNombreEmployes();

const meta: Meta<typeof Etape3Taille> = {
  component: Etape3Taille,
  argTypes: {
    propageActionSimulateur: { action: true },
    formData: donneesFormulaireOptions.getFormData(),
  },
};

export default meta;
type Story = StoryObj<typeof Etape3Taille>;

const creeActionPropagationFormulaireTrancheNombreEmployes = (
  newValue: ValeursTrancheNombreEmployes,
) => {
  const actionTypique = {
    type: "checkSingle",
    name: "trancheNombreEmployes",
  };
  return { ...actionTypique, newValue: newValue };
};
const creeActionPropagationFormulaireTrancheCA = (
  newValue: ValeursTrancheCA,
) => {
  const actionTypique = {
    type: "checkSingle",
    name: "trancheCA",
  };
  return { ...actionTypique, newValue: newValue };
};

export const CliqueSurLesOptions: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    step("Nombre d'employés", async () => {
      const optionsATester: {
        libelle: string;
        newValue: ValeursTrancheNombreEmployes;
      }[] = [
        {
          libelle: "1 à 49",
          newValue: "petit",
        },
      ];
      for (const { libelle, newValue } of optionsATester) {
        const actionPropagee =
          creeActionPropagationFormulaireTrancheNombreEmployes(newValue);
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
    });

    step("Chiffre d'affaire", async () => {
      const optionsATester: {
        libelle: string;
        newValue: ValeursTrancheNombreEmployes;
      }[] = [
        {
          libelle: "10 à 50 millions €, ou bilan annuel de 10 à 43 millions €",
          newValue: "moyen",
        },
      ];
      for (const { libelle, newValue } of optionsATester) {
        const actionPropagee =
          creeActionPropagationFormulaireTrancheCA(newValue);
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
    });
  },
};

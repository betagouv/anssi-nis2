import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { DonneesFormulaireSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";
import { EtapeTaille } from "../../../Components/Simulateur/Etapes";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

class ParametresDonneesTrancheNombreEmployes extends ParametresDonneesSpecifiqueField<TrancheNombreEmployes> {
  protected construitDonnees<ValeursTrancheNombreEmployes>(
    valeurs: ValeursTrancheNombreEmployes[],
  ): DonneesFormulaireSimulateur {
    return this.construitDonneesPourField("trancheNombreEmployes", valeurs);
  }
}

class CollectionParametresDonneesTrancheNombreEmployes extends CollectionParametresDonnees<ParametresDonneesTrancheNombreEmployes> {}

const donneesFormulaireOptions: CollectionParametresDonneesTrancheNombreEmployes =
  new CollectionParametresDonneesTrancheNombreEmployes();

const meta: Meta<typeof EtapeTaille> = {
  title: "Composants/Simulateur/Etapes/4 - Taille",
  component: EtapeTaille,
  argTypes: {
    propageActionSimulateur: { action: true },
    donneesFormulaire: donneesFormulaireOptions.getFormData(),
  },
};

export default meta;
type Story = StoryObj<typeof EtapeTaille>;

const creeActionPropagationFormulaireTrancheNombreEmployes = (
  newValue: TrancheNombreEmployes,
) => {
  const actionTypique = {
    type: "checkSingle",
    name: "trancheNombreEmployes",
  };
  return { ...actionTypique, newValue: newValue };
};
const creeActionPropagationFormulairetrancheChiffreAffaire = (
  newValue: TrancheChiffreAffaire,
) => {
  const actionTypique = {
    type: "checkSingle",
    name: "trancheChiffreAffaire",
  };
  return { ...actionTypique, newValue: newValue };
};

export const TailleStandard: Story = {
  name: "Taille (Standard)",
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    step("Nombre d'employés", async () => {
      const optionsATester: {
        libelle: string;
        newValue: TrancheNombreEmployes;
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
        newValue: TrancheNombreEmployes;
      }[] = [
        {
          libelle: "10 à 50 millions €, ou bilan annuel de 10 à 43 millions €",
          newValue: "moyen",
        },
      ];
      for (const { libelle, newValue } of optionsATester) {
        const actionPropagee =
          creeActionPropagationFormulairetrancheChiffreAffaire(newValue);
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

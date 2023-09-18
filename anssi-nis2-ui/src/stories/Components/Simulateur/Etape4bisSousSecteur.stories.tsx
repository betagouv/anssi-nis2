import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";
import { Etape4bisSousSecteur } from "../../../Components/Simulateur";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { DonneesFormulaireSimulateur } from "../../../Services/Simulateur/donneesFormulaire.ts";
import { ValeursSousSecteurEnergie } from "../../../Domaine/Simulateur/ValeursCles.ts";

class ParametresDonneesSousSecteurActivite extends ParametresDonneesSpecifiqueField<ValeursSousSecteurEnergie> {
  protected construitDonnees<ValeursSecteurActivite>(
    valeurs: ValeursSecteurActivite[],
  ): DonneesFormulaireSimulateur {
    return this.construitDonneesPourField("secteurActivite", valeurs);
  }
}

class CollectionParametresDonneesSousSecteurActivites extends CollectionParametresDonnees<ParametresDonneesSousSecteurActivite> {}

const donneesFormulaireOptions: CollectionParametresDonneesSousSecteurActivites =
  new CollectionParametresDonneesSousSecteurActivites();

const meta: Meta<typeof Etape4bisSousSecteur> = {
  component: Etape4bisSousSecteur,
  argTypes: {
    propageActionSimulateur: { action: true },
    formData: donneesFormulaireOptions.getFormData(),
  },
};

export default meta;
type Story = StoryObj<typeof Etape4bisSousSecteur>;

const creeActionPropagationFormulaireActivite = (
  newValue: ValeursSousSecteurEnergie,
) => {
  const actionTypique = {
    type: "checkMulti",
    name: "sousSecteurActivite",
  };
  return { ...actionTypique, newValue: newValue };
};

export const SousSecteurEnergie: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    const optionsATester: {
      libelle: string;
      newValue: ValeursSousSecteurEnergie;
    }[] = [
      {
        libelle: "Électricité",
        newValue: "electricite",
      },
    ];

    for (const { libelle, newValue } of optionsATester) {
      const actionPropagee = creeActionPropagationFormulaireActivite(newValue);
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

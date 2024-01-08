import { DonneesFormulaireSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.ts";
import { SecteurActivite } from "../../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";
import { EtapeSecteursActivite } from "../../../Components/Simulateur/Etapes";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

class ParametresDonneesSecteurActivite extends ParametresDonneesSpecifiqueField<SecteurActivite> {
  protected construitDonnees<ValeursSecteurActivite>(
    valeurs: ValeursSecteurActivite[],
  ): DonneesFormulaireSimulateur {
    return this.construitDonneesPourField("secteurActivite", valeurs);
  }
}

class CollectionParametresDonneesSecteurActivites extends CollectionParametresDonnees<ParametresDonneesSecteurActivite> {}

const donneesFormulaireOptions: CollectionParametresDonneesSecteurActivites =
  new CollectionParametresDonneesSecteurActivites();

const meta: Meta<typeof EtapeSecteursActivite> = {
  title: "Composants/Simulateur/Etapes/5 - Secteur d'activité",
  component: EtapeSecteursActivite,
  argTypes: {
    propageActionSimulateur: { action: true },
    donneesFormulaire: donneesFormulaireOptions.getFormData(),
  },
};

export default meta;
type Story = StoryObj<typeof EtapeSecteursActivite>;

const creeActionPropagationFormulaireActivite = (newValue: SecteurActivite) => {
  const actionTypique = {
    type: "checkMulti",
    name: "secteurActivite",
  };
  return { ...actionTypique, newValue: newValue };
};

export const SecteurActiviteSimple: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    const optionsATester: {
      libelle: string;
      newValue: SecteurActivite;
    }[] = [
      {
        libelle: "Énergie",
        newValue: "energie",
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

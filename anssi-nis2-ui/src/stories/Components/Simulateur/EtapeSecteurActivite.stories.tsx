import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";
import { EtapeSecteursActivite } from "../../../Components/Simulateur";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";

import { SecteurActivite } from "../../../Domaine/Simulateur/SecteursActivite";

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

export const CliqueSurLesOptions: Story = {
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

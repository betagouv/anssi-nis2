import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";
import { EtapeSousSecteursActivite } from "../../../Components/Simulateur";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";

import { SousSecteurEnergie } from "../../../Domaine/Simulateur/SousSecteurs.ts";

class ParametresDonneesSousSecteurActivite extends ParametresDonneesSpecifiqueField<SousSecteurEnergie> {
  protected construitDonnees<ValeursSecteurActivite>(
    valeurs: ValeursSecteurActivite[],
  ): DonneesFormulaireSimulateur {
    return this.construitDonneesPourField("sousSecteurActivite", valeurs);
  }
}

class CollectionParametresDonneesSousSecteurActivites extends CollectionParametresDonnees<ParametresDonneesSousSecteurActivite> {}

const donneesFormulaireOptions: CollectionParametresDonneesSousSecteurActivites =
  new CollectionParametresDonneesSousSecteurActivites();

const meta: Meta<typeof EtapeSousSecteursActivite> = {
  component: EtapeSousSecteursActivite,
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur({
      secteurActivite: ["energie"],
      sousSecteurActivite: ["electricite"],
    }),
  },
  argTypes: {
    propageActionSimulateur: { action: true },
    donneesFormulaire: donneesFormulaireOptions.getFormData(),
  },
};

export default meta;
type Story = StoryObj<typeof EtapeSousSecteursActivite>;

const creeActionPropagationFormulaireActivite = (
  newValue: SousSecteurEnergie,
) => {
  const actionTypique = {
    type: "checkMulti",
    name: "sousSecteurActivite",
  };
  return { ...actionTypique, newValue: newValue };
};

export const SelectionneSousSecteurEnergie: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    const optionsATester: {
      libelle: string;
      newValue: SousSecteurEnergie;
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

export const MixSecteursEtSousSecteurs: Story = {
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur({
      secteurActivite: ["espace", "energie", "transports"],
      sousSecteurActivite: ["electricite", "hydrogene"],
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByLabelText("Électricité")).toBeChecked();
    expect(await canvas.getByLabelText("Gaz")).not.toBeChecked();
    expect(await canvas.getByLabelText("Hydrogène")).toBeChecked();

    expect(await canvas.getByText("Énergie")).toBeInTheDocument();
    expect(await canvas.getByText("Transports")).toBeInTheDocument();
  },
};

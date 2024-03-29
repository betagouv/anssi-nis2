import { TypeStructure } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { donneesFormulaireSimulateurVide } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes.ts";
import { DonneesFormulaireSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";
import { EtapeTypeStructure } from "../../../Components/Simulateur/Etapes";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { libellesTypesStructure } from "../../../References/Libelles.ts";

class ParametresDonneesTypeStructure extends ParametresDonneesSpecifiqueField<TypeStructure> {
  protected construitDonnees<ValeursTypeStructure>(
    valeurs: ValeursTypeStructure[],
  ): DonneesFormulaireSimulateur {
    return this.construitDonneesPourField("typeStructure", valeurs);
  }
}

class CollectionParametresDonneesTypeStructure extends CollectionParametresDonnees<ParametresDonneesTypeStructure> {}

const donneesFormulaireOptions: CollectionParametresDonneesTypeStructure =
  new CollectionParametresDonneesTypeStructure();

const meta: Meta<typeof EtapeTypeStructure> = {
  title: "Composants/Simulateur/Etapes/3 - Type de Structure",
  component: EtapeTypeStructure,
  argTypes: {
    propageActionSimulateur: { action: true },
    donneesFormulaire: donneesFormulaireOptions.getFormData(),
  },
};

export default meta;
type Story = StoryObj<typeof EtapeTypeStructure>;

const creeActionPropagationFormulaireActivite = (newValue: TypeStructure) => {
  const actionTypique = {
    type: "checkSingle",
    name: "typeStructure",
  };
  return { ...actionTypique, newValue: newValue };
};

export const TypeStructureCoche: Story = {
  args: {
    donneesFormulaire: donneesFormulaireSimulateurVide,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    const optionsATester: {
      libelle: string;
      newValue: TypeStructure;
    }[] = [
      {
        libelle: libellesTypesStructure["publique"],
        newValue: "publique",
      },
    ];
    const questionSubsidiaire = canvas.queryByText(
      "Précisez le type d’entité publique :",
    );
    await expect(questionSubsidiaire).toBeNull();

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

export const SousQuestionPublique: Story = {
  args: {
    donneesFormulaire: {
      ...donneesFormulaireSimulateurVide,
      typeStructure: ["publique"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const libellesPresents = [
      "Précisez le type d’entité publique :",
      "Administration centrale",
      "Collectivité territoriale",
      "Autre structure publique",
    ];
    for (const libelle of libellesPresents) {
      await expect(await canvas.findByText(libelle)).toBeInTheDocument();
    }
  },
};

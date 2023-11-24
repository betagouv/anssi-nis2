import type { Meta, StoryObj } from "@storybook/react";
import { EtapeLocalisation } from "../../../Components/Simulateur/Etapes";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";
import { DonneesFormulaireSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { libellesPaysUnionEuropeenneLocalisation } from "../../../References/Libelles.ts";
import { AppartenancePaysUnionEuropeenne } from "../../../../../anssi-nis2-domain/src/Simulateur/ChampsSimulateur.definitions.ts";

class ParametresDonneesEtatMembre extends ParametresDonneesSpecifiqueField<AppartenancePaysUnionEuropeenne> {
  protected construitDonnees<ValeursClePaysUnionEuropeenne>(
    listeEtatsMembres: ValeursClePaysUnionEuropeenne[],
  ) {
    return this.construitDonneesPourField("etatMembre", listeEtatsMembres);
  }
}

class CollectionParametresDonneesEtatMembre extends CollectionParametresDonnees<ParametresDonneesEtatMembre> {}

const donneesFormulaireOptions: CollectionParametresDonneesEtatMembre =
  new CollectionParametresDonneesEtatMembre(
    new ParametresDonneesEtatMembre("France", ["france"]),
    new ParametresDonneesEtatMembre("Autre", ["autre"]),
    new ParametresDonneesEtatMembre("Hors UE", ["horsue"]),
  );

const meta: Meta<typeof EtapeLocalisation> = {
  title: "Composants/Simulateur/Etapes/2 - Localisation",
  component: EtapeLocalisation,
  argTypes: {
    propageActionSimulateur: { action: true },
    donneesFormulaire: donneesFormulaireOptions.getFormData(),
  },
};

export default meta;
type Story = StoryObj<typeof EtapeLocalisation>;

const creeActionPropagationFormulaireSimu = (newValue: string) => {
  const actionTypique = {
    type: "checkSingle",
    name: "etatMembre",
  };
  return {
    ...actionTypique,
    newValue: newValue,
  };
};

export const LocalisationStandard: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    const optionsATester = [
      {
        libelle: libellesPaysUnionEuropeenneLocalisation["france"],
        newValue: "france",
      },
      {
        libelle: libellesPaysUnionEuropeenneLocalisation["autre"],
        newValue: "autre",
      },
      {
        libelle: libellesPaysUnionEuropeenneLocalisation["horsue"],
        newValue: "horsue",
      },
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
    donneesFormulaire: new DonneesFormulaireSimulateur({
      etatMembre: ["france"],
    }),
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

export const CocheHorsUE: Story = {
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur({
      etatMembre: ["horsue"],
    }),
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

      await expect(casesCochees[0].getAttribute("value")).toBe("horsue");
    });
  },
};

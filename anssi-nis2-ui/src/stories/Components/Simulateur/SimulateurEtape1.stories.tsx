import type { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtape1 } from "../../../Components/Simulateur";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { emptySimulateurFormData } from "../../../Services/simulateurFrontServices.ts";

const values = [
  {
    ...emptySimulateurFormData,
    etatMembre: ["france"],
  },
  {
    ...emptySimulateurFormData,
    etatMembre: ["france", "autre"],
  },
];
//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SimulateurEtape1> = {
  component: SimulateurEtape1,
  argTypes: {
    propageActionSimulateur: { action: true },
    formData: {
      options: Object.keys(values),
      mapping: values,
      control: {
        type: "select",
        labels: ["France seulement", "France et autre"],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimulateurEtape1>;

export const CliqueSurLesOptions: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;
    const actionTypique = {
      type: "checkMulti",
      name: "etatMembre",
      newValue: "",
    };

    const optionsATester = [
      { libelle: "France", newValue: "france" },
      { libelle: "Autre état membre", newValue: "autre" },
      { libelle: "Hors Union Européenne", newValue: "horsue" },
    ];

    for (const { libelle, newValue } of optionsATester) {
      await step(
        `Clique sur '${libelle}' déclanche le dispatch d'action '${actionTypique.type}' sur le champs '${actionTypique.name}' pour une valeur '${newValue}'`,
        async () => {
          await userEvent.click(await canvas.findByText(libelle));

          await expect(propageActionSimulateur).toHaveBeenCalledWith({
            ...actionTypique,
            newValue: newValue,
          });
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
      expect(casesCochees.length).toBe(1);

      expect(casesCochees[0].getAttribute("value")).toBe("france");
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
      expect(casesCochees.length).toBe(2);

      expect(casesCochees[0].getAttribute("value")).toBe("france");
      expect(casesCochees[1].getAttribute("value")).toBe("horsue");
    });
  },
};

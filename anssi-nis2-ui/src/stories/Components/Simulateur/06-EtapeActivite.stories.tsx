import type { Meta, StoryObj } from "@storybook/react";
import { fabriqueDonneesFormulaire } from "../../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { EtapeActivites } from "../../../Components/Simulateur/Etapes";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite";
import { CanvasObject } from "../../utilitaires/Canvas.d.tsx";

const meta: Meta<typeof EtapeActivites> = {
  title: "Composants/Simulateur/Etapes/6 - Activites",
  component: EtapeActivites,
  args: {
    donneesFormulaire: fabriqueDonneesFormulaire({
      secteurActivite: ["energie"],
      sousSecteurActivite: ["electricite"],
    }),
  },
  argTypes: {
    propageActionSimulateur: { action: true },
  },
};

export default meta;
type Story = StoryObj<typeof EtapeActivites>;

const creeActionPropagationFormulaireActivite = (newValue: string) => {
  const actionTypique = {
    type: "checkMulti",
    name: "activites",
  };
  return { ...actionTypique, newValue: newValue };
};

export const AffichageActivitesEtLibellesParSecteurs: Story = {
  args: {
    donneesFormulaire: fabriqueDonneesFormulaire({
      secteurActivite: ["energie", "espace", "autreSecteurActivite"],
      sousSecteurActivite: ["electricite", "autreSousSecteurEnergie"],
    }),
  },
  play: async ({ canvasElement, step }) => {
    const canvas: CanvasObject = within(canvasElement);
    step("Les titres des secteurs simples sont affichés", async () => {
      expect(
        await canvas.findByText(libellesSecteursActivite["espace"]),
      ).toBeInTheDocument();
    });
    step(
      "Pas besoin d'activités pour les secteurs et sous secteurs 'autres'",
      async () => {
        await waitFor(async () =>
          expect(
            canvas.queryByText(
              libellesSecteursActivite["autreSecteurActivite"],
            ),
          ).not.toBeInTheDocument(),
        );
      },
    );
  },
};

export const ActiviteStandard: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;

    const optionsATester = [
      {
        libelle:
          "Entreprise d’électricité remplissant une fonction de fourniture",
        newValue: "entrepriseElectriciteRemplissantFonctionFourniture",
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

export const AffichageInfobulles: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;
    const elementInfobulle = `Entreprise d’électricité remplissant une fonction de fourniture`;
    const contenuAffiche = "Entreprise d’électricité";
    const iconeInformation = await canvas.findByTitle(
      `Informations à propos de l'activité "${elementInfobulle}"`,
    );
    const paragraphe = canvas.getByText(contenuAffiche);
    expect(paragraphe.parentElement).toBeDefined();
    const parentElement = paragraphe.parentElement as HTMLElement;
    const divInfobulle = parentElement.classList;

    expect(divInfobulle).toContain("fr-hidden");
    await userEvent.click(iconeInformation);
    expect(divInfobulle).not.toContain("fr-hidden");
    expect(propageActionSimulateur).not.toHaveBeenCalled();
    await userEvent.click(iconeInformation);
    expect(divInfobulle).toContain("fr-hidden");

    expect(propageActionSimulateur).not.toHaveBeenCalled();
    await userEvent.click(iconeInformation);
    expect(propageActionSimulateur).not.toHaveBeenCalled();
    await userEvent.click(
      within(parentElement).getByTitle("Masquer le message"),
    );
    expect(divInfobulle).toContain("fr-hidden");
    expect(propageActionSimulateur).not.toHaveBeenCalled();
  },
};

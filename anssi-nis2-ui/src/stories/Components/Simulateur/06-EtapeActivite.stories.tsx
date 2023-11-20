import type { Meta, StoryObj } from "@storybook/react";
import { EtapeActivites } from "../../../Components/Simulateur/Etapes";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  CollectionParametresDonnees,
  ParametresDonneesSpecifiqueField,
} from "../../utilitaires/parametresFormulaire.ts";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import { CanvasObject } from "../../utilitaires/Canvas.d.tsx";

class ParametresDonneesActivites extends ParametresDonneesSpecifiqueField<string> {
  protected construitDonnees<ValeursActivites>(
    listeValeurs: ValeursActivites[],
  ) {
    return this.construitDonneesPourField("activites", listeValeurs);
  }
}

class CollectionParametresDonneesActivites extends CollectionParametresDonnees<ParametresDonneesActivites> {}

const donneesFormulaireOptions: CollectionParametresDonneesActivites =
  new CollectionParametresDonneesActivites(
    new ParametresDonneesActivites("France Uniquement", ["france"]),
  );

const meta: Meta<typeof EtapeActivites> = {
  title: "Composants/Simulateur/Etapes/6 - Activites",
  component: EtapeActivites,
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
    donneesFormulaire: new DonneesFormulaireSimulateur({
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
            await canvas.findByText(
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
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const { propageActionSimulateur } = args;
    const elementInfobulle = `Entreprise d’électricité remplissant une fonction de fourniture`;
    const contenuAffiche = "Entreprise d’électricité";
    await step(
      `Clique sur '${elementInfobulle}' affiche une infobulle`,
      async () => {
        const iconeInformation = await canvas.findByTitle(
          `Informations à propos de l'activité "${elementInfobulle}"`,
        );
        const paragraphe = await canvas.getByText(contenuAffiche);
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
    );
  },
};

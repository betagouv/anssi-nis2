import { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtapePrealable } from "../../../Components/Simulateur/SimulateurEtapePrealable.tsx";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";
import { jest } from "@storybook/jest";
import { donneesFormulaireSimulateurVide } from "../../../Domaine/Simulateur/DonneesFormulaire.constantes.ts";
import { etatEtapesInitial } from "../../../Components/Simulateur/Etapes/EtapesQuestionnaire.ts";

const meta = {
  title: "Composants/Simulateur/ConteneursEtape",
  component: SimulateurEtapePrealable,
  decorators: [pageDecorator],
} satisfies Meta<typeof SimulateurEtapePrealable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SimulateurEtapePrealableStory: Story = {
  name: "Etape Préalable",
  args: {
    informationsBoutonsNavigation: {
      precedent: jest.fn(),
      suivant: jest.fn(),
    },
    etatEtapes: etatEtapesInitial,

    donneesFormulaire: jest.mocked(donneesFormulaireSimulateurVide),
  },
};

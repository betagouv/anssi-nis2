import { Meta, StoryObj } from "@storybook/react";
import { SimulateurEtapePrealable } from "../../../Components/Simulateur/SimulateurEtapePrealable.tsx";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";
import { jest } from "@storybook/jest";
import { EtatEtapesManipulable } from "../../../Services/Simulateur/EtatEtapes.ts";
import { CollectionInformationsEtapes } from "../../../Services/Simulateur/CollectionInformationsEtapes.ts";
import { donneesFormulaireSimulateurVide } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";

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
    etatEtapes: jest.mocked(
      new EtatEtapesManipulable(new CollectionInformationsEtapes(...[]), 0),
    ),
    donneesFormulaire: jest.mocked(donneesFormulaireSimulateurVide),
  },
};

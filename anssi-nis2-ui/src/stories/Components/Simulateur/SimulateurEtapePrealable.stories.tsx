import { Meta, StoryObj } from "@storybook/react";
import { donneesFormulaireSimulateurVide } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes.ts";
import { SimulateurEtapePrealable } from "../../../Components/Simulateur/SimulateurEtapePrealable.tsx";
import { pageDecorator } from "../../utilitaires/PageDecorator.tsx";
import "@storybook/test";
import * as test from "@storybook/test";
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
      precedent: test.fn(),
      suivant: test.fn(),
    },
    etatEtapes: etatEtapesInitial,

    donneesFormulaire: test.mocked(donneesFormulaireSimulateurVide),
    propageActionSimulateur: test.fn(),
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { donneesFormulaireSimulateurVide } from "../../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.constantes.ts";
import EtapeLocalisationsServices from "../../../Components/Simulateur/Etapes/EtapeLocalisationsServices.tsx";

const meta: Meta<typeof EtapeLocalisationsServices> = {
  title: "Composants/Simulateur/Etapes/6 - Localisations Multiples de Services",
  component: EtapeLocalisationsServices,
  argTypes: {
    propageActionSimulateur: { action: true },
  },
};

export default meta;
type Story = StoryObj<typeof EtapeLocalisationsServices>;

export const LocalisationsServicesMultiples: Story = {
  args: {
    donneesFormulaire: {
      ...donneesFormulaireSimulateurVide,
    },
  },
};
export const LocalisationsServicesMultiplesCasesCochees: Story = {
  args: {
    donneesFormulaire: {
      ...donneesFormulaireSimulateurVide,
      localisationFournitureServicesNumeriques: ["france", "autre"],
    },
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { donneesFormulaireSimulateurVide } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes.ts";
import EtapeLocalisationsEtablissementPrincipal from "../../../Components/Simulateur/Etapes/EtapeLocalisationsEtablissementPrincipal.tsx";

const meta: Meta<typeof EtapeLocalisationsEtablissementPrincipal> = {
  title:
    "Composants/Simulateur/Etapes/6 - Localisations Etablissement Principal",
  component: EtapeLocalisationsEtablissementPrincipal,
  argTypes: {
    propageActionSimulateur: { action: true },
  },
};

export default meta;
type Story = StoryObj<typeof EtapeLocalisationsEtablissementPrincipal>;

export const LocalisationsEtablissementPrincipal: Story = {
  args: {
    donneesFormulaire: {
      ...donneesFormulaireSimulateurVide,
    },
  },
};
export const LocalisationsEtablissementPrincipalDecisionsHorsUE: Story = {
  args: {
    donneesFormulaire: {
      ...donneesFormulaireSimulateurVide,
      paysDecisionsCyber: ["horsue"],
    },
  },
};
export const LocalisationsEtablissementPrincipalOperationsHorsUE: Story = {
  args: {
    donneesFormulaire: {
      ...donneesFormulaireSimulateurVide,
      paysDecisionsCyber: ["horsue"],
      paysOperationsCyber: ["horsue"],
    },
  },
};

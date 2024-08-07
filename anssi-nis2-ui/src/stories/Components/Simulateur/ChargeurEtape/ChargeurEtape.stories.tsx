import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../../Components/Simulateur/ChargeurEtape.tsx";
import { defaultContext } from "../../../utilitaires/PageDecorator.tsx";
import { genereDecorateurPourContexte } from "../../../utilitaires/generateursDecorateurs.tsx";
import { mockSendFormData } from "../../../utilitaires/mocks.ts";

import { Contexte } from "../../../../Services/contexte";
import { scenarioDerniereEtapeEstResultat } from "./scenarioDerniereEtapeEstResultat.tsx";
import { scenarioEtapeSousActiviteConditionnelle } from "./scenarioEtapeSousActiviteConditionnelle.tsx";
import { scenarioEtapeSecteurFabricationSuivant } from "./scenarioEtapeSecteurFabricationSuivant.tsx";
import { scenarioIgnoreEtapeActivitePourSecteurActiviteAutre } from "./scenarioIgnoreEtapeActivitePourSecteurActiviteAutre.tsx";
import { scenarioIgnoreEtapeActivitePourSousSecteurActiviteAutre } from "./scenarioIgnoreEtapeActivitePourSousSecteurActiviteAutre.tsx";
import { scenarioEtapeActivitePourSecteurActiviteAutreEtListes } from "./scenarioEtapeActivitePourSecteurActiviteAutreEtListes.tsx";
import { scenarioVaJusquaEtapeLocalisationEtablissementPrincipal } from "./scenarioVaJusquaEtapeLocalisationEtablissementPrincipal.tsx";
import { scenarioVaJusquaEtapeLocalisationService } from "./scenarioVaJusquaEtapeLocalisationService.tsx";

const meta: Meta<typeof ChargeurEtape> = {
  title: "Composants/Simulateur/ChargeurEtape",
  component: ChargeurEtape,
  decorators: [genereDecorateurPourContexte(defaultContext)],
  parameters: {
    actions: {
      handles: ["envoieDonneesFormulaire"],
    },
  },
};

export default meta;

const simulateurContext: Contexte = {
  ...defaultContext,
  envoieDonneesFormulaire: mockSendFormData,
};

const fabriqueStoryChargeurEtape = (
  scenario: StoryObj<typeof ChargeurEtape>["play"],
): StoryObj<typeof ChargeurEtape> => ({
  decorators: [genereDecorateurPourContexte(simulateurContext)],
  play: scenario,
});

export const Simple: StoryObj<typeof ChargeurEtape> = {};

export const VaJusquaEtapeLocalisationService = fabriqueStoryChargeurEtape(
  scenarioVaJusquaEtapeLocalisationService,
);
export const VaJusquaEtapeLocalisationEtablissementPrincipal =
  fabriqueStoryChargeurEtape(
    scenarioVaJusquaEtapeLocalisationEtablissementPrincipal,
  );
export const DerniereEtapeEstResultat = fabriqueStoryChargeurEtape(
  scenarioDerniereEtapeEstResultat,
);

export const EtapeSousActiviteConditionnelle = fabriqueStoryChargeurEtape(
  scenarioEtapeSousActiviteConditionnelle,
);

export const EtapeSecteurFabricationSuivant = fabriqueStoryChargeurEtape(
  scenarioEtapeSecteurFabricationSuivant,
);

export const IgnoreEtapeActivitePourSecteurActiviteAutre =
  fabriqueStoryChargeurEtape(
    scenarioIgnoreEtapeActivitePourSecteurActiviteAutre,
  );

export const IgnoreEtapeActivitePourSousSecteurActiviteAutre =
  fabriqueStoryChargeurEtape(
    scenarioIgnoreEtapeActivitePourSousSecteurActiviteAutre,
  );

export const EtapeActivitePourSecteurActiviteAutreEtListes =
  fabriqueStoryChargeurEtape(
    scenarioEtapeActivitePourSecteurActiviteAutreEtListes,
  );

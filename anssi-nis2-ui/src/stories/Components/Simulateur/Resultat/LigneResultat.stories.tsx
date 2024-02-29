// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";

import {
  CausesRegulation,
  Regulation,
} from "../../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { PrecisionsResultat } from "../../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
import {
  EtatRegulationDefinitif,
  EtatRegulationDefinitivement,
} from "../../../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import { ens } from "../../../../../../commun/utils/services/sets.operations.ts";
import { LigneResultat } from "../../../../Components/Simulateur/Resultats/LigneResultat.tsx";
import { attendTexteCharge } from "../../../utilitaires/interaction.facilitateurs.ts";
import {
  verifieAucunBlocDepliable,
  verifieClasseBlocResultat,
  verifieIcone,
  verifieTexteEnAnnexe,
} from "./LigneResultat.predicats.ts";

const meta: Meta<typeof LigneResultat> = {
  title: "Composants/Simulateur/Ligne Résultat",
  component: LigneResultat,
};
export default meta;

type Story = StoryObj<typeof LigneResultat>;

const etatRegulation_ReguleEI: EtatRegulationDefinitif = {
  decision: Regulation.Regule,
  _resultatEvaluationRegulation: "Definitif",
  typeEntite: "EntiteImportante",
  etapeEvaluee: "InformationsSecteur",
  causes: {
    Structure: {
      _categorieTaille: "Grand",
      typeStructure: "privee",
      trancheChiffreAffaire: "petit",
      trancheNombreEmployes: "moyen",
    },
    InformationsSecteur: {
      _categorieTaille: "Grand",
      secteurs: ens({
        secteurActivite: "sante",
        activites: ens("laboratoireReferenceUE"),
      }),
    },
  },
};
const etatRegulation_NonRegule: EtatRegulationDefinitivement<"NonRegule"> = {
  decision: Regulation.NonRegule,
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee: "InformationsSecteur",
};

const etatRegulation_Incertain: EtatRegulationDefinitivement<"Incertain"> = {
  decision: Regulation.Incertain,
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee: "InformationsSecteur",
  causes: {
    _tag: "EnAttenteTranspositionLoiFrancaise",
  },
};
export const ReguleStandard: Story = {
  args: {
    precision: PrecisionsResultat.Standard,
    etatRegulation: etatRegulation_ReguleEI,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);

    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};
export const ReguleStandardEI: Story = {
  args: {
    precision: PrecisionsResultat.Standard,
    etatRegulation: etatRegulation_ReguleEI,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    expect(
      await within(canvasElement).findByText(
        "Votre entité sera régulée par NIS 2 en tant qu’Entité Importante (EI)",
      ),
    );
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const ReguleDORA: Story = {
  args: {
    precision: PrecisionsResultat.DORA,
    etatRegulation: {
      decision: Regulation.Regule,
      _resultatEvaluationRegulation: "Definitif",
      typeEntite: "EntiteImportante",
      etapeEvaluee: "InformationsSecteur",
      causes: {
        InformationsSecteur: {
          _categorieTaille: "Grand",
          secteurs: ens({
            secteurActivite: "banqueSecteurBancaire",
            activites: ens("etablissementCredit"),
          }),
        },
      } as CausesRegulation,
    },
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "DORA";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

const causes_Regule_RegistreNomDeDomaines: CausesRegulation = {
  Structure: {
    _categorieTaille: "Grand",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "moyen",
  },
  InformationsSecteur: {
    _categorieTaille: "Grand",
    secteurs: ens({
      secteurActivite: "infrastructureNumerique",
      activites: ens("registresNomsDomainesPremierNiveau"),
    }),
  },
};
const etatRegulation_Regule_RegistreNomDeDomaines: EtatRegulationDefinitivement<"Regule"> =
  {
    decision: Regulation.Regule,
    _resultatEvaluationRegulation: "Definitif",
    typeEntite: "EntiteEssentielle",
    etapeEvaluee: "InformationsSecteur",
    causes: causes_Regule_RegistreNomDeDomaines,
  };
export const ReguleEnregistrementDeNomsDeDomaines: Story = {
  args: {
    precision: PrecisionsResultat.EnregistrementDeNomsDeDomaine,
    etatRegulation: etatRegulation_Regule_RegistreNomDeDomaines,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Enregistrement de noms de domaines";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const NonReguleStandard: Story = {
  args: {
    precision: PrecisionsResultat.Standard,
    etatRegulation: etatRegulation_NonRegule,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Critères de possible inclusion";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const NonReguleHorsUE: Story = {
  args: {
    precision: PrecisionsResultat.HorsUnionEuropeenne,
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: {
        _tag: "ConstructionTestEnCours",
        typeConstructionEnCours: "HorsUnionEuropeenne",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Ce résultat est présenté au vu des éléments saisis.";
    await attendTexteCharge(canvasElement, texteEnAnnexe);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const IncertainStandard: Story = {
  args: {
    precision: PrecisionsResultat.Standard,
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: { _tag: "EnAttenteTranspositionLoiFrancaise" },
    },
  },
  play: async ({ canvasElement }) => {
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain");
    verifieIcone(canvasElement, "fr-nis2-icon-in-progress");
  },
};

export const IncertainAutrePaysUE: Story = {
  args: {
    precision: PrecisionsResultat.AutrePaysUnionEuropeenne,
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: { _tag: "DefiniDansUnAutreEtatMembre" },
    },
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe =
      "Veuillez-vous rapprocher de votre autorité nationale compétente.";
    await attendTexteCharge(canvasElement, texteEnAnnexe);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain-UE");
    verifieIcone(canvasElement, "fr-icon-question-fill");
  },
};

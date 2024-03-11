// noinspection TypeScriptValidateJSTypes - Incompatibilité des selecteurs testing-library (any) et des string

import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";

import { Regulation } from "../../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
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
  verifieTexteAvertissementAbsent,
  verifieTexteAvertissementPresent,
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

const etatRegulation_ReguleTypeEntiteNonDefini: EtatRegulationDefinitif = {
  decision: Regulation.Regule,
  _resultatEvaluationRegulation: "Definitif",
  typeEntite: "EntiteNonDeterminee",
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
        secteurActivite: "infrastructureNumerique",
        activites: ens("registresNomsDomainesPremierNiveau"),
      }),
    },
  },
};

const etatRegulation_Regule_RegistreNomDeDomaines: EtatRegulationDefinitivement<"Regule"> =
  {
    decision: Regulation.Regule,
    _resultatEvaluationRegulation: "Definitif",
    typeEntite: "EntiteEssentielle",
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
          secteurActivite: "infrastructureNumerique",
          activites: ens("registresNomsDomainesPremierNiveau"),
        }),
      },
    },
  };

const etatRegulation_Regule_DORA: EtatRegulationDefinitivement<"Regule"> = {
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
        secteurActivite: "banqueSecteurBancaire",
        activites: ens("etablissementCredit"),
      }),
    },
  },
};

export const ReguleStandard: Story = {
  args: {
    etatRegulation: etatRegulation_ReguleEI,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    await verifieTexteAvertissementPresent(canvasElement);

    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const ReguleStandardEI: Story = {
  args: {
    etatRegulation: etatRegulation_ReguleEI,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "REC";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    const canvas = within(canvasElement);
    expect(
      await canvas.findByText(
        "Votre entité sera régulée par NIS 2 en tant qu’Entité Importante (EI)",
      ),
    );
    await verifieTexteAvertissementPresent(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};
export const ReguleDORA: Story = {
  args: {
    etatRegulation: etatRegulation_Regule_DORA,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "DORA";
    await verifieTexteAvertissementPresent(canvasElement);
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};
export const ReguleEnregistrementDeNomsDeDomaines: Story = {
  args: {
    etatRegulation: etatRegulation_Regule_RegistreNomDeDomaines,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Enregistrement de noms de domaines";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};
export const ReguleAvecTypeEntiteNonDefini: Story = {
  args: {
    etatRegulation: etatRegulation_ReguleTypeEntiteNonDefini,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Enregistrement de noms de domaines";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    const canvas = within(canvasElement);
    expect(await canvas.findByText("Votre entité sera régulée par NIS 2"));
    verifieClasseBlocResultat(canvasElement, "fr-nis2-eligible");
    verifieIcone(canvasElement, "fr-icon-check-line");
  },
};

export const NonReguleStandard: Story = {
  args: {
    etatRegulation: etatRegulation_NonRegule,
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe = "Critères de possible inclusion";
    await verifieTexteEnAnnexe(canvasElement, texteEnAnnexe);
    await verifieTexteAvertissementPresent(canvasElement);

    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const NonReguleHorsUE: Story = {
  args: {
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
    await verifieTexteAvertissementPresent(canvasElement);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-non-eligible");
    verifieIcone(canvasElement, "fr-icon-close-line");
  },
};

export const IncertainStandard: Story = {
  args: {
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: { _tag: "EnAttenteTranspositionLoiFrancaise" },
    },
  },
  play: async ({ canvasElement }) => {
    verifieTexteAvertissementAbsent(canvasElement);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain");
    verifieIcone(canvasElement, "fr-nis2-icon-in-progress");
  },
};

export const IncertainAutrePaysUE: Story = {
  args: {
    etatRegulation: {
      ...etatRegulation_Incertain,
      causes: { _tag: "DefiniDansUnAutreEtatMembre" },
    },
  },
  play: async ({ canvasElement }) => {
    const texteEnAnnexe =
      "Veuillez-vous rapprocher de votre autorité nationale compétente.";
    await attendTexteCharge(canvasElement, texteEnAnnexe);
    await verifieTexteAvertissementPresent(canvasElement);
    verifieAucunBlocDepliable(canvasElement);
    verifieClasseBlocResultat(canvasElement, "fr-nis2-incertain-UE");
    verifieIcone(canvasElement, "fr-icon-question-fill");
  },
};

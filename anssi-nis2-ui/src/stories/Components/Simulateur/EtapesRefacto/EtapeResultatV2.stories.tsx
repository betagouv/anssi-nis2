import { Meta } from "@storybook/react";
import { EtapeResultatV2 } from "../../../../Components/Simulateur/EtapeResultatV2.tsx";
import { ResultatEligibilite } from "../../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { donneesFormulaireSimulateurVide } from "../../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes.ts";

const meta: Meta<typeof EtapeResultatV2> = {
  component: EtapeResultatV2,
  title: "Composants/Simulateur/Resultat V2",
};
export default meta;

const resultat: ResultatEligibilite = {
  regulation: "Regule",
  typeEntite: "EntiteImportante",
  pointsAttention: {
    resumes: ["MecanismeExemptionSecuriteNationale"],
    precisions: ["ResilienceEntiteCritique", "DORA"],
  },
};

export const Resultat = {
  args: { resultat, reponses: donneesFormulaireSimulateurVide },
};

import { Meta } from "@storybook/react";
import { EtapeResultatV2 } from "../../../../Components/Simulateur/EtapeResultatV2.tsx";
import { ResultatEligibilite } from "../../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

const meta: Meta<typeof EtapeResultatV2> = {
  component: EtapeResultatV2,
  title: "Composants/Simulateur/Resultat V2",
};
export default meta;

const resultat: ResultatEligibilite = {
  regulation: "Regule",
  typeEntite: "EntiteImportante",
  pointsAttention: {
    resumes: ["MecanismeExemption"],
    precisions: ["ResilienceEntiteCritique", "SecuriteNationale", "DORA"],
  },
};

export const Resultat = { args: { resultat } };

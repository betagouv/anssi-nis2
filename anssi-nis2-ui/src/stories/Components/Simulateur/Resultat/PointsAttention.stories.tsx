import { Meta } from "@storybook/react";
import { PointsAttention } from "../../../../Components/Simulateur/Resultats/PointsAttention.tsx";

const meta: Meta<typeof PointsAttention> = {
  component: PointsAttention,
  title: "Composants/Résultat/Points d'attention",
};
export default meta;

export const Defaut = {
  args: {
    resumes: ["TelcoAutreEtatMembre", "MecanismesExemption"],
    precisions: [
      "ResilienceEntiteCritique",
      "SecuriteNationale",
      "DORA",
      "EnregistrementNomsDeDomaines",
    ],
  },
};

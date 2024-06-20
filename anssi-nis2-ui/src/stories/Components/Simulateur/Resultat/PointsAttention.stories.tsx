import { Meta } from "@storybook/react";
import { PointsAttention } from "../../../../Components/Simulateur/Resultats/PointsAttention.tsx";

const meta: Meta<typeof PointsAttention> = {
  component: PointsAttention,
  title: "Composants/Résultat/Points d'attention",
};
export default meta;

export const Defaut = {
  args: {
    resumes: [
      "TelecomUE",
      "MecanismeExemption",
      "NumeriqueUE",
      "FournitureServicesUE",
      "EtablissementPrincipalUE",
      "EtabliUE",
      "RepresentantUE",
    ],
    precisions: [
      "ResilienceEntiteCritique",
      "SecuriteNationale",
      "DORA",
      "EnregistrementNomsDeDomaines",
      "CriteresDePossibleInclusion",
    ],
  },
};

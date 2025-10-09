import { Meta } from "@storybook/react-vite";
import { PointsAttention } from "../../../../Components/Simulateur/Resultats/PointsAttention.tsx";
import {
  CodesPrecisionsPointsAttention,
  CodesResumesPointsAttention,
} from "../../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

const meta: Meta<typeof PointsAttention> = {
  component: PointsAttention,
  title: "Composants/Résultat/Points d'attention",
};
export default meta;

export const Defaut = {
  args: {
    resumes: CodesResumesPointsAttention,
    precisions: CodesPrecisionsPointsAttention,
  },
};

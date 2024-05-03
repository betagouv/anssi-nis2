import { Meta } from "@storybook/react";
import { AiguilleVersEtapeResultat } from "../../../../Components/Simulateur/AiguilleVersEtapeResultat.tsx";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../../questionnaire/reducerQuestionnaire.ts";

const meta: Meta<typeof AiguilleVersEtapeResultat> = {
  component: AiguilleVersEtapeResultat,
  title: "Composants/Simulateur/Aiguillage vers résultat",
};
export default meta;

const etatOseOui: EtatQuestionnaire = {
  ...etatParDefaut,
  designationOperateurServicesEssentiels: ["oui"],
};
export const Resultat = { args: { version: "v2", reponses: etatOseOui } };

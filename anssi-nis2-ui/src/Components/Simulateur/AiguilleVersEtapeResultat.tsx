import { EtatQuestionnaire } from "../../questionnaire/reducerQuestionnaire.ts";
import { EtapeResultat } from "./EtapesRefacto/EtapeResultat.tsx";

export function AiguilleVersEtapeResultat(props: {
  reponses: EtatQuestionnaire;
}) {
  return <EtapeResultat reponses={props.reponses} />;
}

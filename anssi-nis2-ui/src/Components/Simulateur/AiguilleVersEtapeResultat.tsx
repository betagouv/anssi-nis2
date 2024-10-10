import { EtatQuestionnaire } from "../../questionnaire/reducerQuestionnaire.ts";
import { EtapeResultatV2 } from "./EtapeResultatV2.tsx";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { ReactElement } from "react";
import { evalueEligibilite } from "../../questionnaire/specifications/evalueEligibilite.ts";
import SpecificationsCompletes from "../../questionnaire/specifications/specifications-completes.csv?raw";

export function AiguilleVersEtapeResultat(props: {
  reponses: EtatQuestionnaire;
}) {
  return (
    <AvecEvaluationEligibilitie reponses={props.reponses}>
      {(r: ResultatEligibilite) => (
        <EtapeResultatV2 reponses={props.reponses} resultat={r} />
      )}
    </AvecEvaluationEligibilitie>
  );
}

function AvecEvaluationEligibilitie(props: {
  reponses: EtatQuestionnaire;
  children: (r: ResultatEligibilite) => ReactElement;
}) {
  const { resultat } = evalueEligibilite(
    props.reponses,
    SpecificationsCompletes,
  );

  return props.children(resultat);
}

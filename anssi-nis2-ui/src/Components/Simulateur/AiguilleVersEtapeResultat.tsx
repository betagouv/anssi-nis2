import { EtatQuestionnaire } from "../../questionnaire/reducerQuestionnaire.ts";
import { EtapeResultat } from "./EtapesRefacto/EtapeResultat.tsx";
import { EtapeResultatV2 } from "./EtapeResultatV2.tsx";

export function AiguilleVersEtapeResultat(props: {
  version: string;
  reponses: EtatQuestionnaire;
}) {
  const afficheV1 = props.version === "v1";
  const afficheV2 = props.version === "v2";
  const afficheLesDeux = props.version === "all";

  if (afficheV1) return <EtapeResultat reponses={props.reponses} />;
  if (afficheV2) return <EtapeResultatV2 />;

  if (afficheLesDeux)
    return (
      <>
        <EtapeResultat reponses={props.reponses} />
        <hr />
        <EtapeResultatV2 />
      </>
    );
}

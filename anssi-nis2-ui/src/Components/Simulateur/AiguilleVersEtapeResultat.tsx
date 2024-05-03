import { EtatQuestionnaire } from "../../questionnaire/reducerQuestionnaire.ts";
import { EtapeResultat } from "./EtapesRefacto/EtapeResultat.tsx";
import { EtapeResultatV2 } from "./EtapeResultatV2.tsx";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { ReactElement } from "react";

export function AiguilleVersEtapeResultat(props: {
  version: string;
  reponses: EtatQuestionnaire;
}) {
  const afficheV1 = props.version === "v1";
  const afficheV2 = props.version === "v2";
  const afficheLesDeux = props.version === "all";

  const v2: ReactElement = (
    <AvecEvaluationEligibilitie>
      {(r: ResultatEligibilite) => <EtapeResultatV2 resultat={r} />}
    </AvecEvaluationEligibilitie>
  );

  if (afficheV1) return <EtapeResultat reponses={props.reponses} />;
  if (afficheV2) return v2;

  if (afficheLesDeux)
    return (
      <>
        <EtapeResultat reponses={props.reponses} />
        <hr />
        {v2}
      </>
    );
}

function AvecEvaluationEligibilitie(props: {
  children: (r: ResultatEligibilite) => ReactElement;
}) {
  return props.children(fauxResultatReguleEE);
}

const fauxResultatReguleEE: ResultatEligibilite = {
  regulation: "Regule",
  typeEntite: "EntiteEssentielle",
  pointsAttention: { resumes: [], precisions: [] },
};

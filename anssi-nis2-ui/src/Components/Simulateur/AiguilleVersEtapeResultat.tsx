import { EtatQuestionnaire } from "../../questionnaire/reducerQuestionnaire.ts";
import { EtapeResultat } from "./EtapesRefacto/EtapeResultat.tsx";
import { EtapeResultatV2 } from "./EtapeResultatV2.tsx";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export function AiguilleVersEtapeResultat(props: {
  version: string;
  reponses: EtatQuestionnaire;
}) {
  const afficheV1 = props.version === "v1";
  const afficheV2 = props.version === "v2";
  const afficheLesDeux = props.version === "all";

  if (afficheV1) return <EtapeResultat reponses={props.reponses} />;
  if (afficheV2) return <EtapeResultatV2 resultat={fauxResultatReguleEE} />;

  if (afficheLesDeux)
    return (
      <>
        <EtapeResultat reponses={props.reponses} />
        <hr />
        <EtapeResultatV2 resultat={fauxResultatReguleEE} />
      </>
    );
}

const fauxResultatReguleEE: ResultatEligibilite = {
  regulation: "Regule",
  typeEntite: "EntiteEssentielle",
  pointsAttention: { resumes: [], precisions: [] },
};

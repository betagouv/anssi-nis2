import { Fragment, useState } from "react";
import {
  PointsAttentionPrecis,
  ResumesPointsAttention,
} from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { Precisions, TextesDesResumes } from "./PointsAttention.contenus.tsx";

export function PointsAttention({
  resumes,
  precisions,
}: {
  resumes: ResumesPointsAttention[];
  precisions: PointsAttentionPrecis[];
}) {
  const [ouvert, setOuvert] = useState<boolean>(false);
  return (
    <div className="fr-mt-1v fr-px-4w fr-py-3w fr-nis2-resultat-explications">
      <h4>Points d&apos;attention</h4>

      {resumes.map((r, i) => (
        <p key={i}>{TextesDesResumes[r]}</p>
      ))}

      {ouvert && (
        <>
          {precisions.map((p, i) => (
            <Fragment key={i}>
              <h5>{Precisions[p].titre}</h5>
              <p>{Precisions[p].texte}</p>
            </Fragment>
          ))}
        </>
      )}

      <OuvertFerme estOuvert={ouvert} change={setOuvert} />
    </div>
  );
}

const OuvertFerme = (props: {
  estOuvert: boolean;
  change: (ouvre: boolean) => void;
}) => (
  <>
    {!props.estOuvert && (
      <button onClick={() => props.change(true)}>
        Plus d&apos;informations<i className="fr-fi-arrow-down-s-line"></i>
      </button>
    )}
    {props.estOuvert && (
      <button onClick={() => props.change(false)}>
        Moins d&apos;informations<i className="fr-fi-arrow-up-s-line"></i>
      </button>
    )}
  </>
);

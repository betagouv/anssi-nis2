import { useEffect, useReducer } from "react";
import Markdown from "react-markdown";

import {
  explicationContenuIncertain,
  libelleAvertissementRegule,
} from "../../../References/LibellesResultatsEligibilite.ts";
import { decaleTitre4Niveaux } from "../../../Services/constantes.ts";
import { chargeContenuPourEtat } from "../../../Services/fabriques/PrecisionsResultatProps.fabrique.ts";
import {
  DefaultComponentExtensible,
  DefaultProps,
  LigneResultatProps,
} from "../../../Services/Props";
import { precisionsResultatVide } from "../../../Services/Simulateur/Props/ContenusResultatEligibilite.constantes.ts";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import { RowContainer } from "../../General/RowContainer.tsx";
import { IconeResultat } from "./IconeResultat.tsx";
import {
  changePropriete,
  estCasNonGere,
  getInformationsResultatEvaluation,
} from "./LigneResultat.aide.ts";
import { initialState, statusAffichePlus } from "./LigneResultat.constantes.ts";

export const LigneResultat: DefaultComponentExtensible<
  DefaultProps & LigneResultatProps
> = ({ etatRegulation }: LigneResultatProps) => {
  const [contenuPrecisions, propageContenuPrecisions] = useReducer(
    changePropriete,
    { ...initialState, ...precisionsResultatVide },
  );
  const basculePlus = () =>
    propageContenuPrecisions({
      type: "estAfficheAnnexe",
      value: !contenuPrecisions.estAfficheAnnexe,
    });

  const statusAfficheAnnexe =
    statusAffichePlus[`${contenuPrecisions.estAfficheAnnexe}`];
  const informationsResultat =
    getInformationsResultatEvaluation(etatRegulation);
  useEffect(() => {
    chargeContenuPourEtat(etatRegulation).then((p) => {
      propageContenuPrecisions({
        type: "principal",
        value: p.principal,
      });
      propageContenuPrecisions({
        type: "annexe",
        value: p.annexe,
      });
    });
  }, [etatRegulation]);
  const classesIcone = `fr-fi-arrow-${statusAfficheAnnexe.directionIcone}-s-line`;
  return (
    <RowContainer>
      <CenteredContainer>
        <div
          className={`fr-px-4w fr-pt-3w fr-pb-4w fr-nis2-resultat ${informationsResultat.classes.cadre}`}
        >
          <IconeResultat classIcone={informationsResultat.classes.icone} />
          <Markdown components={{ p: "h4" }}>
            {informationsResultat.titre}
          </Markdown>
          <Markdown>{libelleAvertissementRegule}</Markdown>
          {estCasNonGere(etatRegulation) && (
            <p>{explicationContenuIncertain}</p>
          )}
        </div>
        {!estCasNonGere(etatRegulation) && (
          <div className="fr-mt-1v fr-px-4w fr-py-3w fr-nis2-resultat-explications">
            <Markdown components={decaleTitre4Niveaux}>
              {contenuPrecisions.principal}
            </Markdown>

            {contenuPrecisions.annexe && (
              <>
                <Markdown
                  components={decaleTitre4Niveaux}
                  className={statusAfficheAnnexe.affichePlus}
                >
                  {contenuPrecisions.annexe}
                </Markdown>
                <button onClick={basculePlus}>
                  {statusAfficheAnnexe.libelleBouton}
                  <i className={classesIcone} />
                </button>
              </>
            )}
          </div>
        )}
      </CenteredContainer>
    </RowContainer>
  );
};

import { useEffect, useReducer } from "react";
import Markdown from "react-markdown";

import { explicationContenuIncertain } from "../../../References/LibellesResultatsEligibilite.ts";
import { decaleTitre4Niveaux } from "../../../Services/constantes.ts";
import { chargeContenuPour } from "../../../Services/fabriques/PrecisionsResultatProps.fabrique.ts";
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
  getClassesCssResultat,
  recupereTitrePourEtatEvaluation,
} from "./LigneResultat.aide.ts";
import { initialState, statusAffichePlus } from "./LigneResultat.constantes.ts";

export const LigneResultat: DefaultComponentExtensible<
  DefaultProps & LigneResultatProps
> = ({ etatRegulation, precision }: LigneResultatProps) => {
  const [contenuPrecisions, propageContenuPrecisions] = useReducer(
    changePropriete,
    { ...initialState, ...precisionsResultatVide },
  );
  const regulation = etatRegulation.decision;
  const basculePlus = () =>
    propageContenuPrecisions({
      type: "estAfficheAnnexe",
      value: !contenuPrecisions.estAfficheAnnexe,
    });

  const statusAfficheAnnexe =
    statusAffichePlus[`${contenuPrecisions.estAfficheAnnexe}`];
  const classesCssResultat = getClassesCssResultat(etatRegulation);
  const classesDivResultat = [
    "fr-px-4w fr-pt-3w fr-pb-4w fr-nis2-resultat",
    classesCssResultat.cadre,
  ].join(" ");
  useEffect(() => {
    chargeContenuPour(regulation)(precision).then((p) => {
      propageContenuPrecisions({
        type: "principal",
        value: p.principal,
      });
      propageContenuPrecisions({
        type: "annexe",
        value: p.annexe,
      });
    });
  }, [precision, regulation]);
  return (
    <RowContainer>
      <CenteredContainer>
        <div className={classesDivResultat}>
          <IconeResultat classIcone={classesCssResultat.icone} />
          <Markdown components={{ p: "h4" }}>
            {recupereTitrePourEtatEvaluation(etatRegulation)}
          </Markdown>
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
                  <i
                    className={`fr-fi-arrow-${statusAfficheAnnexe.directionIcone}-s-line`}
                  />
                </button>
              </>
            )}
          </div>
        )}
      </CenteredContainer>
    </RowContainer>
  );
};

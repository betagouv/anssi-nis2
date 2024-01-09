import { useReducer } from "react";
import Markdown from "react-markdown";
import {
  classDivPourPrecisionResultat,
  precisionPourResultat,
} from "../../../References/contenusResultatEligibilite.ts";
import { decaleTitre4Niveaux } from "../../../Services/constantes.ts";
import {
  DefaultComponentExtensible,
  DefaultProps,
  LigneResultatProps,
} from "../../../Services/Props";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import { RowContainer } from "../../General/RowContainer.tsx";
import { IconeResultat } from "./IconeResultat.tsx";
import { initialState, statusAffichePlus } from "./LigneResultat.constantes.ts";
import { changePropriete } from "./LigneResultat.operations.ts";

export const LigneResultat: DefaultComponentExtensible<
  DefaultProps & LigneResultatProps
> = ({ contenuResultat, precisionResultat }: LigneResultatProps) => {
  const [contenuPrecisions, propageContenuPrecisions] = useReducer(
    changePropriete,
    { ...initialState, ...precisionPourResultat[precisionResultat] },
  );
  const basculePlus = () =>
    propageContenuPrecisions({
      type: "estAfficheAnnexe",
      value: !contenuPrecisions.estAfficheAnnexe,
    });

  const statusAfficheAnnexe =
    statusAffichePlus[`${contenuPrecisions.estAfficheAnnexe}`];

  const classesDivResultat = [
    "fr-px-4w fr-pt-3w fr-pb-4w fr-nis2-resultat",
    classDivPourPrecisionResultat[precisionResultat],
  ].join(" ");

  return (
    <RowContainer>
      <CenteredContainer>
        <div className={classesDivResultat}>
          {contenuResultat.classIcone && (
            <IconeResultat classIcone={contenuResultat.classIcone} />
          )}
          <Markdown components={{ p: "h4" }}>{contenuResultat.titre}</Markdown>
          {contenuResultat.sousTitre && <p>{contenuResultat.sousTitre}</p>}
        </div>
        {contenuResultat.fichierPrecisionSurReponse && (
          <div className="fr-px-4w fr-py-3w fr-nis2-resultat-explications">
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

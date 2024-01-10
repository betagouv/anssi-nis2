import { useEffect, useReducer } from "react";
import Markdown from "react-markdown";
import {
  classDivPourPrecisionResultat,
  classIconePourPrecisionResultat,
  explicationContenuIncertain,
  titresPourPrecisionResultat,
} from "../../../References/contenusResultatEligibilite.ts";
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
import { initialState, statusAffichePlus } from "./LigneResultat.constantes.ts";
import { changePropriete } from "./LigneResultat.operations.ts";

export const LigneResultat: DefaultComponentExtensible<
  DefaultProps & LigneResultatProps
> = ({ precisionResultatRegulation }: LigneResultatProps) => {
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

  const classesDivResultat = [
    "fr-px-4w fr-pt-3w fr-pb-4w fr-nis2-resultat",
    classDivPourPrecisionResultat[precisionResultatRegulation],
  ].join(" ");

  useEffect(() => {
    chargeContenuPour(precisionResultatRegulation).then((p) => {
      propageContenuPrecisions({
        type: "principal",
        value: p.principal,
      });
      propageContenuPrecisions({
        type: "annexe",
        value: p.annexe,
      });
    });
  }, [precisionResultatRegulation]);

  return (
    <RowContainer>
      <CenteredContainer>
        <div className={classesDivResultat}>
          <IconeResultat
            classIcone={
              classIconePourPrecisionResultat[precisionResultatRegulation]
            }
          />
          <Markdown components={{ p: "h4" }}>
            {titresPourPrecisionResultat[precisionResultatRegulation]}
          </Markdown>
          {precisionResultatRegulation === "IncertainStandard" && (
            <p>{explicationContenuIncertain}</p>
          )}
        </div>
        {precisionResultatRegulation !== "IncertainStandard" && (
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

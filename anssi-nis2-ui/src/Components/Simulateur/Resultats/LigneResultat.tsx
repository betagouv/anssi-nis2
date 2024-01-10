import { useEffect, useReducer } from "react";
import Markdown from "react-markdown";
import { explicationContenuIncertain } from "../../../References/contenusResultatEligibilite.ts";
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
import {
  changePropriete,
  classDivResultat,
  classPourIconeResultat,
  recupereTitrePourResultat,
} from "./LigneResultat.operations.ts";
import { estIncertainStandard } from "./LigneResultat.predicats.ts";

export const LigneResultat: DefaultComponentExtensible<
  DefaultProps & LigneResultatProps
> = ({ regulation, precision }: LigneResultatProps) => {
  const [contenuPrecisions, propageContenuPrecisions] = useReducer(
    changePropriete,
    { ...initialState, ...precisionsResultatVide },
  );

  const basculePlus = () =>
    propageContenuPrecisions({
      type: "estAfficheAnnexe",
      value: !contenuPrecisions.estAfficheAnnexe,
    });

  const estCasNonGere = estIncertainStandard(regulation, precision);

  const statusAfficheAnnexe =
    statusAffichePlus[`${contenuPrecisions.estAfficheAnnexe}`];

  const classesDivResultat = [
    "fr-px-4w fr-pt-3w fr-pb-4w fr-nis2-resultat",
    classDivResultat(regulation, precision),
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
          <IconeResultat
            classIcone={classPourIconeResultat(regulation, precision)}
          />
          <Markdown components={{ p: "h4" }}>
            {recupereTitrePourResultat(regulation, precision)}
          </Markdown>
          {estCasNonGere && <p>{explicationContenuIncertain}</p>}
        </div>
        {!estCasNonGere && (
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

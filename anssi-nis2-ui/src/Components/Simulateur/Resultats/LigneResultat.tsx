import { useEffect, useReducer } from "react";
import Markdown from "react-markdown";
import { decaleTitre4Niveaux } from "../../../Services/constantes.ts";
import { remplitContenuMarkdown } from "../../../Services/Markdown/remplitContenuMarkdown.operation.ts";
import { DefaultComponentExtensible } from "../../../Services/Props";
import { SimulateurResultatProps } from "../../../Services/Simulateur/Props/simulateurResultatProps";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import { RowContainer } from "../../General/RowContainer.tsx";
import { IconeResultat } from "./IconeResultat.tsx";

type EtatInformationsResultat = {
  principal: string;
  annexe: string;
  estAfficheAnnexe: boolean;
};

type ActionInformationsResultat = {
  type: keyof EtatInformationsResultat;
  value: string | boolean;
};

const initialState: EtatInformationsResultat = {
  principal: "",
  annexe: "",
  estAfficheAnnexe: false,
};

const changePropriete = (
  state: EtatInformationsResultat,
  action: ActionInformationsResultat,
) => ({ ...state, [action.type]: action.value });

type ContenuAffichagePlus = {
  affichePlus: string;
  libelleBouton: string;
};

const statusAffichePlus: Record<`${boolean}`, ContenuAffichagePlus> = {
  false: {
    affichePlus: "fr-nis2-hidden",
    libelleBouton: "Plus d'informations",
  },
  true: {
    affichePlus: "",
    libelleBouton: "Moins d'informations",
  },
};

export const LigneResultat: DefaultComponentExtensible<
  SimulateurResultatProps
> = ({ contenuResultat }: SimulateurResultatProps) => {
  const [contenuPrecisions, propageContenuPrecisions] = useReducer(
    changePropriete,
    initialState,
  );

  const modifieProprietePrecisions = remplitContenuMarkdown<
    EtatInformationsResultat,
    ActionInformationsResultat
  >(propageContenuPrecisions);

  useEffect(() => {
    if (contenuResultat.fichierPrecisionSurReponse) {
      const baseUri = `/contenus/${contenuResultat.fichierPrecisionSurReponse}`;
      modifieProprietePrecisions("principal")(`${baseUri}.md`);
      modifieProprietePrecisions("annexe")(`${baseUri}.plus.md`);
    }
  }, [contenuResultat.fichierPrecisionSurReponse, modifieProprietePrecisions]);

  const basculePlus = () =>
    propageContenuPrecisions({
      type: "estAfficheAnnexe",
      value: !contenuPrecisions.estAfficheAnnexe,
    });

  const statusAfficheAnnexe =
    statusAffichePlus[`${contenuPrecisions.estAfficheAnnexe}`];

  return (
    <RowContainer>
      <CenteredContainer>
        <div
          className={[
            "fr-px-4w fr-py-3w fr-nis2-resultat",
            contenuResultat.classeDivResultat,
          ].join(" ")}
        >
          {contenuResultat.classIcone && (
            <IconeResultat classIcone={contenuResultat.classIcone} />
          )}
          <h4>{contenuResultat.titre}</h4>
          {contenuResultat.sousTitre && <p>{contenuResultat.sousTitre}</p>}
        </div>
        {contenuResultat.fichierPrecisionSurReponse && (
          <div className="fr-px-4w fr-py-3w fr-nis2-resultat-explications">
            <Markdown components={decaleTitre4Niveaux}>
              {contenuPrecisions.principal}
            </Markdown>

            <Markdown
              components={decaleTitre4Niveaux}
              className={statusAfficheAnnexe.affichePlus}
            >
              {contenuPrecisions.annexe}
            </Markdown>
            <button onClick={basculePlus}>
              {statusAfficheAnnexe.libelleBouton}
            </button>
          </div>
        )}
      </CenteredContainer>
    </RowContainer>
  );
};

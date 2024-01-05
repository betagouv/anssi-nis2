import { Icon } from "@mui/material";
import { useEffect, useReducer } from "react";
import Markdown, { Components } from "react-markdown";
import {
  DefaultComponentExtensible,
  DefaultProps,
} from "../../../Services/Props";
import { SimulateurResultatProps } from "../../../Services/Simulateur/Props/simulateurResultatProps";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import { RowContainer } from "../../General/RowContainer.tsx";

const decaleTitre4Niveaux: Partial<Components> = {
  h1: "h4",
  h2: "h5",
  h3: "h6",
};

const IconeResultat: DefaultComponentExtensible<
  DefaultProps & { classIcone: string }
> = ({ classIcone }: { classIcone: string }) => (
  <>
    <div className="fr-grid-row">
      <div className="fr-col fr-nis2-icone">
        <Icon className={[classIcone, "fr-icon--xl"].join(" ")} />
      </div>
    </div>
  </>
);

type ContenuAffichagePlus = {
  affichePlus: string;
  libelleBouton: string;
};

type EtatInformationsResultat = {
  principal: string;
  annexe: string;
  estAfficheAnnexe: boolean;
};

type ActionInformationsResultat = {
  type: keyof EtatInformationsResultat;
  value: string | boolean;
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

const initialState: EtatInformationsResultat = {
  principal: "",
  annexe: "",
  estAfficheAnnexe: false,
};

const reducer = (
  state: EtatInformationsResultat,
  action: ActionInformationsResultat,
) => ({ ...state, [action.type]: action.value });

type OperationRemplitContenuMarkdown<TAction, TEtat> = (
  dispatch: React.Dispatch<TAction>,
) => (
  typeChamp: keyof TEtat,
) => (locationMarkdown: string) => Promise<string | void>;
const remplitContenuMarkdown: OperationRemplitContenuMarkdown<
  ActionInformationsResultat,
  EtatInformationsResultat
> = (dispatch) => (typeChamp) => (locationMarkdown) =>
  fetch(locationMarkdown)
    .then((reponse) => reponse.text())
    .then((t) => dispatch({ type: typeChamp, value: t }));

export const LigneResultat: DefaultComponentExtensible<
  SimulateurResultatProps
> = ({ contenuResultat }: SimulateurResultatProps) => {
  const [contenuPrecisions, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (contenuResultat.fichierPrecisionSurReponse) {
      const baseUri = `/contenus/${contenuResultat.fichierPrecisionSurReponse}`;
      remplitContenuMarkdown(dispatch)("principal")(`${baseUri}.md`);
      remplitContenuMarkdown(dispatch)("annexe")(`${baseUri}.plus.md`);
    }
  }, [contenuResultat.fichierPrecisionSurReponse]);

  const basculePlus = () =>
    dispatch({
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

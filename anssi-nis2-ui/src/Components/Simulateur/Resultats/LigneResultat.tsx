import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import { Icon } from "@mui/material";
import Markdown, { Components } from "react-markdown";
import { useEffect, useReducer } from "react";
import {
  DefaultComponentExtensible,
  DefaultProps,
} from "../../../Services/Props";
import { SimulateurResultatProps } from "../../../Services/Simulateur/Props/simulateurResultatProps";

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

type EtatInformationsResultat = {
  principal: string;
  cache: string;
  affichePlus: string;
  libelleBouton: string;
};
type ActionInformationsResultat = {
  type: keyof EtatInformationsResultat;
  value: string;
};
export const LigneResultat: DefaultComponentExtensible<
  SimulateurResultatProps
> = ({ contenuResultat }: SimulateurResultatProps) => {
  const initialState: EtatInformationsResultat = {
    principal: "",
    cache: "",
    affichePlus: "fr-nis2-hidden",
    libelleBouton: "Plus d'informations",
  };

  const reducer = (
    state: EtatInformationsResultat,
    action: ActionInformationsResultat,
  ) => {
    return { ...state, [action.type]: action.value };
  };

  const [contenuPrecisions, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    contenuResultat.fichierPrecisionSurReponse &&
      fetch(`/contenus/${contenuResultat.fichierPrecisionSurReponse}.md`)
        .then((reponse) => reponse.text())
        .then((t) => dispatch({ type: "principal", value: t }));
    contenuResultat.fichierPrecisionSurReponse &&
      fetch(`/contenus/${contenuResultat.fichierPrecisionSurReponse}.plus.md`)
        .then((reponse) => reponse.text())
        .then((t) => dispatch({ type: "cache", value: t }));
  }, [contenuResultat.fichierPrecisionSurReponse]);

  const basculePlus = () => {
    if (contenuPrecisions.affichePlus === "") {
      dispatch({ type: "affichePlus", value: "fr-nis2-hidden" });
      dispatch({ type: "libelleBouton", value: "Plus d'informations" });
    } else {
      dispatch({ type: "affichePlus", value: "" });
      dispatch({ type: "libelleBouton", value: "Moins d'informations" });
    }
  };

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
              className={contenuPrecisions.affichePlus}
            >
              {contenuPrecisions.cache}
            </Markdown>
            <button onClick={basculePlus}>
              {contenuPrecisions.libelleBouton}
            </button>
          </div>
        )}
      </CenteredContainer>
    </RowContainer>
  );
};

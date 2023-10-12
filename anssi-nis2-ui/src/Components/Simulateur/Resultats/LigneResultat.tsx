import { RowContainer } from "../../RowContainer.tsx";
import { CenteredContainer } from "../../CenteredContainer.tsx";
import { SimulateurEtapeRenderedComponent } from "../../../Services/Simulateur/Props/component";
import { eligibilite } from "../../../Domaine/Simulateur/resultatEligibilite.ts";
import { SimulateurEtapeRenderedProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { recupereContenusResultatEligibilite } from "../../../Services/Simulateur/recupereContenusResultatEligibilite.ts";
import { Icon } from "@mui/material";
import Markdown, { Components } from "react-markdown";
import { useEffect, useState } from "react";

const decaleTitre4Niveaux: Partial<Components> = {
  h1: "h4",
  h2: "h5",
  h3: "h6",
};
export const LigneResultat: SimulateurEtapeRenderedComponent = ({
  donneesFormulaire,
}: SimulateurEtapeRenderedProps) => {
  const statutEligibiliteNIS2 = eligibilite(donneesFormulaire);
  const contenuResultat = recupereContenusResultatEligibilite(
    statutEligibiliteNIS2,
  );
  const [contenuPrecistions, setContenuPrecisions] = useState("");
  useEffect(() => {
    fetch(`/public/contenus/${contenuResultat.fichierPrecisionSurReponse}.md`)
      .then((reponse) => reponse.text())
      .then(setContenuPrecisions);
  }, [contenuResultat.fichierPrecisionSurReponse]);
  return (
    <RowContainer>
      <CenteredContainer>
        <div
          className={[
            "fr-px-4w fr-py-3w fr-nis2-resultat",
            contenuResultat.classeDivResultat,
          ].join(" ")}
        >
          <div className="fr-grid-row">
            <div className="fr-col fr-nis2-icone">
              <Icon
                className={[contenuResultat.classIcone, "fr-icon--xl"].join(
                  " ",
                )}
              />
            </div>
          </div>
          <h4>{contenuResultat.titre}</h4>
        </div>
        <div className="fr-px-4w fr-py-3w fr-nis2-resultat-explications">
          <Markdown components={decaleTitre4Niveaux}>
            {contenuPrecistions}
          </Markdown>
        </div>
      </CenteredContainer>
    </RowContainer>
  );
};

import { RowContainer } from "../../RowContainer.tsx";
import { CenteredContainer } from "../../CenteredContainer.tsx";
import { SimulateurEtapeRenderedComponent } from "../../../Services/Simulateur/Props/component";
import { eligibilite } from "../../../Domaine/Simulateur/resultatEligibilite.ts";
import { SimulateurEtapeRenderedProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { recupereContenusResultatEligibilite } from "../../../Services/Simulateur/recupereContenusResultatEligibilite.ts";
import { Icon } from "@mui/material";
import Markdown from "react-markdown";

export const LigneResultat: SimulateurEtapeRenderedComponent = ({
  donneesFormulaire,
}: SimulateurEtapeRenderedProps) => {
  const statutEligibiliteNIS2 = eligibilite(donneesFormulaire);

  const resultat = recupereContenusResultatEligibilite(statutEligibiliteNIS2);
  return (
    <RowContainer>
      <CenteredContainer>
        <div
          className={[
            "fr-px-4w fr-py-3w fr-nis2-resultat",
            resultat.classeDivResultat,
          ].join(" ")}
        >
          <div className="fr-grid-row">
            <div className="fr-col fr-nis2-icone">
              <Icon
                className={[resultat.classIcone, "fr-icon--xl"].join(" ")}
              />
            </div>
          </div>
          <h4>{resultat.titre}</h4>
        </div>
        <div className="fr-px-4w fr-py-3w fr-nis2-resultat-explications">
          <h4>Points d&apos;attention</h4>
          {resultat.pointsAttention.map(({ description, titre }) => (
            <>
              {titre && <h5>{titre}</h5>}
              <Markdown>{description}</Markdown>
            </>
          ))}
        </div>
      </CenteredContainer>
    </RowContainer>
  );
};

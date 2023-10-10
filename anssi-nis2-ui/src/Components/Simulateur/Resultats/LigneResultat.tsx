import { RowContainer } from "../../RowContainer.tsx";
import { CenteredContainer } from "../../CenteredContainer.tsx";
import { Icon } from "@mui/material";
import { SimulateurEtapeRenderedComponent } from "../../../Services/Simulateur/Props/component";

export const LigneResultat: SimulateurEtapeRenderedComponent = () => (
  <RowContainer>
    <CenteredContainer>
      <div className="fr-px-4w fr-py-3w fr-nis2-resultat">
        <div className="fr-grid-row">
          <div className="fr-col fr-nis2-icone">
            <Icon className="fr-icon-check-line fr-icon--xl" />
          </div>
        </div>
        <h4>
          La directive s&apos;appliquerait à votre entité au vu des éléments
          saisis
        </h4>
        <p>
          Sous réserve des mécanismes d&apos;exemption ou de désignation pouvant
          être mis en place au cas par cas par le gouvernement français pour
          certaines entités. Ces exemptions ou désignation seront connues au
          plus tard le 18 octobre 2024.
        </p>
      </div>
    </CenteredContainer>
  </RowContainer>
);

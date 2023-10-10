import { RowContainer } from "../../RowContainer.tsx";
import { CenteredContainer } from "../../CenteredContainer.tsx";
import { SimulateurEtapeRenderedComponent } from "../../../Services/Simulateur/Props/component";
import { eligibilite } from "../../../Domaine/Simulateur/resultatEligibilite.ts";
import { SimulateurEtapeRenderedProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { recupereResultatEligibilite } from "../../../Services/Simulateur/RecupereResultatEligibilite.tsx";
import { Icon } from "@mui/material";

export const LigneResultat: SimulateurEtapeRenderedComponent = ({
  donneesFormulaire,
}: SimulateurEtapeRenderedProps) => {
  const statutEligibiliteNIS2 = eligibilite(donneesFormulaire);

  const resultat = recupereResultatEligibilite(statutEligibiliteNIS2);
  return (
    <RowContainer>
      <CenteredContainer>
        <div className="fr-px-4w fr-py-3w fr-nis2-resultat">
          <div className="fr-grid-row">
            <div className="fr-col fr-nis2-icone">
              <Icon
                className={[resultat.classIcone, "fr-icon--xl"].join(" ")}
              />
            </div>
          </div>
          <h4>{resultat.titre}</h4>
          <p>{resultat.explications}</p>
        </div>
      </CenteredContainer>
    </RowContainer>
  );
};

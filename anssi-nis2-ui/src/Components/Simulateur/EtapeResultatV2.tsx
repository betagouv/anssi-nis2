import { TamponResultat } from "./Resultats/TamponResultat.tsx";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { PointsAttention } from "./Resultats/PointsAttention.tsx";
import { RowContainer } from "../General/RowContainer.tsx";
import { CenteredContainer } from "../General/CenteredContainer.tsx";
import { getModeFormulaireEmail } from "./SimulateurEtapeResult.aide.ts";
import RestezInformes from "../RestezInformes.tsx";

export function EtapeResultatV2(props: { resultat: ResultatEligibilite }) {
  return (
    <>
      <RowContainer>
        <CenteredContainer>
          <TamponResultat resultat={props.resultat} />
          <PointsAttention
            resumes={props.resultat.pointsAttention.resumes}
            precisions={props.resultat.pointsAttention.precisions}
          />
        </CenteredContainer>
      </RowContainer>
      <RowContainer className="fr-background-alt--blue-france">
        <CenteredContainer>
          <RestezInformes
            mode={getModeFormulaireEmail(props.resultat.regulation)}
          />
        </CenteredContainer>
      </RowContainer>
    </>
  );
}

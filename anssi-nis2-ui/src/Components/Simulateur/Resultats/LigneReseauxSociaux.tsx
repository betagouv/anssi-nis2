import { RowContainer } from "../../RowContainer.tsx";
import { CenteredContainer } from "../../CenteredContainer.tsx";
import ReseauxSociaux from "../../ReseauxSociaux.tsx";

export const LigneReseauxSociaux = () => (
  <RowContainer className="fr-background-alt--blue-france">
    <CenteredContainer>
      <div className="fr-follow__newsletter">
        <ReseauxSociaux />
      </div>
    </CenteredContainer>
  </RowContainer>
);
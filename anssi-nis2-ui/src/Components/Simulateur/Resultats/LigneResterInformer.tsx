import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import RestezInformes from "../../RestezInformes.tsx";

export const LigneResterInformer = () => (
  <RowContainer className="fr-background-alt--blue-france">
    <CenteredContainer>
      <RestezInformes />
    </CenteredContainer>
  </RowContainer>
);

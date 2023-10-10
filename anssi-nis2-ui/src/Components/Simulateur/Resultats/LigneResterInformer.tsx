import { RowContainer } from "../../RowContainer.tsx";
import { CenteredContainer } from "../../CenteredContainer.tsx";
import ResterInformee from "../../ResterInformee.tsx";

export const LigneResterInformer = () => (
  <RowContainer className="fr-background-alt--blue-france">
    <CenteredContainer>
      <ResterInformee />
    </CenteredContainer>
  </RowContainer>
);
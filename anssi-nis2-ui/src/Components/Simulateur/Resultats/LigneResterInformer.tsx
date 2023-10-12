import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import ResterInformee from "../../ResterInformee.tsx";

export const LigneResterInformer = () => (
  <RowContainer className="fr-background-alt--blue-france">
    <CenteredContainer>
      <ResterInformee />
    </CenteredContainer>
  </RowContainer>
);

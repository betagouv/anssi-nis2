import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import RestezInformes from "../../RestezInformes.tsx";
import {
  DefaultComponentExtensible,
  RestezInformesProps,
} from "../../../Services/Props";

export const LigneResterInformer: DefaultComponentExtensible<
  RestezInformesProps
> = ({ mode = "simple" }: RestezInformesProps) => (
  <RowContainer className="fr-background-alt--blue-france">
    <CenteredContainer>
      <RestezInformes mode={mode} />
    </CenteredContainer>
  </RowContainer>
);

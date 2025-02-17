import { DefaultComponent, DefaultProps } from "../../Services/Props";
import { RowContainer } from "./RowContainer.tsx";

export const BandeauBleuMarianne: DefaultComponent = ({
  children,
}: DefaultProps) => (
  <div className="fr-py-5w  fr-bandeau-marianne ">
    <div className="fr-my-0">
      <RowContainer align="left">
        <div className="fr-col-offset-2">{children}</div>
      </RowContainer>
    </div>
  </div>
);

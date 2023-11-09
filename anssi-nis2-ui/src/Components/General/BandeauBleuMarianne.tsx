import { DefaultComponent, DefaultProps } from "../../Services/Props";
import { RowContainer } from "./RowContainer.tsx";

export const BandeauBleuMarianne: DefaultComponent = ({
  children,
  className,
}: DefaultProps) => (
  <div className={"fr-py-5w  fr-bandeau-marianne " + className}>
    <div className={"fr-my-0 fr-mx-auto fr-px-15w"}>
      <RowContainer>
        <div className="fr-col-lg-10">{children}</div>
      </RowContainer>
    </div>
  </div>
);

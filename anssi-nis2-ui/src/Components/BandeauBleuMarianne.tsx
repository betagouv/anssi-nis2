import styled from "@emotion/styled";
import { DefaultComponent, DefaultProps } from "../Services/Props.d.ts";
import { RowContainer } from "./RowContainer.tsx";

const BandeauBleuMarianneDiv = styled.div`
  background-color: #101070;
  color: var(--dark-text-title-grey, #fff);

  h2 {
    color: var(--dark-text-title-grey, #fff);
  }
`;

export const BandeauBleuMarianne: DefaultComponent = ({
  children,
  className,
}: DefaultProps) => (
  <BandeauBleuMarianneDiv className="fr-py-5w">
    <div className={className + " fr-my-0 fr-mx-auto fr-px-15w"}>
      <RowContainer>
        <div className="fr-col-lg-10">{children}</div>
      </RowContainer>
    </div>
  </BandeauBleuMarianneDiv>
);

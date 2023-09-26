import styled from "@emotion/styled";
import { DefaultComponent, DefaultProps } from "../../Services/Props.ts";

const SuisJeConcerneStyledDiv = styled.div`
  background-color: #101070;
  color: var(--dark-text-title-grey, #fff);

  h2 {
    color: var(--dark-text-title-grey, #fff);
  }
`;

export const SuisJeConcerneDiv: DefaultComponent = ({
  children,
  className,
}: DefaultProps) => (
  <SuisJeConcerneStyledDiv>
    <div className={className + " fr-my-0 fr-mx-auto fr-px-15w"}>
      {children}
    </div>
  </SuisJeConcerneStyledDiv>
);

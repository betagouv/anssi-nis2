import styled from "@emotion/styled";
import { DefaultComponent, DefaultProps } from "../Services/Props.d.ts";
import { fr } from "@codegouvfr/react-dsfr";

const Row = styled.div`
  column-gap: ${fr.spacing("5w")};
`;

export const PdfCardContainer: DefaultComponent = ({
  children,
}: DefaultProps) => (
  <div className="container">
    <Row className="fr-grid-row">{children}</Row>
  </div>
);

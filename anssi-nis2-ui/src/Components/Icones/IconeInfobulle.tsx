import styled from "@emotion/styled";

const Icone16 = styled.i`
  padding-left: 0.5rem;

  &::before {
    --icon-size: 1.125rem;
  }
`;

export const IconeInfobulle = (props: {
  onClick: () => void;
  label: string;
}) => (
  <Icone16
    className="fr-icon-error-warning-fill fr-text-action-high--blue-france"
    onClick={props.onClick}
    title={`Informations à propos de l'activité "${props.label}"`}
  />
);
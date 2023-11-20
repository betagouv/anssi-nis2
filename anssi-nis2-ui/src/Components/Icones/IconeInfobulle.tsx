import styled from "@emotion/styled";
import React from "react";

const Icone16 = styled.i`
  padding-left: 0.5rem;

  &::before {
    --icon-size: 1.125rem;
  }
`;

export const IconeInfobulle = (props: {
  onClick: React.MouseEventHandler;
  label: string;
}) => (
  <Icone16
    className="fr-icon-information-fill fr-text-action-high--blue-france"
    onClick={props.onClick}
    title={`Informations à propos de l'activité "${props.label}"`}
  />
);

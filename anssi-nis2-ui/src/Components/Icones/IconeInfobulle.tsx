import React from "react";
import { texteInfobulleIconeInformation } from "../../References/LibellesQuestionsSimulateur.ts";

export const IconeInfobulle = (props: {
  onClick: React.MouseEventHandler;
  label: string;
}) => (
  <i
    className="fr-nis2-icone-16px fr-icon-information-fill fr-text-action-high--blue-france fr-icon-hand"
    onClick={props.onClick}
    title={`${texteInfobulleIconeInformation} "${props.label}"`}
  />
);

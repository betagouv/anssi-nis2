import { ReactNode } from "react";
import { texteInfobulleBoutonFermer } from "../../References/LibellesQuestionsSimulateur.ts";

export const Infobulle = ({
  id,
  cachee,
  contenu,
  action,
}: {
  id: string;
  cachee: boolean;
  contenu: ReactNode;
  action: React.MouseEventHandler;
}) => {
  const estAffichee = cachee ? " fr-hidden" : "";
  return (
    <div className={"fr-callout fr-nis2-infobulle" + estAffichee} id={id}>
      {contenu}
      <i
        className="fr-btn--close fr-btn fr-icon-hand"
        title={texteInfobulleBoutonFermer}
        onClick={action}
      />
    </div>
  );
};

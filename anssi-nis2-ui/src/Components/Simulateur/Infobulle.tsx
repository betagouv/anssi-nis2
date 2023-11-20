import { ReactNode } from "react";

export const Infobulle = ({
  id,
  cachee,
  contenu,
  action,
}: {
  id: string;
  cachee: boolean;
  contenu: ReactNode;
  action: () => void;
}) => {
  const estAffichee = cachee ? " fr-hidden" : "";
  return (
    <div className={"fr-callout fr-nis2-infobulle" + estAffichee} id={id}>
      {contenu}
      <button
        className="fr-btn--close fr-btn"
        title="Masquer le message"
        onClick={action}
      />
    </div>
  );
};

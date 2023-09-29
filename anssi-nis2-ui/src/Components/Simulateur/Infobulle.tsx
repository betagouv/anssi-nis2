import { fr } from "@codegouvfr/react-dsfr";
import { ReactNode } from "react";
import styled from "@emotion/styled";

const BoutonFerme = styled.button`
  position: absolute;
  top: 0;
  right: 2rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
  min-height: 2rem;
  overflow: hidden;
  white-space: nowrap;
  max-width: 4rem;
  max-height: 4rem;
`;
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
  return (
    <div className={fr.cx("fr-callout", cachee && "fr-hidden")} id={id}>
      {contenu}
      <BoutonFerme
        className="fr-btn--close fr-btn"
        title="Masquer le message"
        onClick={action}
      />
    </div>
  );
};

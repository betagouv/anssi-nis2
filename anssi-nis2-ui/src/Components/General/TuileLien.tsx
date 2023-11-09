import Button from "@codegouvfr/react-dsfr/Button";
import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";

export const TuileLien = ({
  titre,
  lien,
  image,
}: {
  image: string;
  titre: string;
  lien: RegisteredLinkProps;
}) => (
  <li className="fr-col">
    <img src={image} alt={titre} />
    <div>
      <Button
        className="fr-btn--icon-left"
        priority="secondary"
        linkProps={lien}
      >
        {titre}
      </Button>
    </div>
  </li>
);

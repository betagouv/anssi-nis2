import Button from "@codegouvfr/react-dsfr/Button";
import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";
import { Link } from "react-router-dom";

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
      <Link to={lien.href || "#"}>
        <Button
          iconId="fr-icon-external-link-line"
          iconPosition="left"
          className="fr-btn"
          priority="secondary"
          // linkProps={lien}
        >
          {titre}
        </Button>
      </Link>
    </div>
  </li>
);

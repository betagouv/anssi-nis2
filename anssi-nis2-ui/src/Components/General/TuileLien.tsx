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
      <a href={lien.href || "#"}>
        <Button
          iconId="fr-icon-external-link-line"
          iconPosition="left"
          className="fr-btn"
          priority="secondary"
        >
          {titre}
        </Button>
      </a>
    </div>
  </li>
);

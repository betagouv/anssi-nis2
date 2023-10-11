import Card from "@codegouvfr/react-dsfr/Card";
import {
  DefaultComponentExtensible,
  DefaultProps,
} from "../Services/Props.d.ts";
import { type DetailedHTMLProps, type AnchorHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { fr } from "@codegouvfr/react-dsfr";
import PdfBgImg from "../assets/PdfBgImg.svg";

type HTMLAnchorProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

interface PdfCardProps extends DefaultProps {
  imageUrl?: string;
  linkProps: Omit<HTMLAnchorProps, "children">;
  imageAlt: string;
  title: string;
}

const PdfCardHolder = styled.div`
  & .fr-card__title a[href] {
    background-image: none;
    color: var(--light-neutral-grey-50-grey-50, #161616);
    font-size: medium;
  }

  & .fr-card__end,
  & .fr-card__start {
    margin: 0;
    padding: 0;
  }

  & .fr-card__content {
    background-image: url(${PdfBgImg});
    background-repeat: no-repeat;
    background-position: center right ${fr.spacing("2w")};
    padding: ${fr.spacing("2w")} ${fr.spacing("6w")} ${fr.spacing("2w")}
      ${fr.spacing("2w")};
  }

  & .fr-card.fr-enlarge-link .fr-card__title a::after {
    display: none;
  }
`;

const PdfCard: DefaultComponentExtensible<PdfCardProps> = ({
  linkProps,
  imageUrl,
  imageAlt,
  title,
}: PdfCardProps) => {
  return (
    <PdfCardHolder className="fr-col">
      <Card
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        linkProps={linkProps}
        title={title}
        titleAs="h4"
        size="small"
        enlargeLink
        className="fr-card--no-icon"
      />
    </PdfCardHolder>
  );
};

export default PdfCard;

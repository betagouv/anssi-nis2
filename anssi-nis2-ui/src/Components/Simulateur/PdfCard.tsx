import Card from "@codegouvfr/react-dsfr/Card";
import { DefaultComponentExtensible, DefaultProps } from "../../Props.ts";
import { type DetailedHTMLProps, type AnchorHTMLAttributes } from "react";

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

const PdfCard: DefaultComponentExtensible<PdfCardProps> = ({
  linkProps,
  imageUrl,
  imageAlt,
  title,
}: PdfCardProps) => {
  return (
    <div className="fr-col">
      <Card
        enlargeLink
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        linkProps={linkProps}
        title={title}
        size="small"
      />
    </div>
  );
};

export default PdfCard;

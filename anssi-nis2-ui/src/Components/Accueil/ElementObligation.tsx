export const ElementObligation = ({
  imageSrc,
  title,
}: {
  imageSrc: string;
  title: string;
}) => (
  <li className="fr-col">
    <img src={imageSrc} alt={title} />
    <p className="fr-text--lead">{title}</p>
  </li>
);

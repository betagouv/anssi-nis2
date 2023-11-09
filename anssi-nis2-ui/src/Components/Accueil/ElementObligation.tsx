import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type TuileAvecImage = DefaultProps & {
  imageSrc: string;
};
export const ElementObligation: DefaultComponentExtensible<TuileAvecImage> = ({
  imageSrc,
  children,
}: TuileAvecImage) => {
  return (
    <li className="fr-col">
      <img src={imageSrc} alt={children?.toString() ?? ""} />
      <p className="fr-text--lead">{children}</p>
    </li>
  );
};

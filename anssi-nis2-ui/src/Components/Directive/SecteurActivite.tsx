import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type SecteurActiviteProps = DefaultProps & {
  image: string;
  titre: string;
};
export const SecteurActivite: DefaultComponentExtensible<
  SecteurActiviteProps
> = ({ image, titre }: SecteurActiviteProps) => {
  return (
    <div className="secteur-activite">
      <img src={image} alt={titre} />
      <p>{titre}</p>
    </div>
  );
};

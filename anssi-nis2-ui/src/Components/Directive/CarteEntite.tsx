import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type CarteEntiteProps = DefaultProps & {
  titre: string;
  contenu: string;
};
export const CarteEntite: DefaultComponentExtensible<CarteEntiteProps> = ({
  titre,
  contenu,
}: CarteEntiteProps) => {
  return (
    <div className="carte">
      <p className="titre">{titre}</p>
      <p className="contenu">{contenu}</p>
    </div>
  );
};

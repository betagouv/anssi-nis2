import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type CarteSePreparerProps = DefaultProps & {
  image: string;
  numero: number;
  titre: string;
  contenu: string;
};

const CarteSePreparer: DefaultComponentExtensible<CarteSePreparerProps> = ({
  image,
  numero,
  titre,
  contenu,
}: CarteSePreparerProps) => {
  return (
    <div className="carte-se-preparer">
      <div className="conteneur-image">
        <img src={image} alt={titre} />
      </div>
      <p className="numero">{numero}</p>
      <div className="contenu">
        <h3>{titre}</h3>
        <p>{contenu}</p>
      </div>
    </div>
  );
};

export default CarteSePreparer;

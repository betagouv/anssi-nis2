import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type CarteSePreparerProps = DefaultProps & {
  image: string;
  numero: number;
  titre: string;
  contenu: string;
  prochainement?: boolean;
};
const CarteSePreparer: DefaultComponentExtensible<CarteSePreparerProps> = ({
  image,
  numero,
  titre,
  contenu,
  prochainement,
}: CarteSePreparerProps) => {
  return (
    <div className="carte-se-preparer">
      <div className="conteneur-image">
        <img src={image} alt={titre} />
      </div>
      <p className={`numero ${prochainement ? "prochainement" : ""}`}>
        {numero}
      </p>
      <div className="contenu">
        <h3>{titre}</h3>
        <p>{contenu}</p>
        {prochainement && (
          <a
            href="https://club.ssi.gouv.fr/index_nis2.html#/nis2/introduction"
            className=" fr-nis2-bouton-secondaire prochainement"
            target="_blank"
            rel="noreferrer"
          >
            Se pré-enregistrer
          </a>
        )}
      </div>
    </div>
  );
};

export default CarteSePreparer;

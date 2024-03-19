import {DefaultComponentExtensible, DefaultProps} from "../../Services/Props";

type CarteSePreparerProps = DefaultProps & {
    image: string;
    numero: number;
    titre: string;
    contenu: string;
    prochainement?: boolean;
};
const CarteSePreparer: DefaultComponentExtensible<CarteSePreparerProps> = ({ image, numero, titre, contenu, prochainement }: CarteSePreparerProps) => {
    return (
        <div className="carte-se-preparer">
            <img src={image} alt={titre} />
            <p className={`numero ${prochainement ? 'prochainement' : ''}`}>{numero}</p>
            <div className="contenu">
                <h3>{titre}</h3>
                <p>{contenu}</p>
                {prochainement && (
                    <p className="prochainement">À venir prochainement</p>
                )}
            </div>
        </div>
    );
};

export default CarteSePreparer;
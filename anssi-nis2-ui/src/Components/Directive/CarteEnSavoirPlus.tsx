import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type CarteEnSavoirPlusProps = DefaultProps & {
    image: string;
    titre: string;
    lien: string;
};
export const CarteEnSavoirPlus: DefaultComponentExtensible<CarteEnSavoirPlusProps> = ({ image, titre, lien }: CarteEnSavoirPlusProps) => {
    return (
        <a className="carte-en-savoir-plus" href={lien} rel="noopener" target="_blank">
            <img src={image} alt={titre} />
            <p className="titre">{titre}</p>
        </a>
    );
};

import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type ItemSecteurConcerneProps = DefaultProps & {
    image: string;
    titre: string;
};
export const ItemSecteurConcerne: DefaultComponentExtensible<ItemSecteurConcerneProps> = ({ image, titre }: ItemSecteurConcerneProps) => {
    return (
        <li className="item-secteur-concerne">
            <img src={image} alt={titre} />
            <p>{titre}</p>
        </li>
    );
};

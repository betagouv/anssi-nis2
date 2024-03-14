import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type CarteInformationProps = DefaultProps & {
    contenu: string[];
};
export const CarteInformation: DefaultComponentExtensible<CarteInformationProps> = ({ contenu }: CarteInformationProps) => {
    return (
        <div className="carte carte-information">
            {contenu.map((c, idx) => (
                <p key={idx} className="italique">{c}</p>
            ))}
        </div>
    );
};

import {DefaultComponentExtensible, DefaultProps} from "../../Services/Props";

type ParagrapheProps = DefaultProps & {
    titre: string;
    contenu: string;
};
const Paragraphe: DefaultComponentExtensible<ParagrapheProps> = ({ titre, contenu }: ParagrapheProps) => {
    return (
        <div className="paragraphe">
            <h3>{titre}</h3>
            <p>{contenu}</p>
        </div>
    );
};

export default Paragraphe;
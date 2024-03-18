import {DefaultComponentExtensible, DefaultProps} from "../../Services/Props";

type Jalon = {
    date?: string;
    contenu: string;
}
type JalonEtapeProps = DefaultProps & {
    annee: number;
    jalons: Jalon[];
};
const JalonEtape: DefaultComponentExtensible<JalonEtapeProps> = ({ annee, jalons }: JalonEtapeProps) => {
    return (
        <div className="etape">
            <p className="annee">{annee}</p>
            {jalons.map((jalon) => (
                <>
                    {jalon.date && (<p className="date">{jalon.date}</p>)}
                    <p className="contenu">{jalon.contenu}</p>
                </>
            ))}
        </div>
    );
};

export default JalonEtape;
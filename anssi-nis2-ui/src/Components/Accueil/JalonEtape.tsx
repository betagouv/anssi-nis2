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
            <div className="jalons">
                {jalons.map((jalon) => (
                    <div className="jalon">
                        {jalon.date && (<p className="date">{jalon.date}</p>)}
                        <p className="contenu">{jalon.contenu}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JalonEtape;
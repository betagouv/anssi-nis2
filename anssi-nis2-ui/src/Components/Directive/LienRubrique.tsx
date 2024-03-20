import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type LienRubriqueProps = DefaultProps & {
    id: string;
    titre: string;
};

export const LienRubrique: DefaultComponentExtensible<LienRubriqueProps> = ({ id, titre }: LienRubriqueProps) => {
    return (
        <li><a href={`#${id}`}>{titre}</a></li>
    );
};

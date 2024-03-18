import {DefaultComponentExtensible, DefaultProps} from "../Services/Props";

type BlocPrincipalProps = DefaultProps & {
    id?: string;
};
const BlocPrincipal: DefaultComponentExtensible<BlocPrincipalProps> = ({ children, className, id }: BlocPrincipalProps) => {
    return (
        <div id={id} className={"fr-nis2-bloc-principal " + className}>
            {children}
        </div>
    );
};

export default BlocPrincipal;
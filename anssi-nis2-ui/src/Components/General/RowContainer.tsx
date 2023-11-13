import { DefaultComponentExtensible, DefaultProps } from "../../Services/Props";

type ConteneurLigne = DefaultProps & {
  align?: "left" | "center";
};
export const RowContainer: DefaultComponentExtensible<ConteneurLigne> = ({
  className,
  children,
  align = "center",
}: ConteneurLigne) => {
  const alignement = align == "center" ? " fr-grid-row--center" : "";
  return (
    <div className={className}>
      <div className="fr-container">
        <div className={"fr-grid-row" + alignement}>{children}</div>
      </div>
    </div>
  );
};

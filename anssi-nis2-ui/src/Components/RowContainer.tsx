import { DefaultComponent, DefaultProps } from "../Services/Props.ts";

export const RowContainer: DefaultComponent = ({
  className,
  children,
}: DefaultProps) => {
  return (
    <div className={className}>
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--center">{children}</div>
      </div>
    </div>
  );
};

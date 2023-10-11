import { FrCxArg, fr } from "@codegouvfr/react-dsfr";
import { DefaultComponent, DefaultProps } from "../Services/Props.d.ts";

export const CenteredContainer: DefaultComponent = ({
  children,
  className,
}: DefaultProps) => (
  <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
    <div
      className={fr.cx(
        className as FrCxArg,
        "fr-container",
        "fr-px-md-0",
        "fr-py-10v",
        "fr-py-md-14v",
      )}
    >
      <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">{children}</div>
      </div>
    </div>
  </div>
);

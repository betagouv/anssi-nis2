import { FrCxArg, fr } from "@codegouvfr/react-dsfr";
import { DefaultComponentExtensible, DefaultProps } from "../Props.ts";

interface FormContainerProps extends DefaultProps {
  backgroundClass?: string;
}

export const FormContainer: DefaultComponentExtensible<FormContainerProps> = ({
  children,
  backgroundClass,
}: FormContainerProps) => {
  const bgClass = (backgroundClass ||
    "fr-background-alt--blue-france") as FrCxArg;
  return (
    <div className="fr-container fr-container--fluid fr-mb-md-14v">
      <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
          <div
            className={fr.cx(
              "fr-container",
              "fr-px-md-0",
              "fr-py-10v",
              "fr-py-md-14v",
              bgClass,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

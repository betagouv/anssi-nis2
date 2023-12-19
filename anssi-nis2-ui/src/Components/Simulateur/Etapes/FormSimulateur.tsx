import { DefaultComponent, DefaultProps } from "../../../Services/Props";

const FormSimulateur: DefaultComponent = ({ children }: DefaultProps) => (
  <form className="fr-mb-0 fr-nis2-form" id="simulateur">
    <fieldset
      className="fr-mb-0 fr-fieldset"
      id="simulateur-fieldset"
      aria-labelledby="simulateur-fieldset-legend simulateur-fieldset-messages"
    >
      {children}
    </fieldset>
  </form>
);

export default FormSimulateur;

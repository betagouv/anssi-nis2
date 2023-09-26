import styled from "@emotion/styled";
import { DefaultComponent, DefaultProps } from "../../Services/Props.ts";
import { fr } from "@codegouvfr/react-dsfr";

const Formulaire = styled.div`
  & legend {
    margin-top: ${fr.spacing("4w")};
  }
`;

const FormSimulateur: DefaultComponent = ({ children }: DefaultProps) => (
  <Formulaire className="fr-mb-0" id="simulateur">
    <fieldset
      className="fr-mb-0 fr-fieldset"
      id="simulateur-fieldset"
      aria-labelledby="simulateur-fieldset-legend simulateur-fieldset-messages"
    >
      {children}
    </fieldset>
  </Formulaire>
);

export default FormSimulateur;

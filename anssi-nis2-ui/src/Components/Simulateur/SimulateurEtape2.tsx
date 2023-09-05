import {
  transformeTypeStructureVersOptions,
} from "../../Services/simulateurFrontServices.ts";
import { typesStructure } from "../../Domaine/DomaineSimulateur.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import {FormSimulateur} from "./index.ts"
import {SimulateurContenuEtapeProps, SimulateurEtapeNodeComponent} from "./simulateurProps.ts"

const SimulateurEtape2: SimulateurEtapeNodeComponent = ({
  handleChange,
  formData,
}: SimulateurContenuEtapeProps) => {
  const optionsTypeStructure = transformeTypeStructureVersOptions(
    typesStructure,
    handleChange,
    formData,
  );

  return (
      <FormSimulateur>
        <div className="fr-fieldset__element">
          <RadioButtons
              legend="Quel type de structure qualifie votre organisation ?"
              options={optionsTypeStructure}
              className="fr-checkbox-group--sm"
          />
        </div>
      </FormSimulateur>
  );
};

export default SimulateurEtape2;

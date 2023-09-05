import {
  transformePaysUnionEuropeennePourSelect,
} from "../../Services/simulateurFrontServices.ts";
import { paysUnionEuropeenneLocalisation } from "../../Domaine/DomaineSimulateur.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import {FormSimulateur} from "./index.ts"
import {SimulateurContenuEtapeProps, SimulateurEtapeNodeComponent} from "./simulateurProps.ts"

const SimulateurEtape1: SimulateurEtapeNodeComponent = ({
  handleChange,
  formData,
}: SimulateurContenuEtapeProps) => {
  const paysUnionEuropeenneOptions = transformePaysUnionEuropeennePourSelect(
    paysUnionEuropeenneLocalisation,
    handleChange,
    formData,
  );

  return (
      <FormSimulateur>
        <div className="fr-fieldset__element">
          <Checkbox
              legend={
                  "Dans quel état membre de l’Union Européenne êtes-vous implanté" +
                  " et/ou exercez-vous votre activité principale ?"
              }
              hintText={
                  "Là où sont principalement prises les décisions cyber," +
                  " ou à défaut là où les opérations cyber son effectuées." +
                  " Si indéterminé : là où se trouve le plus grand nombre de salariés."
              }
              options={paysUnionEuropeenneOptions}
              className="fr-checkbox-group--sm"
          />
        </div>
      </FormSimulateur>
  );
};

export default SimulateurEtape1;

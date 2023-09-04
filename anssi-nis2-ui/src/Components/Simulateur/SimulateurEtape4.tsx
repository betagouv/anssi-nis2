import {
  SimulateurContenuEtapeProps,
  transformeSecteursActiviteVersOptions,
} from "../../Services/simulateurFrontServices.ts";
import { secteursActivite } from "../../Domaine/DomaineSimulateur.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import {FormSimulateur} from "./index.ts"

const SimulateurEtape4 = ({
  handleChange,
  formData,
}: SimulateurContenuEtapeProps) => {
  const optionsSecteurActivite = transformeSecteursActiviteVersOptions(
    secteursActivite,
    handleChange,
    formData,
  );

  return (
      <FormSimulateur>
        <div className="fr-fieldset__element">
          <Checkbox
              legend="Dans quels secteurs d’activités votre organisation produit-elle des biens et/ou des services ?"
              options={optionsSecteurActivite}
              className="fr-checkbox-group--sm"
          />
        </div>
      </FormSimulateur>
  );
};

export default SimulateurEtape4;

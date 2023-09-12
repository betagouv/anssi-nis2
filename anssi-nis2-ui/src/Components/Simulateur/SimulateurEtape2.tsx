import { transformeTypeStructureVersOptions } from "../../Services/simulateurFrontServices.ts";
import { typesStructure } from "../../Domaine/DomaineSimulateur.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import {
  SimulateurContenuEtapeProps,
  SimulateurEtapeNodeComponent,
} from "./simulateurProps.ts";
import React from "react";

const SimulateurEtape2: SimulateurEtapeNodeComponent = ({
  formData,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gereChangement = (event: React.ChangeEvent<HTMLInputElement>) =>
    propageActionSimulateur({
      type: "checkSingle",
      name: "typeStructure",
      newValue: event.target.value,
    });
  const optionsTypeStructure = transformeTypeStructureVersOptions(
    typesStructure,
    gereChangement,
    formData,
  );

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <RadioButtons
          legend="Quel type de structure qualifie votre organisation ?"
          options={optionsTypeStructure}
        />
      </div>
    </FormSimulateur>
  );
};

export default SimulateurEtape2;

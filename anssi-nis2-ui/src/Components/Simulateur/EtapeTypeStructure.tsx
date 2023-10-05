import { libellesTypesStructure } from "../../Domaine/References/Libelles.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import React from "react";
import { transformeTypeStructureVersOptions } from "../../Services/Simulateur/Transformateurs.ts";
import { SimulateurEtapeNodeComponent } from "../../Services/Simulateur/component.ts";

const EtapeTypeStructure: SimulateurEtapeNodeComponent = ({
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
    libellesTypesStructure,
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

export default EtapeTypeStructure;

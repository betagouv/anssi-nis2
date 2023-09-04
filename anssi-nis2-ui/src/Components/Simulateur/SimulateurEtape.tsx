import { DefaultComponentExtensible } from "../../Props.ts";
import Stepper from "@codegouvfr/react-dsfr/Stepper";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import React, { useState } from "react";
import {
  emptySimulateurFormData,
  SimulateurEtapeProps,
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/simulateurFrontServices.ts";

export const SimulateurEtape: DefaultComponentExtensible<
  SimulateurEtapeProps
> = ({
  etapeCourante,
  nombreEtapes,
  etape,
  suivante,
  etapePrecedente,
  etapeSuivante,
}: SimulateurEtapeProps) => {
  console.log(`Etape courante = ${etapeCourante}`);
  const [inputs, setInputs] = useState<SimulateurFormData>(
    emptySimulateurFormData,
  );

  console.log(`Inputs state = ${JSON.stringify(inputs)}`);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    console.log(`Name = "${name}" and value = "${value}"`);
    const newValue = inputs[name as SimulateurFieldNames] || [];
    console.log(
      `New value : Name = "${name}" and value = "${JSON.stringify(newValue)}"`,
    );
    setInputs({ ...inputs, [name]: [...newValue, value] });
  };

  const EtapeCourante = etape.contenu || <></>;

  return (
    <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
        <Stepper
          currentStep={etapeCourante}
          nextTitle={suivante.titre}
          stepCount={nombreEtapes}
          title={etape.titre}
        />
        <hr />
        <form className="fr-mb-0" id="login-1797">
          <fieldset
            className="fr-mb-0 fr-fieldset"
            id="login-1797-fieldset"
            aria-labelledby="login-1797-fieldset-legend login-1797-fieldset-messages"
          >
            <EtapeCourante handleChange={handleChange} formData={inputs} />
            <div className="fr-grid-row fr-mr-auto" style={{ width: "100%" }}>
              <div
                className="fr-col fr-right fr-my-1w fr-text--sm fr-text-mention--grey"
                style={{ textAlign: "right" }}
              >
                {etape.indicationReponses}
              </div>
              <div className="fr-col-5">
                <div className="fr-fieldset__element">
                  <ButtonsGroup
                    alignment="right"
                    buttons={[
                      {
                        children: "Précédent",
                        onClick: etapePrecedente,
                        priority: "secondary",
                      },
                      {
                        children: "Suivant",
                        onClick: etapeSuivante,
                        type: "submit",
                      },
                    ]}
                    inlineLayoutWhen="sm and up"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

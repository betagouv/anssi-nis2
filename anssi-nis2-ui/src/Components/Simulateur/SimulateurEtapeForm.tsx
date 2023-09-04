import {
  SimulateurEtapeProps,
  SimulateurFormData,
} from "../../Services/simulateurFrontServices.ts";
import { FormContainer } from "../FormContainer.tsx";
import { StepperNavigation } from "./StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { DefaultComponentExtensible } from "../../Props.ts";

interface SimulateurEtapeFormProps extends SimulateurEtapeProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  inputs: SimulateurFormData;
}

export const SimulateurEtapeForm: DefaultComponentExtensible<
  SimulateurEtapeFormProps
> = ({
  listeEtapes,
  etapeCourante,
  handleChange,
  inputs,
  etapePrecedenteHandler,
  etapeSuivanteHandler,
}: SimulateurEtapeFormProps) => {
  const informationsEtape = listeEtapes[etapeCourante];
  const EtapeCourante = informationsEtape.contenu || <></>;
  const suivante = listeEtapes[etapeCourante + 1] || "";

  return (
    <FormContainer backgroundClass={informationsEtape.backgroundClass}>
      <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
          <Stepper
            currentStep={etapeCourante + 1}
            nextTitle={suivante.titre}
            stepCount={listeEtapes.length}
            title={informationsEtape.titre}
            className="fr-mb-5w"
          />

          <hr className="fr-pb-5w" />

          <EtapeCourante handleChange={handleChange} formData={inputs} />

          {informationsEtape.indicationReponses && (
            <StepperNavigation
              indicationReponses={informationsEtape.indicationReponses}
              onClick={etapePrecedenteHandler}
              onClick1={etapeSuivanteHandler}
            />
          )}
        </div>
      </div>
    </FormContainer>
  );
};

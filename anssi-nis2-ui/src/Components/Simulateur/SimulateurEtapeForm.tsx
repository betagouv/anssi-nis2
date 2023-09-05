import { FormContainer } from "../FormContainer.tsx";
import { StepperNavigation } from "./StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import {
  InformationEtapeForm,
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeRenderedProps,
} from "./simulateurProps.ts"

export const SimulateurEtapeForm: SimulateurEtapeRenderedComponent = ({
  listeEtapes,
  etapeCourante,
  handleChange,
  formData,
  etapePrecedenteHandler,
  etapeSuivanteHandler,
}: SimulateurEtapeRenderedProps) => {
  const informationsEtape = listeEtapes[etapeCourante] as InformationEtapeForm;
  const EtapeCourante = informationsEtape.contenu;
  const suivante = listeEtapes[etapeCourante + 1] || "";

  return (
    <FormContainer>
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

          <EtapeCourante handleChange={handleChange} formData={formData} />

          <StepperNavigation
            indicationReponses={informationsEtape.indicationReponses}
            onClick={etapePrecedenteHandler}
            onClick1={etapeSuivanteHandler}
          />
        </div>
      </div>
    </FormContainer>
  );
};

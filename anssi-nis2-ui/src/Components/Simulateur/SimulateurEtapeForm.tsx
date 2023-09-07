import { RowContainer } from "../RowContainer.tsx";
import { StepperNavigation } from "./StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import {
  InformationEtapeForm,
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeRenderedProps,
} from "./simulateurProps.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";

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

  const etapePrecedenteHandlerConcret =
    etapeCourante == 0 ? noRefClick : etapePrecedenteHandler;

  return (
    <RowContainer className="fr-background-alt--blue-france">
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
            onClickPrevious={etapePrecedenteHandlerConcret}
            onClickNext={etapeSuivanteHandler}
          />
        </div>
      </div>
    </RowContainer>
  );
};

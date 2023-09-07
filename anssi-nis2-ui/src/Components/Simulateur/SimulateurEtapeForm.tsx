import { RowContainer } from "../RowContainer.tsx";
import { StepperNavigation } from "./StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import {
  InformationEtapeForm,
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeRenderedProps,
} from "./simulateurProps.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";
import { useContext } from "react";
import { AppContext } from "../../AppContext.tsx";

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
  const { sendFormData } = useContext(AppContext);

  const etapePrecedenteHandlerConcret =
    etapeCourante == 0 ? noRefClick : etapePrecedenteHandler;
  const sauvePuisEtapeSuivante = (e: React.MouseEvent<Element, MouseEvent>) => {
    console.log(`Envoie les données à l'API ${JSON.stringify(formData)}`);
    sendFormData(formData).then(() => etapeSuivanteHandler(e));
  };

  const etapeSuivantHandlerConcret =
    etapeCourante < listeEtapes.length - 2
      ? etapeSuivanteHandler
      : sauvePuisEtapeSuivante;

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
            onClickNext={etapeSuivantHandlerConcret}
          />
        </div>
      </div>
    </RowContainer>
  );
};

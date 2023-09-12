import { RowContainer } from "../RowContainer.tsx";
import { StepperNavigation } from "../StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import {
  InformationEtapeForm,
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeRenderedProps,
} from "./simulateurProps.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";
import React, { useContext } from "react";
import { AppContext } from "../../AppContext.tsx";
import { CenteredContainer } from "../CenteredContainer.tsx";
import { SimulateurFormData } from "../../Services/simulateurFrontServices.ts";

export const SimulateurEtapeForm: SimulateurEtapeRenderedComponent = ({
  listeEtapes,
  etapeCourante,
  propageActionSimulateur,
  formData,
  gereClickBouton,
}: SimulateurEtapeRenderedProps) => {
  const informationsEtape = listeEtapes[etapeCourante] as InformationEtapeForm;
  const EtapeCourante = informationsEtape.contenu;
  const suivante = listeEtapes[etapeCourante + 1] || "";
  const { sendFormData } = useContext(AppContext);

  const etapePrecedenteHandlerConcret =
    etapeCourante == 0 ? noRefClick : gereClickBouton.precedent;
  const sauvePuisEtapeSuivante = (e: React.MouseEvent<Element, MouseEvent>) => {
    console.log(`Envoie les données à l'API ${JSON.stringify(formData)}`);
    sendFormData(formData as SimulateurFormData).then(() =>
      gereClickBouton.suivant(e),
    );
  };

  const etapeSuivantHandlerConcret =
    etapeCourante < listeEtapes.length - 2
      ? gereClickBouton.suivant
      : sauvePuisEtapeSuivante;

  return (
    <RowContainer className="fr-py-7w">
      <CenteredContainer className="fr-background-alt--grey">
        <Stepper
          currentStep={etapeCourante + 1}
          nextTitle={suivante.titre}
          stepCount={listeEtapes.length}
          title={informationsEtape.titre}
          className="fr-mb-5w"
        />

        <hr className="fr-pb-5w" />

        {formData && (
          <EtapeCourante
            propageActionSimulateur={propageActionSimulateur}
            formData={formData}
          />
        )}

        <StepperNavigation
          indicationReponses={informationsEtape.indicationReponses}
          onClickPrevious={etapePrecedenteHandlerConcret}
          onClickNext={etapeSuivantHandlerConcret}
        />
      </CenteredContainer>
    </RowContainer>
  );
};

import { RowContainer } from "../RowContainer.tsx";
import { StepperNavigation } from "../StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import {
  InformationEtapeForm,
  InformationsEtape,
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeRenderedProps,
} from "./simulateurProps.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";
import React, { useContext } from "react";
import { AppContext } from "../../AppContext.tsx";
import { CenteredContainer } from "../CenteredContainer.tsx";

import { SimulateurFormData } from "../../Services/Simulateur/FormData.ts";

const getEtapePrecedenteHandlerConcret = (
  precedentHandler: React.MouseEventHandler,
  numeroEtapeCourante: number,
) => (numeroEtapeCourante == 0 ? noRefClick : precedentHandler);

const getSauvePuisEtapeSuivante =
  (suivantHandler: React.MouseEventHandler, sauveHandler: Promise<string>) =>
  (e: React.MouseEvent<Element, MouseEvent>) => {
    sauveHandler.then(() => suivantHandler(e));
  };
const getEtapeSuivantHandlerConcret = (
  numeroEtapeCourante: number,
  collectionEtapes: InformationsEtape[],
  suivantHandler: React.MouseEventHandler,
  sauveHandler: () => Promise<string>,
) =>
  numeroEtapeCourante < collectionEtapes.length - 2
    ? suivantHandler
    : getSauvePuisEtapeSuivante(suivantHandler, sauveHandler());

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

  const etapePrecedenteHandlerConcret = getEtapePrecedenteHandlerConcret(
    gereClickBouton.precedent,
    etapeCourante,
  );

  const etapeSuivantHandlerConcret = getEtapeSuivantHandlerConcret(
    etapeCourante,
    listeEtapes,
    gereClickBouton.suivant,
    () => sendFormData(formData as SimulateurFormData),
  );

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

        <EtapeCourante
          propageActionSimulateur={propageActionSimulateur}
          formData={formData}
        />

        <StepperNavigation
          indicationReponses={informationsEtape.indicationReponses}
          onClickPrevious={etapePrecedenteHandlerConcret}
          onClickNext={etapeSuivantHandlerConcret}
        />
      </CenteredContainer>
    </RowContainer>
  );
};

import { RowContainer } from "../RowContainer.tsx";
import { StepperNavigation } from "../StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import {
  InformationEtapeForm,
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeRenderedProps,
} from "./props.ts";
import { useContext } from "react";
import { AppContext } from "../../AppContext.tsx";
import { CenteredContainer } from "../CenteredContainer.tsx";

import { SimulateurFormData } from "../../Services/Simulateur/FormData.ts";
import {
  genereGestionEtapePrecedenteSiExiste,
  genereGestionEtapeSuivanteSiExiste,
} from "./gestionnaires.ts";

export const SimulateurEtapeForm: SimulateurEtapeRenderedComponent = ({
  listeEtapes,
  numeroEtapeCourante,
  propageActionSimulateur,
  formData,
  gereClickBouton,
}: SimulateurEtapeRenderedProps) => {
  const informationsEtape = listeEtapes[
    numeroEtapeCourante
  ] as InformationEtapeForm;

  const EtapeCourante = informationsEtape.contenu;

  const suivante = listeEtapes[numeroEtapeCourante + 1] || "";

  const { sendFormData } = useContext(AppContext);

  const etapePrecedenteHandlerConcret = genereGestionEtapePrecedenteSiExiste(
    gereClickBouton.precedent,
    numeroEtapeCourante,
  );

  const etapeSuivantHandlerConcret = genereGestionEtapeSuivanteSiExiste(
    numeroEtapeCourante,
    listeEtapes,
    gereClickBouton.suivant,
    () => sendFormData(formData as SimulateurFormData),
  );

  return (
    <RowContainer className="fr-py-7w">
      <CenteredContainer className="fr-background-alt--grey">
        <Stepper
          currentStep={numeroEtapeCourante + 1}
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

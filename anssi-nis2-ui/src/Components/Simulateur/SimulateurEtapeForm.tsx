import { RowContainer } from "../RowContainer.tsx";
import { StepperNavigation } from "../StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { SimulateurEtapeRenderedProps } from "./props.ts";
import { useContext, useMemo } from "react";
import { AppContext } from "../../AppContext.tsx";
import { CenteredContainer } from "../CenteredContainer.tsx";

import { DonneesFormulaireSimulateur } from "../../Services/Simulateur/donneesFormulaire.ts";
import {
  genereGestionEtapePrecedenteSiExiste,
  genereGestionEtapeSuivanteSiExiste,
} from "./gestionnaires.ts";
import { InformationEtapeForm } from "./informationsEtape.ts";
import { SimulateurEtapeRenderedComponent } from "./component.ts";

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

  const informationsEtapeSuivante =
    listeEtapes.recupereInformationsEtapeSuivante(numeroEtapeCourante);

  const { sendFormData } = useContext(AppContext);

  const etapePrecedenteHandlerConcret = useMemo(
    () =>
      genereGestionEtapePrecedenteSiExiste(
        gereClickBouton.precedent,
        numeroEtapeCourante,
      ),
    [gereClickBouton.precedent, numeroEtapeCourante],
  );

  const etapeSuivantHandlerConcret = useMemo(
    () =>
      genereGestionEtapeSuivanteSiExiste(
        numeroEtapeCourante,
        listeEtapes,
        gereClickBouton.suivant,
        () => sendFormData(formData as DonneesFormulaireSimulateur),
      ),
    [
      numeroEtapeCourante,
      listeEtapes,
      gereClickBouton.suivant,
      sendFormData,
      formData,
    ],
  );

  return (
    <RowContainer className="fr-py-7w">
      <CenteredContainer className="fr-background-alt--grey">
        <Stepper
          currentStep={numeroEtapeCourante + 1}
          nextTitle={informationsEtapeSuivante.titre}
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

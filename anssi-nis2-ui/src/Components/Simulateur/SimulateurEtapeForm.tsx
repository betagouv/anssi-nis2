import { RowContainer } from "../General/RowContainer.tsx";
import { StepperNavigation } from "./StepperNavigation.tsx";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { CenteredContainer } from "../General/CenteredContainer.tsx";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import { AidezNousAmeliorerService } from "../AidezNousAmeliorerService.tsx";

export const SimulateurEtapeForm: SimulateurEtapeRenderedComponent = ({
  propageActionSimulateur,
  donneesFormulaire,
  informationsBoutonsNavigation,
  etatEtapes,
}: SimulateurEtapeRenderedProps) => {
  const validationReponses =
    etatEtapes.contenuEtapeCourante.fabriqueValidationReponses(
      donneesFormulaire,
    );

  const EtapeCourante =
    etatEtapes.contenuEtapeCourante.fabriqueComposant(donneesFormulaire);

  return (
    <>
      <RowContainer className="fr-py-3w">
        <CenteredContainer className="fr-background-alt--grey">
          <Stepper
            currentStep={etatEtapes.numero}
            stepCount={etatEtapes.collectionEtapes.nombreEtapes}
            title={etatEtapes.contenuEtapeCourante.titre}
            className="fr-mb-5w"
          />

          <hr className="fr-pb-5w" />

          <EtapeCourante
            propageActionSimulateur={propageActionSimulateur}
            donneesFormulaire={donneesFormulaire}
          />

          <StepperNavigation
            validationReponses={validationReponses}
            donneesFormulaire={donneesFormulaire}
            onClickPrevious={informationsBoutonsNavigation.precedent}
            onClickNext={informationsBoutonsNavigation.suivant}
          />
        </CenteredContainer>
      </RowContainer>
      <RowContainer className=" fr-mb-7w">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
          <AidezNousAmeliorerService />
        </div>
      </RowContainer>
    </>
  );
};

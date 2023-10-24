import { RowContainer } from "../General/RowContainer.tsx";
import { StepperNavigation } from "./StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { useContext, useMemo } from "react";
import { AppContext } from "../AppContexte/AppContext.tsx";
import { CenteredContainer } from "../General/CenteredContainer.tsx";

import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { genereGestionSauvePuisEtapeSuivante } from "../../Services/Simulateur/gestionnaires.ts";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { InformationEtapeForm } from "../../Services/Simulateur/InformationsEtape.ts";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";

import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import { AidezNousAmeliorerService } from "../AidezNousAmeliorerService.tsx";

export const SimulateurEtapeForm: SimulateurEtapeRenderedComponent = ({
  propageActionSimulateur,
  donneesFormulaire,
  informationsBoutonsNavigation,
  etatEtapes,
}: SimulateurEtapeRenderedProps) => {
  const informationsEtape =
    etatEtapes.contenuEtapeCourante as InformationEtapeForm;

  const EtapeCourante = informationsEtape.composant;

  const { envoieDonneesFormulaire } = useContext(AppContext);

  const etapePrecedenteHandlerConcret = useMemo(
    () =>
      etatEtapes.collectionEtapes.estPremiereEtape(etatEtapes.indice)
        ? noRefClick
        : informationsBoutonsNavigation.precedent,
    [
      etatEtapes.collectionEtapes,
      etatEtapes.indice,
      informationsBoutonsNavigation.precedent,
    ],
  );

  const sauvePuisSuivantGestionnaire = useMemo(
    () =>
      genereGestionSauvePuisEtapeSuivante(
        informationsBoutonsNavigation.suivant,
        () =>
          envoieDonneesFormulaire(
            donneesFormulaire as DonneesFormulaireSimulateur,
          ),
      ),
    [
      donneesFormulaire,
      envoieDonneesFormulaire,
      informationsBoutonsNavigation.suivant,
    ],
  );
  const etapeSuivantHandlerConcret = useMemo(
    () =>
      etatEtapes.collectionEtapes.estDerniereEtape(etatEtapes.indice)
        ? sauvePuisSuivantGestionnaire
        : informationsBoutonsNavigation.suivant,
    [
      etatEtapes,
      sauvePuisSuivantGestionnaire,
      informationsBoutonsNavigation.suivant,
    ],
  );

  return (
    <>
      <RowContainer className="fr-py-3w">
        <CenteredContainer className="fr-background-alt--grey">
          <Stepper
            currentStep={etatEtapes.numero}
            nextTitle={etatEtapes.titreSuivant}
            stepCount={etatEtapes.collectionEtapes.nombreEtapes}
            title={informationsEtape.titre}
            className="fr-mb-5w"
          />

          <hr className="fr-pb-5w" />

          <EtapeCourante
            propageActionSimulateur={propageActionSimulateur}
            donneesFormulaire={donneesFormulaire}
          />

          <StepperNavigation
            validationReponses={informationsEtape.validationReponses}
            donneesFormulaire={donneesFormulaire}
            onClickPrevious={etapePrecedenteHandlerConcret}
            onClickNext={etapeSuivantHandlerConcret}
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

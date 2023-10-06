import { RowContainer } from "../RowContainer.tsx";
import { StepperNavigation } from "../StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/props.ts";
import { useContext, useMemo } from "react";
import { AppContext } from "../../AppContext.tsx";
import { CenteredContainer } from "../CenteredContainer.tsx";

import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  genereGestionEtapePrecedenteSiExiste,
  genereGestionEtapeSuivanteSiExiste,
} from "../../Services/Simulateur/gestionnaires.ts";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/component.ts";
import { InformationEtapeForm } from "../../Services/Simulateur/informationsEtape.ts";

export const SimulateurEtapeForm: SimulateurEtapeRenderedComponent = ({
  propageActionSimulateur,
  donneesFormulaireSimulateur,
  informationsBoutonsNavigation,
  etatEtapes,
}: SimulateurEtapeRenderedProps) => {
  const listeEtapes = etatEtapes.collectionEtapes;
  const informationsEtape: InformationEtapeForm =
    etatEtapes.contenuEtapeCourante() as InformationEtapeForm;

  const EtapeCourante = informationsEtape.recupereContenu();

  const etatSuivant = etatEtapes.suivant(donneesFormulaireSimulateurVide);
  const informationsEtapeSuivante = etatSuivant.contenuEtapeCourante();

  const { sendFormData } = useContext(AppContext);

  const etapePrecedenteHandlerConcret = useMemo(
    () =>
      genereGestionEtapePrecedenteSiExiste(
        informationsBoutonsNavigation.precedent,
        etatEtapes.numeroEtapeCourante,
      ),
    [informationsBoutonsNavigation.precedent, etatEtapes.numeroEtapeCourante],
  );

  const etapeSuivantHandlerConcret = useMemo(
    () =>
      genereGestionEtapeSuivanteSiExiste(
        etatEtapes.numeroEtapeCourante,
        listeEtapes,
        informationsBoutonsNavigation.suivant,
        () =>
          sendFormData(
            donneesFormulaireSimulateur as DonneesFormulaireSimulateur,
          ),
      ),
    [
      etatEtapes.numeroEtapeCourante,
      listeEtapes,
      informationsBoutonsNavigation.suivant,
      sendFormData,
      donneesFormulaireSimulateur,
    ],
  );

  return (
    <RowContainer className="fr-py-7w">
      <CenteredContainer className="fr-background-alt--grey">
        <Stepper
          currentStep={etatEtapes.numeroEtapeCourante}
          nextTitle={informationsEtapeSuivante.titre}
          stepCount={listeEtapes.nombreEtapes}
          title={informationsEtape.titre}
          className="fr-mb-5w"
        />

        <hr className="fr-pb-5w" />

        <EtapeCourante
          propageActionSimulateur={propageActionSimulateur}
          donneesFormulaire={donneesFormulaireSimulateur}
        />

        <StepperNavigation
          validationReponses={informationsEtape.validationReponses}
          donneesFormulaire={donneesFormulaireSimulateur}
          onClickPrevious={etapePrecedenteHandlerConcret}
          onClickNext={etapeSuivantHandlerConcret}
        />
      </CenteredContainer>
    </RowContainer>
  );
};

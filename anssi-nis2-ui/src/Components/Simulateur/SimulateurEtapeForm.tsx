import { RowContainer } from "../General/RowContainer.tsx";
import { StepperNavigation } from "./StepperNavigation.tsx";

import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { useContext, useMemo } from "react";
import { AppContext } from "../AppContexte/AppContext.tsx";
import { CenteredContainer } from "../General/CenteredContainer.tsx";

import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  genereGestionEtapePrecedenteSiExiste,
  genereGestionSauvePuisEtapeSuivante,
} from "../../Services/Simulateur/gestionnaires.ts";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { InformationEtapeForm } from "../../Services/Simulateur/informationsEtape.ts";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";

export const SimulateurEtapeForm: SimulateurEtapeRenderedComponent = ({
  propageActionSimulateur,
  donneesFormulaire,
  informationsBoutonsNavigation,
  etatEtapes,
}: SimulateurEtapeRenderedProps) => {
  const informationsEtape =
    etatEtapes.contenuEtapeCourante() as InformationEtapeForm;

  const EtapeCourante = informationsEtape.composant;

  const { envoieDonneesFormulaire } = useContext(AppContext);

  const etapePrecedenteHandlerConcret = useMemo(
    () =>
      genereGestionEtapePrecedenteSiExiste(
        informationsBoutonsNavigation.precedent,
        etatEtapes.numeroEtapeCourante,
      ),
    [informationsBoutonsNavigation.precedent, etatEtapes.numeroEtapeCourante],
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
      etatEtapes.collectionEtapes.estDerniereEtape(etatEtapes.indiceCourant)
        ? sauvePuisSuivantGestionnaire
        : informationsBoutonsNavigation.suivant,
    [
      etatEtapes,
      sauvePuisSuivantGestionnaire,
      informationsBoutonsNavigation.suivant,
    ],
  );

  return (
    <RowContainer className="fr-py-3w">
      <CenteredContainer className="fr-background-alt--grey">
        <Stepper
          currentStep={etatEtapes.numeroEtapeCourante}
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
  );
};

import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-core/src/Domain/Simulateur/DonneesFormulaire.ts";
import { EtatEtapes } from "anssi-nis2-core/src/Domain/Simulateur/EtatEtapes.ts";
import {
  InformationEtapeForm,
  InformationsEtapesVariantes,
} from "anssi-nis2-core/src/Domain/Simulateur/InformationsEtape.ts";
import { RowContainer } from "../General/RowContainer.tsx";
import { StepperNavigation } from "./StepperNavigation.tsx";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { CenteredContainer } from "../General/CenteredContainer.tsx";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import { AidezNousAmeliorerService } from "../AidezNousAmeliorerService.tsx";

import { cartoComposants } from "../../Services/Simulateur/Transformateurs/TypeEtapeVersComposantEtape.transformateur.ts";

const etapeVarianteAffichee =
  (etatEtapes: EtatEtapes) => (donnees: IDonneesBrutesFormulaireSimulateur) => {
    const variante = etatEtapes.collectionEtapes.recupereEtape(
      etatEtapes.indiceCourant,
    ) as InformationsEtapesVariantes<InformationEtapeForm>;
    return cartoComposants[
      variante.variantes[variante.varianteAffichee(donnees)].type
    ];
  };

const etapeAffichee = (etatEtapes: EtatEtapes) =>
  etatEtapes.typeEtapeCourante === "variante"
    ? etapeVarianteAffichee(etatEtapes)
    : () => cartoComposants[etatEtapes.typeEtapeCourante];

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

  const EtapeCourante = etapeAffichee(etatEtapes)(donneesFormulaire).composant;

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

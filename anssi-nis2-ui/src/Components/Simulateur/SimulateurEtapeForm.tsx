import { RowContainer } from "../General/RowContainer.tsx";
import { StepperNavigation } from "./StepperNavigation.tsx";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { CenteredContainer } from "../General/CenteredContainer.tsx";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import { AidezNousAmeliorerService } from "../AidezNousAmeliorerService.tsx";
import { cartoComposants } from "../../Services/Simulateur/Transformateurs/transformeTypeEtapeVersComposantEtape.ts";
import {
  InformationEtapeForm,
  InformationsEtapesVariantes,
  TypeEtape,
} from "anssi-nis2-domain/src/Simulateur/InformationsEtape.ts";
import { VVV } from "../../utilitaires/debug.ts";
import { EtatEtapes } from "anssi-nis2-domain/src/Simulateur/EtatEtapes.ts";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";

function etapeVarianteAffichee(
  etatEtapes: EtatEtapes<unknown, unknown>,
  donnees: IDonneesBrutesFormulaireSimulateur,
) {
  const variante = etatEtapes.collectionEtapes.recupereEtape(
    etatEtapes.indiceCourant,
  ) as InformationsEtapesVariantes<InformationEtapeForm>;
  return cartoComposants[
    variante.variantes[variante.varianteAffichee(donnees)].type
  ];
}

function etapeAffichee(
  donnees: IDonneesBrutesFormulaireSimulateur,
  etatEtapes: EtatEtapes<unknown, unknown>,
) {
  const typeEtapeCourante: TypeEtape = etatEtapes.typeEtapeCourante;
  switch (typeEtapeCourante) {
    case "variante":
      return etapeVarianteAffichee(etatEtapes, donnees);
  }
  return cartoComposants[typeEtapeCourante];
}

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

  VVV(etatEtapes.typeEtapeCourante);
  const EtapeCourante = etapeAffichee(donneesFormulaire, etatEtapes).composant;

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

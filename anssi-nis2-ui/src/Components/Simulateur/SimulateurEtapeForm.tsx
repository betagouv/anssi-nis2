import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { EtatEtape } from "../../../../commun/core/src/Domain/Simulateur/EtatEtape.definitions.ts";
import {
  InformationEtapeForm,
  InformationsEtapesVariantes,
} from "anssi-nis2-core/src/Domain/Simulateur/InformationsEtape.ts";
import { StepperNavigation } from "./StepperNavigation.tsx";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import { AidezNousAmeliorerService } from "../AidezNousAmeliorerService.tsx";

import { cartoComposants } from "../../Services/Simulateur/Transformateurs/TypeEtapeVersComposantEtape.transformateur.ts";
import BlocPrincipal from "../BlocPrincipal.tsx";

const etapeVarianteAffichee =
  (etatEtapes: EtatEtape) => (donnees: DonneesFormulaireSimulateur) => {
    const variante = etatEtapes.collectionEtapes.contenuEtape(
      etatEtapes.indiceCourant,
      etatEtapes.indiceSousEtape,
    ) as InformationsEtapesVariantes<InformationEtapeForm>;
    const numeroVariante = variante.varianteAffichee(donnees);
    return cartoComposants[variante.variantes[numeroVariante].type];
  };

const etapeAffichee = (etatEtapes: EtatEtape) =>
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
      <BlocPrincipal className="fond-gris" id="etape-formulaire">
          <Stepper
              currentStep={etatEtapes.numero}
              stepCount={etatEtapes.collectionEtapes.nombreEtapes}
              title={etatEtapes.contenuEtapeCourante.titre}
              className="fr-mb-5w"
          />
          <hr className="fr-pb-5w"/>
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
      </BlocPrincipal>
      <AidezNousAmeliorerService />
    </>
  );
};

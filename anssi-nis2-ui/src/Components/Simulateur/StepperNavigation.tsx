import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";

import { ValidationReponses } from "../../../../commun/core/src/Domain/Simulateur/services/ChampSimulateur/champs.domaine.ts";

export const StepperNavigation = ({
  validationReponses,
  onClickPrevious,
  onClickNext,
  donneesFormulaire,
}: {
  validationReponses: ValidationReponses;
  onClickPrevious: (e: React.MouseEvent) => void;
  onClickNext: (e: React.MouseEvent) => void;
  donneesFormulaire: DonneesFormulaireSimulateur;
}) => (
  <div className="stepper-navigation" style={{ width: "100%" }}>
    <div
      className="fr-col fr-right fr-my-1w fr-text--sm fr-text-mention--grey validation"
    >
      {validationReponses.message}
    </div>
    <div>
      <div className="fr-fieldset__element">
        <ButtonsGroup
          alignment="right"
          buttons={[
            {
              children: "Précédent",
              onClick: onClickPrevious,
              priority: "secondary",
              disabled: onClickPrevious == noRefClick,
            },
            {
              children: "Suivant",
              onClick: onClickNext,
              type: "submit",
              disabled: !validationReponses.validateur(donneesFormulaire),
            },
          ]}
          inlineLayoutWhen="sm and up"
        />
      </div>
    </div>
  </div>
);

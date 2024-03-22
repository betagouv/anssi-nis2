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
  <div id="stepper-navigation">
    <p className="message-validation">
      {validationReponses.message}
    </p>
    <div className="conteneur-actions">
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
);

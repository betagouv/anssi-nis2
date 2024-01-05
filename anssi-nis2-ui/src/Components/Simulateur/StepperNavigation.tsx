import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-core/src/Domain/Simulateur/DonneesFormulaire.ts";
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
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur;
}) => (
  <div className="fr-grid-row fr-mr-auto" style={{ width: "100%" }}>
    <div
      className="fr-col fr-right fr-my-1w fr-text--sm fr-text-mention--grey"
      style={{ textAlign: "right" }}
    >
      {validationReponses.message}
    </div>
    <div className="fr-col-5">
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

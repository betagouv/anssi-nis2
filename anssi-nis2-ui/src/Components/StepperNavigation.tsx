import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { noRefClick } from "./Echaffaudages/AssistantsEchaffaudages.ts";

export const StepperNavigation = ({
  indicationReponses,
  onClickPrevious,
  onClickNext,
}: {
  indicationReponses: string;
  onClickPrevious: (e: React.MouseEvent) => void;
  onClickNext: (e: React.MouseEvent) => void;
}) => (
  <div className="fr-grid-row fr-mr-auto" style={{ width: "100%" }}>
    <div
      className="fr-col fr-right fr-my-1w fr-text--sm fr-text-mention--grey"
      style={{ textAlign: "right" }}
    >
      {indicationReponses}
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
            },
          ]}
          inlineLayoutWhen="sm and up"
        />
      </div>
    </div>
  </div>
);
